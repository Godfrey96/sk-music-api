import asyncHandler from 'express-async-handler';
import Album from '../models/albumModel.js';
import Artist from '../models/artistModel.js';

// add a new album
const addAlbum = asyncHandler(async (req, res) => {
    let album = new Album({
        name: req.body.name,
        image: req.body.image,
    });
    album = await album.save();

    if (!album) {
        return res.status(400).send('the album cannot be created!')
    }
    res.send(album);
})

// fetch all albums
const getAlbums = asyncHandler(async (req, res) => {
    const albumList = await Album.find().sort({ 'updatedAt': -1 })

    if (!albumList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(albumList)
})

// fetch single album
const getAlbumById = asyncHandler(async (req, res) => {
    const album = await Album.findById(req.params.id)

    if (!album) {
        res.status(500).json({ message: 'The album with the given ID was not found' })
    }
    res.status(200).send(album)
})

// get album by artist
const getAlbumByArtist = asyncHandler(async (req, res) => {
    let filter = {};
    if (req.query.artists) {
        filter = { artist: req.query.artists.split(',') };
    }
    const artistList = await Album.find({ artist: req.params.artist }, filter).populate('artist').sort({ 'updatedAt': -1 });

    if (!artistList) {
        res.status(500).json({ success: false })
    }
    res.send(artistList)
})

// get artists count
const getAlbumCount = asyncHandler(async (req, res) => {
    const albumCount = await Album.countDocuments({})

    if (!albumCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        albumCount: albumCount
    });
})

export {
    addAlbum,
    getAlbums,
    getAlbumById,
    getAlbumByArtist,
    getAlbumCount
}