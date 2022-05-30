import express from 'express';
import {
    addArtist,
    getArtistById,
    getArtists,
    getArtistCount
} from '../controllers/artistController.js';

const router = express.Router()

router
    .route('/')
    .post(addArtist)
    .get(getArtists)

router.route('/:id').get(getArtistById)
router.route('/get/count').get(getArtistCount)

export default router