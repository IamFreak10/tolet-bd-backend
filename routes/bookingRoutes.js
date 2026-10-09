import express from 'express';
import { prisma } from '../auth.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
    try {
        const { houseId, tenantId, startDate, endDate, totalAmount } = req.body;
        const booking = await prisma.booking.create({
            data: {
                houseId,
                tenantId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalAmount
            }
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Get user's bookings (as tenant)
router.get('/my-bookings/:tenantId', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { tenantId: req.params.tenantId },
            include: { house: true }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// Get bookings for a landlord's houses
router.get('/requests/:landlordId', async (req, res) => {
    try {
        const requests = await prisma.booking.findMany({
            where: {
                house: { ownerId: req.params.landlordId }
            },
            include: { house: true, tenant: true }
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body; // APPROVED, REJECTED
        const booking = await prisma.booking.update({
            where: { id: req.params.id },
            data: { status }
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking status' });
    }
});

export default router;
