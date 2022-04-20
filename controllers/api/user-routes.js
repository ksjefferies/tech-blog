const router = require('express').Router();

const { User, Post, Comment } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
    try {
        const createUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = createUser.id;
            req.session.loggedIn = true;

            res.status(200).json(createUser);
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

// Login
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again" });
            return;
        };
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id,
                req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: "You have logged in" });
        });
    }
    catch (err) {
        res.status(400).json(err);
    };
});

// Logout
router.post("/logout", async (req, res) => {
    try {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;