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
    const { paymentId, payerId, transactions, paymentData } = req.body;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": transactions
    };


    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json({ error: error.response });
        } else {
            const response = { status: 'success', payment: payment }
            const user_info = response.payment.payer.payer_info

            emailSender(user_info, paymentData) // send email confirmation

            res.json(response);
        }
    });
});

const emailSender = (user_info, paymentData) => {
    let itemsList = paymentData.cartInfo.map(item => {
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.title}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.quantityValue}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.price} ILS</td>
            </tr>
        `;
    }).join('');

    let emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Order Confirmation</h2>
            <p>Hi ${user_info.first_name},</p>
            <p>Your order has been sent to:</p>
            <p>
                ${user_info.shipping_address.line1},<br>
                ${user_info.shipping_address.city}
            </p>
            <h3>Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd;">Item</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsList}
                </tbody>
            </table>
            <p style="text-align: right; font-size: 1.2em;"><strong>Total Price: ${paymentData.overallPrice} ILS</strong></p>
            <p>Thank you for shopping with us!</p>
        </div>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
        from: process.env.MAIL_SENDER,
        to: user_info.email,
        subject: 'Your Order Is On The Way',
        html: emailContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
