import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from '../config';
// import User from '../models/user.model';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Unauthorized",message: 'Authentication failed. Token missing.' });
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // Add user ID to request object for use in future requests
      req.body.userId = (decoded as { userId: string }).userId;
      next();
    } else {
      res.status(401).json({ error: "Missing token" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
