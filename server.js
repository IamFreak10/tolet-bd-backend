import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { toNodeHandler } from 'better-auth/node';
import { auth, prisma } from './auth.js';
import houseRoutes from './routes/houseRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();

// Security and Performance Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Compress responses for better performance
app.use(cors());
app.use(express.json());

// Rate Limiting (Protects from DDoS and brute force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per 15 mins
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Better Auth API route
app.all("/api/auth/*", toNodeHandler(auth));

// Application routes
app.use('/api/houses', houseRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('To-Let BD API is running with High Performance & Security! 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
