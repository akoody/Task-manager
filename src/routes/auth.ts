import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User, { IUser } from '../models/User.js';

const router: Router = express.Router();

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Sign up
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        res.status(400).json({ msg: error.details[0].message });
        return;
    }

    const { name, email, password } = req.body;

    try {
        let user: IUser | null = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Sign in
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        res.status(400).json({ msg: error.details[0].message });
        return;
    }

    const { email, password } = req.body;

    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Account does not exist' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid password' });
            return;
        }

        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.json({ token });
    } catch (err: any) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;