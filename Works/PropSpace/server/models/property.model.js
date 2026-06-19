const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    location: {
        city: {
            type: String,
            required: [true, 'City is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        }
    },
    propertyType: {
        type: String,
        required: [true, 'Property type is required'],
        enum: ['Apartment', 'House', 'Studio']
    },
    imageUrls: [{
        type: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    }
}, {
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
