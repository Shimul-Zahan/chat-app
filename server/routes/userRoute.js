const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const User = require('../models/User');
const router = express.Router();

// router.route('/login').post(registerUser)
router.route('/reg').post(registerUser)
router.route('/login').post(loginUser)
router.route('/all-users').get(getAllUsers)
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router