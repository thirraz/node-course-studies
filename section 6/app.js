const express = require("express")
const morgan = require("morgan")
const fs = require("fs")

const app = express()

// 1) MIDDLEWARES
app.use(morgan("dev"))

app.use(express.json())

app.use((req, res, next) => {
	console.log("Hello from the middleware🐱‍👓")
	next()
})

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString()
	next()
})

const port = 3000

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

// 2) ROUTE HANDLERS
// route "/tour"
const getAllTours = (req, res) => {
	console.log(req.requestTime)
	res.status(200).json({
		status: "sucess",
		requestedAt: req.requestTime,
		results: tours.length,
		data: {
			tours
		}
	})
}

const getTour = (req, res) => {
	console.log(req.params)

	/* convert string to number (type coersion)
	 const id = req.params.id * 1 */
	const id = +req.params.id
	const tour = tours.find((el) => el.id === +id)

	if (id > tours.length || !tour) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		})
	}

	res.status(200).json({
		status: "sucess",
		data: {
			tour
		}
	})
}

const createTour = (req, res) => {
	// console.log(req.body)
	const newId = tours[tours.length - 1].id + 1
	const newTour = Object.assign({ id: newId }, req.body)

	tours.push(newTour)
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: "sucess",
				data: {
					tour: newTour
				}
			})
		}
	)
}

const updateTour = (req, res) => {
	const id = +req.params.id

	if (id > tours.length) {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		})
	}
	res.status(200).json({
		status: "sucess",
		data: {
			tour: "<Updated tour here...>"
		}
	})
}

const deleteTour = (req, res) => {
	const id = +req.params.id
	if (id > tours.length) {
		res.status(404).json({
			status: "fail",
			message: "Invalid ID"
		})
	}

	res.status(204).json({
		status: "sucess",
		data: null
	})
}

//route /users
const getAllUsers = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined"
	})
}

const createUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined"
	})
}

const getUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined"
	})
}

const updateUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined"
	})
}

const deleteUser = (req, res) => {
	res.status(500).json({
		status: "error",
		message: "This route is not yet defined"
	})
}

// always specifies API version
/*  MORE CODE WAY
app.get("/api/v1/tours", getAllTours);
app.post("/api/v1/tours", createTour);
app.get("/api/v1/tours/:id", getTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour); */

// 3) ROUTES
app.route("/api/v1/tours").get(getAllTours).post(createTour)
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour)

app.route("/api/v1/users").get(getAllUsers).post(createUser)

app.route("/api/v1/users/:id").get(getUser).patch(updateUser).delete(deleteUser)
// 4) START SERVER
app.listen(port, () => {
	console.log("Runnning on ")
})
