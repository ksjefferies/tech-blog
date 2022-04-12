const User = require("./User")
const Blog = require("./Blog")
const Comment = require("./Comment")

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: "user.id"
});

// Comment belongsTo Blog
Comment.belongsTo(Blog, {
    foreignKey: "blog_id"
});

// Blog belongsTo User
Blog.belongsTo(User, {
    foreignKey: "user_id"
});

// User hasMany Comments
User.hasMany(Comment, {
    foreignKey: "user_id"
});

// User hasMany Blogs
User.hasMany(Blog, {
    foreignKey: "user_id"
});

// Blog hasMany Comments
Blog.hasMany(Comment, {
    foreignKey: "blog_id"
});

 module.exports = {User, Blog, Comment}