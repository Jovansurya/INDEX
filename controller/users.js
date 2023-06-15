const dbuser = require("../models/users").User
const jwt = require('jsonwebtoken');

const readlineSync = require('readline-sync');
const bcrypt = require('bcrypt');
const { response } = require("express");

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
const saltRounds = 10;

exports.register = async function (req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser = await dbuser.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "udah ada dek" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await dbuser.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "berhasil bang",
            status: 201
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async function (req, res) {
    try {
        const { email, password, } = req.body;
        if (email === undefined || password === undefined) return res.status(400).json({ message: "error minimal masukin lengkap dek" })
        const isEmail = await dbuser.findOne({
            email: email
        });


        if (isEmail) {
            const userPassword = req.body.password; // User-provided password from the login form
            const storedHashedPassword = isEmail.password;
            let decrypt = bcrypt.compare(userPassword, storedHashedPassword)

            if (decrypt === true) {
                return res.status(200).json({ message: "login berhasil" })
            }

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