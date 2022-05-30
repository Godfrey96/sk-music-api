import express from 'express';
import { config } from 'dotenv';
import colors from 'colors';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error-handler.js';

import albumRoutes from './routes/albumRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import songRoutes from './routes/songRoutes.js';

config();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

connectDB()

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/songs', songRoutes);


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))