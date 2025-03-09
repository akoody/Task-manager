import express, { Router, Response } from 'express';
import Joi from 'joi';
import { auth } from '../middleware/auth.js';
import Task, { ITask } from '../models/Task.js';
import { AuthRequest } from '../types/index.js';

const router: Router = express.Router();

const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('pending', 'completed').optional(),
});

// Create task
router.post('/', auth, async (req: AuthRequest, res: Response): Promise<void> => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ msg: error.details[0].message });
        return;
    }

    const { title, description, status } = req.body;

    try {
        const task: ITask = new Task({
            title,
            description,
            status: status || 'pending',
            user: req.user!.id,
        });
        await task.save();
        res.json(task);
    } catch (err: any) {
        console.error('Task creation error:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get tasks
router.get('/', auth, async (req: AuthRequest, res: Response) => {
    try {
        let tasks: ITask[];
        if (req.user!.role === 'admin') {
            tasks = await Task.find().populate('user', 'name email');
        } else {
            tasks = await Task.find({ user: req.user!.id });
        }
        res.json(tasks);
    } catch (err: any) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update task
router.put('/:id', auth, async (req: AuthRequest, res: Response): Promise<void> => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ msg: error.details[0].message });
        return;
    }

    const { title, description, status } = req.body;

    try {
        const task: ITask | null = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ msg: 'Task not found' });
            return;
        }
        if (task.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            res.status(403).json({ msg: 'Not authorized' });
            return;
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();
        res.json(task);
    } catch (err: any) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Remove task
router.delete('/:id', auth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const task: ITask | null = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ msg: 'Task not found' });
            return;
        }
        if (task.user.toString() !== req.user!.id && req.user!.role !== 'admin') {
            res.status(403).json({ msg: 'Not authorized' });
            return;
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Task removed' });
    } catch (err: any) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;