const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User hasMany Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User hasMany Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Post hasMany Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };