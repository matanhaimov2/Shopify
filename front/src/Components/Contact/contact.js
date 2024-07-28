import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2/dist/sweetalert2.js'

// CSS
import './contact.css';

// Sub Components
import Field from './subComponents/field';

function Contact() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const fields = {
        sections: [
            [
                { name: 'name', elementName: 'input', type: 'text', placeholder: 'Your name' },
                { name: 'email', elementName: 'input', type: 'text', placeholder: 'Your email' },
                { name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your phone number' }
            ],
            [
                { name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Type your message' },
            ]
        ]
    }

    const updateInput = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Submitting message using emailjs api
    const submitMessage = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        emailjs.send('service_n4eiqq7', 'template_hleurjs', formData, 'qPYqFC9Qfoyz4Uwzc')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                Swal.fire({
                    title: "Email Sent Successfully!",
                    text: "Thank you for reaching out. We will get back to you shortly.",
                    icon: "success"
                });
            }, (err) => {
                console.log('FAILED...', err);
                Swal.fire({
                    title: "Oops...",
                    text: "Something went wrong!",
                    icon: "error"
                });
            });
    }

    return (
        <form className='contact-wrapper' onSubmit={submitMessage}>
            <div className='contact-title-wrapper'>
                <h1> Contact Us </h1>
            </div>

            <div className='contact-content-wrapper'>
                {fields.sections && fields.sections.map((section, i) => (
                    <div className='each-input-wrapper' key={i}>
                        {section.map((field, j) => (
                            <Field
                                key={j}
                                {...field}
                                value={formData[field.name]}
                                updateInput={updateInput}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className='contact-button-wrapper'>
                <button type='submit'> Send </button>
            </div>

        </form>
    );
}

export default Contact;