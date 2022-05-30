import asyncHandler from 'express-async-handler';
import Artist from '../models/artistModel.js';

// add a new artist
const addArtist = asyncHandler(async (req, res) => {
    let artist = new Artist({
        name: req.body.name,
        gender: req.body.gender,
        image: req.body.image,
    })
    artist = await artist.save();

    if (!artist) {
        return res.status(400).send('the artist cannot be created!')
    }
    res.send(artist);
})

// fetch all albums
const getArtists = asyncHandler(async (req, res) => {
    const artistList = await Artist.find().sort({ 'updatedAt': -1 })

    if (!artistList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(artistList)
})

// fetch single album
const getArtistById = asyncHandler(async (req, res) => {
    const alrtist = await Artist.findById(req.params.id)

    if (!alrtist) {
        res.status(500).json({ message: 'The alrtist with the given ID was not found' })
    }
    res.status(200).send(alrtist)
})

// get artists count
const getArtistCount = asyncHandler(async (req, res) => {
    const artistCount = await Artist.countDocuments({})

    if (!artistCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        artistCount: artistCount
    });
})

export {
    addArtist,
    getArtists,
    getArtistById,
    getArtistCount
}