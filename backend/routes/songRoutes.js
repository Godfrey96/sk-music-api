import express from 'express';
import {
    addSong,
    getSongs,
    getNewSongs,
    getSongById,
    getSongCount,
    getIsFeaturedSong,
    getSongByAlbum,
    getSongByArtist,
    searchSongsQuery
} from '../controllers/songController.js';

const router = express.Router()

router
    .route('/')
    .post(addSong)
    .get(getSongs)

router.route('/:id').get(getSongById)
router.route('/newsongs/:count').get(getNewSongs)
router.route('/featuredsongs/:count').get(getIsFeaturedSong)
router.route('/get/song-by-album/:album').get(getSongByAlbum)
router.route('/get/song-by-artist/:artist').get(getSongByArtist)
router.route('/searchsongs/:key').get(searchSongsQuery)
router.route('/get/count').get(getSongCount)

export default router