const router = require('express').Router();

const e = require('express');
const { User, Post, Comment } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        });
        if (allUsers) {
            res.status(200).json(allUsers);
        } else {
            res.status(400).json({ message: "No users found" })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Get a single user
router.get("/:id", async (req, res) => {
    try {
        const singleUser = await User.findOne({
            attributes: {
                exclude: ["password"]
            },
            where: {
                id: req.params.id
            }
        });
        if (singleUser) {
            res.status(200).json(singleUser);
        } else {
            res.status(400).json({ message: "That user was not found" });
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// // Login
// router.post("/", async (req, res) => {

// });

// // Logout
// router.post("/", async (req, res) => {

// });

// Create a new user
// router.post("/", async (req, res) => {
//     try {
//         const createUser = await User.create({
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             email: req.body.email,
//             // figure out how to make the hash the password
//             password: req.body.password
//         });
//         // createUser.password = await bcrypt.hash(req.body.password, 10);
//         res.status(200).json(createUser);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });

// Update an existing user
router.put("/:id", async (req, res) => {
    try {
        const updateUser = await User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            // figure out how to make the hash the password
            password: req.body.password
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        // createUser.password = await bcrypt.hash(req.body.password, 10);
        if (updateUser) {
            res.json(updateUser);
        } else {
            res.status(400).json({ message: "That user was not found" });
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Delete a user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(destroyUser => {
            if (!destroyUser) {
                res.status(400).json({ message: "That user was not found" });
                return;
            }
            res.json(destroyUser);
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;