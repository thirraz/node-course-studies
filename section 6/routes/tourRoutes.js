const express = require("express")
const tourController = require("./../controllers/tourController")
/* 
	OTHER WAY TO IMPORT CONTROLLERS
const {
	createTour,
	deleteTour,
	getAllTours,
	getTour,
	updateTour
} = require("./../controllers/tourController") */

const router = express.Router()

router.param("id", tourController.checkID)

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.createTour)
router
	.route("/:id")
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.delete(tourController.deleteTour)

module.exports = router
