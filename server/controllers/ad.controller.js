const Ad = require('../models/ad.model');

// CRUD Below -------------------------------------------------------------

// Create
const createNewAd = (req, res) => {
    Ad.create(req.body)
        .then((newAd) => {
            res.json({ newAd });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Get / Read All
const getAllAds = (req, res) => {
    Ad.find()
        .then((allAds) => {
            res.json(allAds);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Get / Read One
const getOneAd = (req, res) => {
    Ad.findOne({ _id: req.params.id })
        .then((queriedAd) => {
            res.json(queriedAd);
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Update - with validators so we can capture and display errors on front end
const updateAd = (req, res) => {
    Ad.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedAd) => {
            res.json({ updatedAd });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// Delete
const deleteAd = (req, res) => {
    Ad.deleteOne({ _id: req.params.id })
        .then((deletedResponse) => {
            res.json({ deletedResponse });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};

// --------------------------------------------------------------------------

const updateStatusAd = (req, res) => {
    Ad.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedAd) => {
            res.json({ updatedAd });
        })
        .catch((err) => {
            res.status(400).json({ err });
        });
};


module.exports = {
    createNewAd,
    getOneAd,
    getAllAds,
    updateAd,
    deleteAd,
    updateStatusAd,
};