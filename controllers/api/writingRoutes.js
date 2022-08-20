const router = require('express').Router();
const { Writings } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/:id', withAuth, (req, res) => {
  // update writing data
  const writingToUpdate = Writings.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(writingToUpdate)
    .catch((err) => {
      res.status(400).json(err);
    });
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

    res.status(200).json("Successfully deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
