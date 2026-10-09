import express from 'express';
import { prisma } from '../auth.js';

const router = express.Router();

// Create a review
router.post('/', async (req, res) => {
    try {
        const { rating, comment, reviewerId, houseId, targetUserId } = req.body;
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                reviewerId,
                houseId,
                targetUserId
            }
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Get reviews for a house
router.get('/house/:houseId', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { houseId: req.params.houseId },
            include: { reviewer: true }
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

export default router;
