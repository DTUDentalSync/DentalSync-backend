const Appointment = require('../Models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment({ ...req.body, patientId: req.user.id });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.user.id }).populate('doctorId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId, status: 'pending' });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

