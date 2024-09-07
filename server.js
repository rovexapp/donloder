const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد التخزين باستخدام Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const appName = req.body.appName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const extension = path.extname(file.originalname);
        cb(null, `${appName}${extension}`);
    }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // خدمة الملفات المرفوعة

app.post('/upload', upload.single('appFile'), (req, res) => {
    if (req.file) {
        const downloadLink = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.send(`تم رفع التطبيق بنجاح! <a href="${downloadLink}">تحميل ${req.file.filename}</a>`);
    } else {
        res.status(400).send('فشل رفع الملف.');
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
