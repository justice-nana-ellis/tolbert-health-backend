import express, { Request, Response, NextFunction, Router } from "express";

const adminRoutes = Router();

adminRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: '⚡ Hi from the Admin' })
});

export default adminRoutes;