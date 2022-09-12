const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    campaignTitle: {
        type: String,
        required: [true, 'Campaign Title is required'],
        minLength: [3, 'Campaign Title must be at least 3 characters'],
        maxLength: [50, 'Campaign Title must be a maximum of 50 characters'],
    },
    targetAddress: {
        type: String,
        required: [true, 'Target Address is required'],
        minLength: [5, 'Target Address must be at least 5 characters'],
        // add validation that ensures http:// or https:// is included in address
    },
    displayLink: {
        type: String,
        required: [true, 'Display Link is required'],
        minLength: [5, 'Display Link must be at least 5 characters'],
        maxLength: [70, 'Display Link must be a maximum of 70 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description must be at least 10 characters'],
        maxLength: [100, 'Description must be a maximum of 100 characters'],
    },
    bidForPlacement: {
        type: Number,
        required: [true, 'Bid for Placement is required'],
        min: [0.10, 'Bid for Placement must be at least $0.10 cents'],
        max: [2.00, 'Bid for Placement must be a maximum of $2.00 dollars'],
        default: 0.10,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    amountBilled: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Ad', AdSchema);

// unique: true, // need to work more on getting unique working
// if login and reg - need to add relationship one user to many ads
// new field would be email perhaps createdBy