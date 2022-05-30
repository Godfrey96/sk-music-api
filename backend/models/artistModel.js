import mongoose from 'mongoose';

const artistSchema = mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String, required: true },
},
    {
        timestamps: true
    }
)

artistSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

artistSchema.set('toJSON', {
    virtuals: true,
});

const Artist = mongoose.model('Artist', artistSchema)

export default Artist