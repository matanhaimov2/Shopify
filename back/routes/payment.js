// backend/paypal.js

const express = require('express');
const dotenv = require('dotenv');
const paypal = require('paypal-rest-sdk');
const router = express.Router();

var nodemailer = require('nodemailer');


dotenv.config();

// Configure PayPal
paypal.configure({
    'mode': process.env.PAYPAL_MODE,  // 'live' or 'sandbox'
    'client_id': process.env.PAYPAL_CLIENT_KEY,
    'client_secret': process.env.PAYPAL_SECRET_KEY
});

router.post('/pay', (req, res) => {
    const { transactions } = req.body;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://www.return.com/routing/?stringQuery",
            "cancel_url": "http://www.cancel.com/routing/?stringQuery"
        },
        "transactions": transactions
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            res.json({ payment });
        }
    });
});

router.post('/execute', (req, res) => {
    const { paymentId, payerId, transactions } = req.body;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": transactions
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json({ error: error.response });
        } else {
            const response = { status: 'success', payment: payment }
            const user_email = response.payment.payer.payer_info.email
            emailSender(user_email)

            res.json(response);
        }
    });
});

const emailSender = (user_email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.MAIL_SENDER,
        to: user_email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log(process.env.GMAIL_TOKEN )
}


router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
