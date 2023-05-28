const dbuser = require("../models/users").User
const jwt = require('jsonwebtoken');

function generateJwtToken(userId, expiresIn) {
    const payload = {
        sub: userId,
    };

    const options = {
        expiresIn,

    };

    const secretKey = 'dekdek'; // Ganti dengan kunci rahasia Anda sendiri

    const token = jwt.sign(payload, secretKey, options);
    return token;
}

exports.register = async function (req, res) {
    try {
        const { username, email, password, } = req.body;

        if (username === undefined || email === undefined || password === undefined) return res.status(400).json({ message: "error minimal masukin lengkap dek" })
        const isEmail = await dbuser.findOne({
            email: email
        });
        if (isEmail != null) return res.status(400).json({ message: "error udah ada dek" })

        await dbuser.create({
            username: username,
            email: email,
            password: password
        });
        res.status(201).json({
            message: "berhasil", status: 201

        })
    } catch (error) {
        throw error
    }

}

exports.login = async function (req, res) {
    try {
        const { email, password, } = req.body;
        if (email === undefined || password === undefined) return res.status(400).json({ message: "error minimal masukin lengkap dek" })
        const isEmail = await dbuser.findOne({
            email: email
        });

        if (isEmail) {

            if (isEmail.password != password) return res.status(400).json({ message: "password salah" })

        } else {
            return res.status(400).json({ message: "belum regis dek" })
        }
        const userId = email;
        const expiresIn = '1h';
        const token = generateJwtToken(userId, expiresIn);
        console.log(token);

        res.status(200).json({
            message: "berhasil login", status: 200, token



        })
    } catch (error) {
        throw error
    }

}