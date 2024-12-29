const User = require('../models/user');

module.exports = async (req, res) => {
    try {
        // ตรวจสอบว่า userId ในเซสชันมีค่าหรือไม่
        if (!req.session.userId) {
            return res.redirect('/login');  // หากไม่มี userId, รีไดเรกไปหน้าล็อกอิน
        }

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        let UserData = await User.findById(req.session.userId);

        // ตรวจสอบว่า UserData มีค่า
        if (!UserData) {
            return res.redirect('/login');  // หากไม่พบผู้ใช้ในฐานข้อมูล, รีไดเรกไปหน้าล็อกอิน
        }

        // ส่งข้อมูลผู้ใช้ไปยังหน้าหลัก
        res.render('home', { UserData });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
};
