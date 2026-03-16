require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const connectDB = require('./Config/database');
const User = require('./Models/User');
const Doctor = require('./Models/Doctor');
const bcrypt = require('bcryptjs');

connectDB();

const seedData = async () => {
    try {
        // Clear old data
        await User.deleteMany({});
        await Doctor.deleteMany({});

        // Create users
        const doctorUsers = await Promise.all([
            User.create({
                name: 'BS. Nguyễn Văn Hải',
                email: 'hai@example.com',
                password: await bcrypt.hash('123456', 10),
                role: 'doctor'
            }),
            User.create({
                name: 'BS. Trần Thị Lan',
                email: 'lan@example.com',
                password: await bcrypt.hash('123456', 10),
                role: 'doctor'
            }),
            User.create({
                name: 'BS. Lê Minh Tuấn',
                email: 'tuan@example.com',
                password: await bcrypt.hash('123456', 10),
                role: 'doctor'
            }),
            User.create({
                name: 'Patient Test',
                email: 'patient@test.com',
                password: await bcrypt.hash('123456', 10),
                role: 'patient'
            }),
            User.create({
                name: 'Staff Admin',
                email: 'staff@test.com',
                password: await bcrypt.hash('123456', 10),
                role: 'staff'
            })
        ]);

        // Doctors
        await Doctor.create({
            userId: doctorUsers[0]._id,
            specialty: 'Nha khoa tổng quát',
            hospital: 'Bạch Mai',
            experience: 10,
            fee: 500000,
            schedule: [{ day: 'T2', from: '8:00', to: '12:00' }],
            rating: 4.8,
            reviewsCount: 120
        });
        await Doctor.create({
            userId: doctorUsers[1]._id,
            specialty: 'Nhổ răng',
            hospital: 'Nhi TW',
            experience: 8,
            fee: 300000,
            schedule: [{ day: 'T3', from: '14:00', to: '17:00' }],
            rating: 4.5,
            reviewsCount: 89
        });
        await Doctor.create({
            userId: doctorUsers[2]._id,
            specialty: 'Niềng răng',
            hospital: 'Răng Hàm Mặt TW',
            experience: 12,
            fee: 400000,
            schedule: [{ day: 'T4', from: '9:00', to: '15:00' }],
            rating: 4.7,
            reviewsCount: 65
        });

        console.log('✅ SEED THÀNH CÔNG!');
        console.log('👤 Patient: patient@test.com / 123456');
        console.log('👨‍⚕️ Doctor: hai@example.com / 123456');
        console.log('👨‍💼 Staff: staff@test.com / 123456');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed lỗi:', error.message);
        process.exit(1);
    }
};

seedData();

