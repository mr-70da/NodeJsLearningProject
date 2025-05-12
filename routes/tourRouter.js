const express = require('express');
const tourController = require('../controller/tourController');
const router = express.Router();
router.route('/').
get(tourController.getAllTours).
post(tourController.addTour);
router.route('/:id').
get(tourController.getTour).
delete(tourController.deleteTour).
patch(tourController.patchTour);

module.exports = router;