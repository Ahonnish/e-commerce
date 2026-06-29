const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { signupSchema } = require('../validations/auth.validation');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', login);

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

module.exports = router;
