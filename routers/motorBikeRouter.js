const express = require("express");

const MotorBike = require("../models/motorBikeModel");

//create route
const router = express.Router();

// Add routes for all end points

// Collection: GET /
router.get("/", async (req, res) => {
    console.log("GET request for Collection /");

    if (req.header('Accept') != "application/json") {
        res.status(415).send();
    }
    try {
        let motorBikes = await MotorBike.find();

        let motorBikeCollection = {
            items: motorBikes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}motorBikes/`
                },
                collection: {
                    href: `${process.env.BASE_URI}motorBikes/`
                }
            },
            pagination: "Zet er nu iets in"
        }
        
        res.json(motorBikeCollection);
    } catch {
        // no response from Database
        res.status(500).send()
    }
})

// Detail: GET /id
router.get("/:_id", async (req, res) => {
    console.log(`GET request for detail ${req.params._id}`);

    try {
        let motorBike = await MotorBike.findById(req.params._id);
        if (motorBike == null) {
            res.status(404).send();
        } else {
            res.json(motorBike)
        }
    } catch {
        // ID not found, send 404
        res.status(415).send();
    }
})

// Middleware checkt header content-type
router.post("/", (req, res, next) => {
    console.log("Middleware to check content type for post")
    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else {
        next();
    }
})

//middleware against empty values post
router.post("/", async (req, res, next) => {
    console.log("Middleware to check for empty values for post")
    if(req.body.power && req.body.price && req.body.name){
        next();
    } else{
        res.status(400).send();
    }
})


// Add resource to collection: POST /
router.post("/", async (req, res) => {
    console.log("POST request for Collection /");

    let motorBike = MotorBike({
        power: req.body.power,
        price: req.body.price,
        name: req.body.name
    })

    try {
        await motorBike.save();

        res.status(201).send();
    } catch {
        res.status(500).send()
    }
})

//middleware for headers in put
router.put("/:_id", async (req, res, next) => {
    console.log("Middleware to check content type for post")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware against empty values put
router.put("/:_id", async (req, res, next) => {
    console.log("PUT Middleware to check for empty values for post")
    if(req.body.power && req.body.price && req.body.name){
        next();
    } else{
        res.status(400).send();
    }
})

router.put("/:_id", async (req, res) => {

    let motorBike = await MotorBike.findOneAndUpdate(req.params,
        {
            power: req.body.power,
            price: req.body.price,
            name: req.body.name
        })

    try {
        motorBike.save();
        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})

// Create route / delete
router.delete("/:_id", async (req, res) => {
    try {
        await MotorBike.findByIdAndDelete(req.params._id);
        res.status(204).send();
    } catch {
        res.status(404).send();
    }
})

// Create route / options
router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send("");
})

// options for detail: OPTIONS /id
router.options("/:id", async (req, res) => {
    console.log(`OPTIONS request for detail ${req.params.id}`);
    res.set({
        'Allow': 'GET, PUT, DELETE, OPTIONS'
    }).send()
})

module.exports = router;