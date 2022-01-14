const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const JWT_SECRET = "IamVeryGOODAwasomeMan";
const fetchuser = require("../middleware/fetchuser")

router.post("/createuser", [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
], async (req, res) => {
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({ auth_token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
})

router.post("/authenticateuser", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot Be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ enter: "Please enter correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET);
        res.json({ auth_token })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = await req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;