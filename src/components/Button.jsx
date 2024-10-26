import React from 'react';
import './Button.css'; // Importing button styles

const Button = ({ onClick, children }) => {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
