import { User } from "@ebuddy/core/entities/user";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  limit,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function updateUser(params: User) {
  const { id, ...user } = params;

  const docRef = doc(db, "users", id);
  await updateDoc(docRef, user);
}

// Compute in-memory score
function computeScore(user: any): number {
  return (
    user.totalAverageWeightRatings * 10000 +
    user.numberOfRents * 10 +
    user.recentlyActive / 1_000_000
  );
}

const batchSize = 100;

export async function fetchUser(page = 1, pageSize = 10) {
  const userRef = collection(db, "users");
  const snapshot = await getDocs(query(userRef, limit(batchSize)));

  const scoredUsers = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      score: computeScore(data),
    };
  });

  scoredUsers.sort((a, b) => b.score - a.score);

  const start = (page - 1) * pageSize;
  const paginatedUsers = scoredUsers.slice(start, start + pageSize);

  return {
    users: paginatedUsers,
    hasNextPage: start + pageSize < scoredUsers.length,
  };
}

export async function fetchUserById(id: string) {
  const docRef = doc(db, "users", id);
  const user = await getDoc(docRef);

  if (user.exists()) {
    return { id: user.id, ...user.data() } as User;
  }
  return null;
}
