import { User } from "@ebuddy/core/entities/user";

import { fetchUser, fetchUserById, updateUser } from "../repository/users";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const UserController = {
  getUser: async (page =1 ) => {
    const data = await fetchUser(page);
    return data;
  },

  updateUser: async (id: string, data: User) => {
    const user = await fetchUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = { ...user, ...data, id: id }
    await updateUser(updatedUser);
    return updatedUser;
  },

  login: async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();
    return {
      user: {
        email: cred.user.email,
        id: cred.user.uid,
      },
      token: token
    }
  },

  register : async (email: string, password: string) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken(true)
      return { 
        user: {
          email: cred.user.email,
          id: cred.user.uid,
        },
        token : token
      }
  },
};
