import express from 'express';
import {
    addAlbum,
    getAlbums,
    getAlbumById,
    getAlbumByArtist
} from '../controllers/albumController.js';

const router = express.Router()

router
    .route('/')
    .post(addAlbum)
    .get(getAlbums)

router.route('/:id').get(getAlbumById)
router.route('/get/album-by-artist/:artist').get(getAlbumByArtist)

export default router