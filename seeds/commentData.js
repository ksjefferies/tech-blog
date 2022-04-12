const { Comment } = require('../models');

const commentData = [
    {
        "user_id": 2,
        "comment_text": "Walters",
    },
    {
        "user_id": 1,
        "comment_text": "Walters",
    },
    {
        "user_id": 3,
        "comment_text": "Walters",
    },
    {
        "user_id": 4,
        "comment_text": "Walters",
    },
];

const commentInfo = () => Comment.bulkCreate(commentData);

module.exports = commentInfo;