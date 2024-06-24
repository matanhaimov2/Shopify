import React, { useEffect, useRef } from 'react';

function PaypalPayment({ paymentData }) {
    const paypal = useRef()

    useEffect(() => {
        console.log(paymentData)
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Gayy",
                            amount: {
                                currency_code: "ILS",
                                value: 650.00
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
            },
            onError: (err) => {
                console.log(err);
            }
            
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default PaypalPayment;
