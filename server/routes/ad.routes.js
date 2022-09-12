const AdController = require('../controllers/ad.controller');

module.exports = (app) => {
    app.post('/api/ad', AdController.createNewAd);
    app.get('/api/ad', AdController.getAllAds);
    app.get('/api/ad/:id', AdController.getOneAd);
    app.put('/api/ad/:id', AdController.updateAd);
    app.patch('/api/ad/:id', AdController.updateStatusAd);
    app.delete('/api/ad/:id', AdController.deleteAd);
};
