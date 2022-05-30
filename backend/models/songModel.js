import mongoose from 'mongoose';


const songSchema = mongoose.Schema({
    title: { type: String, required: true },
    // duration: { type: String, required: true },
    uploadedDate: { type: Date, default: Date.now },
    isFeatured: { type: Boolean, default: false },
    image: { type: String, required: true },
    audio: { type: String, required: true },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
    },
},
    {
        timestamps: true
    }
)

songSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

songSchema.set('toJSON', {
    virtuals: true,
});


const Song = mongoose.model('Song', songSchema)

export default Song