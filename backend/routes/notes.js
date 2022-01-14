const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { route } = require("express/lib/application");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        console.log(notes);
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

router.post("/addnotes", fetchuser, [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
    body("tag").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednotes = await note.save();
        res.json(savednotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note is deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

module.exports = router;