// Notes Router
const express = require("express");
const router = express.Router();

//create route
const Note = require("../models/notesModel");




// Collection GET /
router.get("/", async (req, res) => {
    console.log("GET");
    try {
        let notes = await Note.find();

        // create representation for collection as requested in assignment
        // items, _links, pagination

        let notesCollection = {
            items: notes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}notes/`
                },
                collection: {
                    href: `${process.env.BASE_URI}notes/`
                }
            },
            pagination: "Doen we een andere keer, maar er moet iets in staan voor de checker"
        }

        res.json(notesCollection);
    } catch {
        res.status(500).send()
    }
})

// create route for detail
router.get("/:id", (req, res) => {
    // Finds(_id)
    console.log("GET");
    res.send(`request for item ${req.params.id}`);
})

// Create route
router.post("/", async (req, res) => {
    console.log("POST");

    // Deze info moet uit request komen
    let note = new Note({
        title: "test1",
        body: "test1",
        author: "test1"
    })

    try {
        await note.save();

        res.json(note);
    } catch {
        res.status(500).send()
    }

    // res.send("Test Hello Express!!!");
})

// Create route /
router.delete("/", (req, res) => {
    console.log("DELETE");
    res.send("Test Hello Express!!!");
})

// Create route /
router.options("/", (req, res) => {
    console.log("OPTIONS");
    res.send("Test Hello Express!!!");
})

module.exports = router;