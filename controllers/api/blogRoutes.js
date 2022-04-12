const router = require('express').Router();

const {Blogs, Users,Comments} = require('../../models');
const sequelize = require('../../config/connection');

//get all posts
router.get('', (req, res) => {

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