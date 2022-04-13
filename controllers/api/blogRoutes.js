const router = require('express').Router();

const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const e = require('express');

//get all posts
router.get('/', async (req, res) => {
    try {
        const allBlogs = await Blog.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'user_id', 'blog_id']
                }
            ]
        });
        if (allBlogs) {
            res.status(200).json(allBlogs);
        } else {
            res.status(400).json({ message: 'Blogs cannot be found' });
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// get single post using id
router.get('/:id', async (req, res) => {
    try {
        const singleBlog = await Blog.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'text', 'user_id', 'blog_id']
                }
            ]
        });
        if (singleBlog) {
            res.status(200).json(singleBlog);
        } else {
            res.status(400).json({ message: 'That blog was not found' });
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Create a new blog post
router.post("/", async (req, res) => {
    try {
        const createBlog = await Blog.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });
        if (createBlog) {
            res.json("Success");
        } else {
            res.status(400).json({ message: "Unable to create blog" })
        }
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Update an existing blog post
router.put("/:id", async (req, res) => {
    try {
        const updateBlog = await Blog.update(
            {
                title: req.body.title,
                text: req.body.text,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (updateBlog) {
            res.json(updateBlog);
        } else {
            res.status(400).json({ message: "That blog was not found" })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Delete an existing blog post
router.delete("/:id", async (req, res) => {
    try {
        const destroyBlog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!destroyBlog) {
            res.status(400).json({ message: "That blog was not found" });
        } else {
            res.json(destroyBlog);
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;