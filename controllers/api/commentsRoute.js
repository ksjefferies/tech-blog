const router = require('express').Router();
const { json, where } = require('sequelize/types');
const { Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
    const allComments = await Comment.findAll([]);
    res.json(allComments);
});

// create new comments
router.post('/', async (req, res) => {
    try {
        const createComment = await Comment.create({
            text: req.body.text,
            user_id: req.body.user_id,
            blog_id: req.body.blog_id
        })
        res.status(200).json(createComment);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

router.put('/', async (req, res) => {
    try {
        const updateComment = await Comment.update({
            text: req.body.text
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
            res.status(400).json({ message: 'That comment was not found' })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// delete comment
router.delete('/:id', async (req, res) => {
    try {
        const destroyComment = Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!destroyComment) {
            res.status(400).json({ message: 'That comment was not found' });
        } else {
            res.json('Success');
        };
    }
    catch (err) {
        res.status(400).json(err);
    };
});

module.exports = router;