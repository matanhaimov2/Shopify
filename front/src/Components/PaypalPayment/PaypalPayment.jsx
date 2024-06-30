import React, { useState } from 'react';
import axios from 'axios';

// Global Veriables
import { SERVER_URL } from '../../Assets/GlobalVeriables';

// Components
import { PayPalButton } from 'react-paypal-button-v2';
import SweetAlert2 from 'react-sweetalert2';


// CSS
import './PaypalPayment.css';

function PaypalPayment({ paymentData }) {

    // States
    const [swalProps, setSwalProps] = useState({});

    const createOrder = async (data, actions) => {
        try {
            const items = paymentData.cartInfo.map(product => ({
                "name": product.title,
                "sku": product.product_id,
                "price": product.price,
                "currency": "USD",
                "quantity": product.quantityValue.toString()
            }));

            const totalAmount = paymentData.overallPrice; // Total amount for the entire order

            const transactions = [{
                "amount": {
                    "currency": "USD",
                    "total": totalAmount // Total amount for the entire order
                },
                "item_list": {
                    "items": items
                }
            }];

            const res = await axios.post(`${SERVER_URL}/payment/pay`, { transactions });

            if (res && res.data) {
                const approvalLink = res.data.payment.links.find(link => link.rel === 'approval_url');
                if (!approvalLink) {
                    throw new Error("Approval URL not found in response");
                }

                const urlParams = new URLSearchParams(new URL(approvalLink.href).search);
                const ecToken = urlParams.get('token');

                return ecToken;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const executeData = {
                paymentId: data.paymentID,
                payerId: data.payerID,
                transactions: [{
                    "amount": {
                        "currency": "USD",
                        "total": paymentData.overallPrice // Total amount for the entire order
                    }
                }],
                paymentData: paymentData
            };

            const res = await axios.post(`${SERVER_URL}/payment/execute`, executeData);
            if (res && res.data) {
                if (res.data.status === 'success') {
                    setSwalProps({
                        show: true,
                        title: 'Success',
                        text: 'Order details have been sent to your email',
                        icon: 'success'

                    });
                } else {
                    setSwalProps({
                        show: true,
                        title: 'Oops...',
                        text: "Something went wrong!",
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='payment-wrapper'>
            <PayPalButton
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={() => setSwalProps({ show: true, title: "Order has been canceled", icon: "error" })}
                onError={(err) => console.error('PayPal Checkout onError:', err)}
            />

            <SweetAlert2 {...swalProps}
                didClose={() => {
                    setSwalProps({})
                }}
            />
        </div>

    );
}

export default PaypalPayment;
