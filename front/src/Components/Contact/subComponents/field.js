import React from 'react';

// CSS
import './field.css';

function Field({ name, elementName, type, placeholder, value, updateInput }) {

    return (
        <div className='field-wrapper'>
            {elementName === 'input' ? (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={updateInput}
                    className="contact-input"
                    required
                />
            ) : (
                <textarea
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={updateInput}
                    className="contact-textarea"
                    required
                />
            )}

        </div>
    );
}

export default Field;