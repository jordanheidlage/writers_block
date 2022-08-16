const router = require('express').Router();
const { Writings, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all  and JOIN with user data
    const writingsData = await Writings.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    // const writings = writingsData.map((writings) => writings.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   writings, 
    //   logged_in: req.session.logged_in 
    // });

    res.status(200).json(writingsData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Writings/:id', async (req, res) => {
  try {
    const WritingsData = await Writings.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const Writings = WritingsData.get({ plain: true });

    res.render('Writings', {
      ...Writings,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Writings }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
