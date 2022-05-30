import mongoose from 'mongoose'

const albumSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
},
    {
        timestamps: true
    }
)

albumSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

albumSchema.set('toJSON', {
    virtuals: true,
});

const Album = mongoose.model('Album', albumSchema)

export default Album