const router = require('express').Router();

const { Comment } = require("../../models");
const withAuthorization = require('../../utils/auth');

// Get all comments
router.get("/", async (req, res) => {
    const allComments = await Comment.findAll({});
    res.json(allComments);
});

// Create a new comment
router.post("/", withAuthorization, async (req, res) => {
    try {
        const createComment = await Comment.create({
            text: req.body.text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        res.status(200).json(createComment);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Update an existing comment
router.put("/:id", withAuthorization, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            text: req.body.text,
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (updateComment) {
            res.status(200).json(updateComment);
        } else {
            res.status(400).json({ message: "That comment was not found" })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Delete an existing comment
router.delete("/:id", withAuthorization, async (req, res) => {
    try {
        const destroyComment = Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!destroyComment) {
            res.status(400).json({ message: "That comment was not found" });
        } else {
            res.json("Success");
        };
    }
    catch (err) {
        res.status(400).json(err);
    };
});

module.exports = router;