import express from 'express';
import { prisma } from '../auth.js';

const router = express.Router();

// Get all houses
router.get('/', async (req, res) => {
    try {
        const houses = await prisma.house.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(houses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new house
router.post('/', async (req, res) => {
    try {
        const newHouse = await prisma.house.create({
            data: req.body
        });
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
