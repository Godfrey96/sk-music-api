import express from 'express';
import {
    addAlbum,
    getAlbums,
    getAlbumById,
    getAlbumByArtist,
    getAlbumCount
} from '../controllers/albumController.js';

const router = express.Router()

router
    .route('/')
    .post(addAlbum)
    .get(getAlbums)

router.route('/:id').get(getAlbumById)
router.route('/get/album-by-artist/:artist').get(getAlbumByArtist)
router.route('/get/count').get(getAlbumCount)

export default router