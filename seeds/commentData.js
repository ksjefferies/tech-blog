const { Comment } = require('../models');

const commentData = [
    {
        "user_id": 2,
        "comment_text": "Walters",
        "blog_id":2
    },
    {
        "user_id": 1,
        "comment_text": "Walters",
        "blog_id":1

    },
    {
        "user_id": 3,
        "comment_text": "Walters",
        "blog_id":3
    },
    {
        "user_id": 4,
        "comment_text": "Walters",
        "blog_id":4
    },
];

const commentInfo = () => Comment.bulkCreate(commentData);

module.exports = commentInfo;