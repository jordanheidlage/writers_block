const router = require('express').Router();
const { Writings } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newWritings = await Writings.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWritings);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/', withAuth, async (req, res) => {
    try {
      const newWritings = await Writings.update({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newWritings);
    } catch (err) {
      res.status(400).json(err);
    }
  });


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const writingsData = await Writings.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!writingsData) {
      res.status(404).json({ message: 'No Writings found with this id!' });
      return;
    }

    res.status(200).json("Successfully deleted writing");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
