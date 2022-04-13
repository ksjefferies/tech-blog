const { Comment } = require('../models');

const commentSeeds = [
    {
        "user_id": 2,
        "comment_text": "Walters",
        "post_id":2
    },
    {
        "user_id": 1,
        "comment_text": "Walters",
        "post_id":1

    },
    {
        "user_id": 3,
        "comment_text": "Walters",
        "post_id":3
    },
    {
        "user_id": 4,
        "comment_text": "Walters",
        "post_id":4
    },
];

const commentInfo = () => Comment.bulkCreate(commentSeeds);

module.exports = commentInfo;