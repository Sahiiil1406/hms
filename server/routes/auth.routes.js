const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const {
    userSignup,
    userLogin,
    doctorSignup,
    doctorLogin,
    userAndDoctorLogout,
    updateUser,
    updateDoctor
}=require('../controllers/auth.js')

router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);
router.post('/doctor/signup', doctorSignup);
router.post('/doctor/login', doctorLogin);
router.post('/logout', auth, userAndDoctorLogout);
router.put('/user/update', auth, updateUser);
router.put('/doctor/update/:doctorId', auth, updateDoctor);


module.exports = router;