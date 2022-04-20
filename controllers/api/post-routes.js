const router = require('express').Router();

const { Post } = require("../../models");
// const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');

// Get all posts
// router.get("/", async (req, res) => {
//     try {
//         const allPosts = await Post.findAll({
//             // Including associated comments
//             include: [
//                 {
//                     model: Comment,
//                     attributes: ["id", "text", "user_id", "post_id"]
//                 }
//             ]
//         });
//         if (allPosts) {
//             res.status(200).json(allPosts);
//         } else {
//             res.status(400).json({ message: "Posts cannot be found" });
//         };
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });


 router.get("/:id", async (req, res) => {
     try {
         const singlePost = await Post.findOne({
             where: {
                 id: req.params.id
             },
             // Including associated comments
             include: [
                 {
                     model: Comment,
                     attributes: ["id", "text", "user_id", "post_id"]
                 }
             ]
         });
         if (singlePost) {
             res.status(200).json(singlePost);
         } else {
             res.status(400).json({ message: "That post was not found" });
         };
     }
     catch (err) {
         res.status(500).json(err);
     };
 });

// Create a new post
router.post("/", withAuth, async (req, res) => {
    try {
        const createPost = await Post.create({
            title: req.body.post_title,
            post_text: req.body.post_content,
            user_id: req.session.user_id
        });

        res.status(200).json(createPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update an existing post
// router.put("/:id", withAuth, async (req, res) => {
//     try {
//         const updatePost = await Post.update(
//             {
//                 title: req.body.title,
//                 text: req.body.text,
//             },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         );
//         if (updatePost) {
//             res.json(updatePost);
//         } else {
//             res.status(400).json({ message: "That post was not found" })
//         };
//     }
//     catch (err) {
//         res.status(500).json(err);
//     };
// });

// Delete an existing post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const destroyPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!destroyPost) {
            res.status(404).json({ message: "That post was not found" });
            return;
        }
        res.status(200).json(destroyPost);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;