const router = require('express').Router();

const { User, Post, Comment } = require("../../models");

// // Get all users
// router.get("/", async (req, res) => {
//     try {
//         const allUsers = await User.findAll({
//             attributes: {
//                 exclude: ["password"]
//             }
//         });
//         if (allUsers) {
//             res.status(200).json(allUsers);
//         } else {
//             res.status(400).json({ message: "No users found" })
//         };
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });

// // Get a single user
// router.get("/:id", async (req, res) => {
//     try {
//         const singleUser = await User.findOne({
//             attributes: {
//                 exclude: ["password"]
//             },
//             where: {
//                 id: req.params.id
//             }
//         });
//         if (singleUser) {
//             res.status(200).json(singleUser);
//         } else {
//             res.status(400).json({ message: "That user was not found" });
//         };
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });

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

// // Update an existing user
// router.put("/:id", async (req, res) => {
//     try {
//         const updateUser = await User.update({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         );
//         if (updateUser) {
//             res.json(updateUser);
//         } else {
//             res.status(400).json({ message: "That user was not found" });
//         };
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });

// // Delete a user
// router.delete("/:id", (req, res) => {
//     User.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(destroyUser => {
//             if (!destroyUser) {
//                 res.status(400).json({ message: "That user was not found" });
//                 return;
//             }
//             res.json(destroyUser);
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         });
// });

module.exports = router;