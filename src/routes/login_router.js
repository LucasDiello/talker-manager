const express = require('express');

function generateToken(length) {
        const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
        const b = [];  
        for (let i = 0; i < length; i += 1) {
            const j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join('');
    }

const routerLogin = express.Router();

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!validateEmail(email)) {
 return res
    .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
    if (!password) {
 return res.status(400)
    .json({ message: 'O campo "password" é obrigatório' }); 
}
    if (password.length < 6) {
 return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
    next();
};

routerLogin.post('/', validateLogin, (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const token = generateToken(16);
        return res.status(200).send({ token });
    }
});

module.exports = routerLogin;