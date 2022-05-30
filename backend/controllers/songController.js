import asyncHandler from 'express-async-handler';
import Song from '../models/songModel.js';

// add a new song
const addSong = asyncHandler(async (req, res) => {
    let song = new Song({
        title: req.body.title,
        // duration: req.body.duration,
        uploadedDate: req.body.uploadedDate,
        isFeatured: req.body.isFeatured,
        image: req.body.image,
        audio: req.body.audio,
        album: req.body.album,
        artist: req.body.artist,
    });
    song = await song.save();

    if (!song) {
        return res.status(400).send('the song cannot be created!')
    }
    res.send(song);
})

// fetch all songs
const getSongs = asyncHandler(async (req, res) => {
    let filter = {};

    if (req.query.artists) {
        filter = { artist: req.query.artists.split(',') };
    }
    if (req.query.albums) {
        filter = { album: req.query.albums.split(',') };
    }

    const songList = await Song.find(filter).populate('artist').populate('album').sort({ 'createdAt': -1 })

    if (!songList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(songList)
})

// fetch new songs
const getNewSongs = asyncHandler(async (req, res) => {
    let filter = {};

    if (req.query.artists) {
        filter = { artist: req.query.artists.split(',') };
    }
    if (req.query.albums) {
        filter = { album: req.query.albums.split(',') };
    }

    const newSongList = await Song.find(filter).populate('artist').populate('album').sort({ 'createdAt': -1 })

    if (!newSongList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(newSongList)
})

// fetch single song
const getSongById = asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id).populate('artist').populate('album')

    if (!song) {
        res.status(500).json({ message: 'The song with the given ID was not found' })
    }
    res.status(200).send(song)
})

// get songs count
const GetSongCount = asyncHandler(async (req, res) => {
    const songCount = await Song.countDocuments({})

    if (!songCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        songCount: songCount
    });
})

// get featured songs
const getIsFeaturedSong = asyncHandler(async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const songs = await Song.find({ isFeatured: true }).limit(+count)

    if (!songs) {
        res.status(500).json({ success: false })
    }
    res.send(songs);
})

// get song by artist
const getSongByArtist = asyncHandler(async (req, res) => {
    let filter = {};
    if (req.query.artists) {
        filter = { artist: req.query.artists.split(',') };
    }
    if (req.query.albums) {
        filter = { album: req.query.albums.split(',') };
    }
    const artistList = await Song.find({ artist: req.params.artist }, filter).populate('artist').populate('album').sort({ 'updatedAt': -1 });

    if (!artistList) {
        res.status(500).json({ success: false })
    }
    res.send(artistList)
})

// get song by album
const getSongByAlbum = asyncHandler(async (req, res) => {
    let filter = {};
    if (req.query.albums) {
        filter = { album: req.query.albums.split(',') };
    }
    if (req.query.artists) {
        filter = { artist: req.query.artists.split(',') };
    }
    const albumList = await Song.find({ album: req.params.album }, filter).populate('album').populate('artist').sort({ 'updatedAt': -1 });

    if (!albumList) {
        res.status(500).json({ success: false })
    }
    res.send(albumList)
})

// search songs
const searchSongsQuery = asyncHandler(async (req, res) => {
    let data = await Song.find(
        {
            "$or": [
                { title: { $regex: req.params.key } }
            ]
        }
    );

    res.send(data);
})

// get songs count
const getSongCount = asyncHandler(async (req, res) => {
    const songCount = await Song.countDocuments({})

    if (!songCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        songCount: songCount
    });
})

export {
    addSong,
    getSongs,
    getNewSongs,
    getSongById,
    GetSongCount,
    getIsFeaturedSong,
    getSongByArtist,
    getSongByAlbum,
    searchSongsQuery,
    getSongCount
}