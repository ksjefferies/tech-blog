const router = require('express').Router();

const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

//get all posts
router.get('/', async (req, res) => {
    try {
        const getAllBlogs = await Blog.findAll({
            attributes: [
                id,
                blog_text,
                title
            ],
            


            ]
    })
    }
    

})
// get single post using id
router.get('', (req, res) => {

})

// create new post
router.post('', (req, res) => {

})

// update a post
router.put('', (req, res) => {

})

//delete post
router.delete('', (req, res) => {

})












module.exports = router;