const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js')
const ExpressError = require('../utils/ExpressError');
const reviews = require('../controllers/reviews.js')
const Campground = require('../models/campground');
const Review = require('../models/review');
const {reviewSchema} = require('../schemas.js');







router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;