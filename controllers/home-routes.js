const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true })).reverse();

    res.render('homepage', {
      posts,
      session: req.session
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'username',
          ],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
          include: [{ model: User }]
        }
      ]
    });

    let post = postData.get({ plain: true });
    post.comments = post.comments.reverse()

    res.render('post', {
      post,
      session: req.session
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user from session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      session: req.session
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;