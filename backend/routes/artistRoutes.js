// import express from 'express';
// import Artist from '../models/artistModel.js';

// const router = express.Router();

// router.post('/', async (req, res) => {
//     let artist = new Artist({
//         name: req.body.name,
//         gender: req.body.gender,
//         image: req.body.image,
//     })
//     artist = await artist.save();

//     if (!artist) {
//         return res.status(400).send('the artist cannot be created!')
//     }
//     res.send(artist);
// })

// router.get('/', async (req, res) => {
//     const artistList = await Artist.find().sort({ 'updatedAt': -1 })

//     if (!artistList) {
//         res.status(500).json({ success: false })
//     }
//     res.status(200).send(artistList)
// })

// router.get('/:id', async (req, res) => {
//     const alrtist = await Artist.findById(req.params.id)

//     if (!alrtist) {
//         res.status(500).json({ message: 'The alrtist with the given ID was not found' })
//     }
//     res.status(200).send(alrtist)
// })
// export default router


import express from 'express';
import {
    addArtist,
    getArtistById,
    getArtists
} from '../controllers/artistController.js';

const router = express.Router()

router
    .route('/')
    .post(addArtist)
    .get(getArtists)

router.route('/:id').get(getArtistById)

export default router