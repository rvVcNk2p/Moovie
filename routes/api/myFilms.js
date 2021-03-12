const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Category = require('../../models/Category');
const Film = require('../../models/Film');
const MyFilm = require('../../models/MyFilm');
const User = require('../../models/User');

//  @route  GET api/my-films/
//  @desc   Get Films from logged in User [ID]
//  @access Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userFilms = await MyFilm.find({ userId }).populate({
      path: 'filmId',
      populate: { path: 'categories' },
    });
    res.json({ films: userFilms, msg: `Films of User with ID: ${userId}` });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/my-films
//  @desc   Creat and Update a (my-film) document
//  @access Private
router.post('/', auth, async (req, res) => {
  // TODO - _id validation
  try {
    const userId = req.user.id;
    const {
      _id,
      filmId,
      note,
      isAlreadySeen,
      isNeedItToWatch,
      rating,
    } = req.body;

    if (_id) {
      // Update selected Film in your library - [ ID ]
      const updatedFilm = await MyFilm.findByIdAndUpdate(
        { _id, userId },
        { filmId, note, isAlreadySeen, isNeedItToWatch, rating },
        { upsert: true, new: true }
      ).populate({
        path: 'filmId',
        populate: { path: 'categories' },
      });
      res.json({
        myfilm: updatedFilm,
        msg: 'Selected film was successfully updated.',
      });
    } else {
      const myFilm = await MyFilm.findOne({ userId, filmId });
      if (myFilm) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Film already added!' }] });
      } else {
        // Create a new Film to your library
        const newFilm = new MyFilm({
          userId,
          filmId,
          note: null,
          isAlreadySeen: false,
          isNeedItToWatch: true,
          rating: null,
        });
        const newlyCreatedFilm = await newFilm.save().then((doc) => {
          return doc
            .populate({
              path: 'filmId',
              populate: { path: 'categories' },
            })
            .execPopulate();
        });
        return res.json({
          myFilm: newlyCreatedFilm,
          msg: 'Selected film was successfully added to your Watchlist.',
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  PUT api/my-films/watch
//  @desc   Creat and Update a (my-film) document
//  @access Private
router.put('/watch', auth, async (req, res) => {
  // TODO - _id validation
  try {
    const userId = req.user.id;
    const { _id } = req.body;

    if (_id) {
      // Update selected Film in your library - [ ID ]
      const updatedFilm = await MyFilm.findByIdAndUpdate(
        { _id, userId },
        { isAlreadySeen: true, isNeedItToWatch: false },
        { upsert: true, new: true }
      ).populate({
        path: 'filmId',
        populate: { path: 'categories' },
      });

      res.json({
        film: updatedFilm,
        msg: `Selected film == ${updatedFilm.filmId.name} == was successfully watched.`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  PUT api/my-films/unwatch
//  @desc   Creat and Update a (my-film) document
//  @access Private
router.put('/unwatch', auth, async (req, res) => {
  // TODO - _id validation
  try {
    const userId = req.user.id;
    const { _id } = req.body;

    if (_id) {
      // Update selected Film in your library - [ ID ]
      const updatedFilm = await MyFilm.findByIdAndUpdate(
        { _id, userId },
        { isAlreadySeen: false, isNeedItToWatch: true },
        { upsert: true, new: true }
      ).populate({
        path: 'filmId',
        populate: { path: 'categories' },
      });

      res.json({
        film: updatedFilm,
        msg: `Selected film == ${updatedFilm.filmId.name} == was successfully unwatched.`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
