// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';
// import { SERVER_URL } from '../Assets/GlobalVeriables';

// function PaypalPayment({ paymentData }) {
//     useEffect(() => {
//         const handlePayment = async (e) => {
//             try {
//                 console.log(paymentData)
//                 const res = await axios.get(`${SERVER_URL}/payment`, { 
//                     params: {
//                         cartInfo: JSON.stringify(paymentData.cartInfo),
//                         overallPrice: paymentData.overallPrice,
//                     }
//                  });

//                 if (res && res.data) {
//                     const overallPrice = paymentData.overallPrice;
//                     window.location.href = `${res.data.links[1].href}&overallPrice=${overallPrice}`;
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         handlePayment();
//     }, [paymentData])
// }

// export default PaypalPayment;
