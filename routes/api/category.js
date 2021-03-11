const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Category = require('../../models/Category');

//  @route  GET api/category/
//  @desc   Get caregories
//  @access Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({ categories, msg: 'All Moovie category is here! Take it.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  POST api/category
//  @desc   Register new category
//  @access Private
router.post('/', auth, async (req, res) => {
  // TODO - _id, name, symbol validation
  try {
    const { _id, name, symbol } = req.body;
    if (_id) {
      const category = await Category.findById(_id);
      return res
        .status(400)
        .json({ category, msg: 'Category already exists!' });
    } else {
      const category = await Category.findOne({ name });

      if (!category) {
        const newCategory = new Category({ name, symbol });
        const newlyCreatedCategory = await newCategory.save();

        return res.status(200).json({
          category: newlyCreatedCategory,
          msg: 'Category created successfully!',
        });
      } else
        res.status(400).json({ category, msg: 'Category already exists!' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  PUT api/category/:category_id
//  @desc   Update category by ID
//  @access Private
router.put(
  '/:category_id',
  [
    check('name', 'Name is required with minimum length of 3 character.')
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // TODO - _id, name, symbol validation
    try {
      const _id = req.params.category_id;
      const { name, symbol, fontColor, bgColor } = req.body;

      const isCategory = await Category.findById({ _id });

      if (isCategory) {
        const updatedCategory = await Category.findOneAndUpdate(
          _id,
          {
            name,
            symbol,
            fontColor,
            bgColor,
          },
          { new: true }
        );
        return res.json({
          category: updatedCategory,
          msg: 'Category has been updated!',
        });
      } else {
        res
          .status(404)
          .json({ msg: `Category with ID: ${_id}, does not exists!` });
      }
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Category not found!' });
      }
      res.status(500).send('Server Error');
    }
  }
);

//  @route  DELETE api/category/:category_id
//  @desc   Remove category by ID
//  @access Private
router.delete('/:category_id', auth, async (req, res) => {
  try {
    const _id = req.params.category_id;

    if (_id) {
      const category = await Category.findById(_id);
      if (category) {
        await Category.findByIdAndDelete(_id);
        return res.json({ msg: 'Category has been removed!' });
      } else {
        return res
          .status(404)
          .json({ msg: `Category with ID: ${_id}, does not exists!` });
      }
    } else {
      res.status(404).json({ msg: 'Category ID is not valid!' });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found!' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
