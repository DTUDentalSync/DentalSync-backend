const express = require('express');
const router = express.Router();
const appointmentCtrl = require('../Controller/AppointmentController');
const auth = require('../middleware/auth');

router.post('/', auth, appointmentCtrl.createAppointment);
router.get('/my', auth, appointmentCtrl.getMyAppointments);

module.exports = router;

