const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const FILE_PATH = '../checkSkills/public/data.json';

// ✅ ฟังก์ชันอ่าน JSON อย่างปลอดภัย
function readJsonFile(callback) {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ อ่านไฟล์ไม่สำเร็จ:', err);
            return callback([]); // ถ้าผิดพลาด ให้ return เป็น array ว่าง
        }

        try {
            let jsonData = JSON.parse(data);
            if (!Array.isArray(jsonData)) {
                jsonData = []; // ป้องกันข้อมูลผิดพลาด โดยบังคับให้เป็น array
            }
            callback(jsonData);
        } catch (parseErr) {
            console.error('❌ แปลง JSON ไม่สำเร็จ:', parseErr);
            callback([]); // ถ้า JSON พัง ให้ return เป็น array ว่าง
        }
    });
}

// ✅ API สำหรับเพิ่มข้อมูลใหม่เข้า JSON
app.post('/update-json', (req, res) => {
    const newData = req.body;

    readJsonFile((jsonData) => {
        if (Array.isArray(newData)) {
            jsonData = [...jsonData, ...newData]; // ถ้า newData เป็น array ให้รวมเข้าไปเลย
        } else {
            jsonData.push(newData); // ถ้าเป็น object ให้ push ตามปกติ
        }
        

        fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('❌ เขียนไฟล์ไม่สำเร็จ:', writeErr);
                return res.status(500).send('เกิดข้อผิดพลาดในการเขียนไฟล์');
            }
            console.log('✅ อัปเดต JSON สำเร็จ:', newData);
            res.send('อัปเดต JSON สำเร็จ');
        });
    });
});

// ✅ API สำหรับดึงข้อมูล JSON ทั้งหมด
app.get('/get-json', (req, res) => {
    readJsonFile((jsonData) => {
        res.json(jsonData);
    });
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});
