const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    carrier: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);