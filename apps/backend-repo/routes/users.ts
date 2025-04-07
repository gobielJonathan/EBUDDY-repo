import express, { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/user";
import authMiddleware from "../middleware/auth";

const router = express.Router();

/* GET users listing. */
router.get(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page || 1);

    UserController.getUser(page)
      .then((users) => {
        res.json(users);
      })
      .catch(() => {
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

router.get(
  "/me",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ isAuthenticated: true });
  }
);

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  UserController.login(email, password)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.toString() });
    });
});

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  UserController.register(email, password)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.toString() });
    });
});

router.post("/:id", (req: Request, res: Response, next: NextFunction) => {
  UserController.updateUser(req.params.id, req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.toString() });
    });
});

export default router;
