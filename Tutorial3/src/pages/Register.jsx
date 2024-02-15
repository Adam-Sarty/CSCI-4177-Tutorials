import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentLoader } from '../js/useContentLoader';

/* ------------------------------------------------------
 *  Author: Adam Sarty
 *  Student ID: B00794681
 *  T3 - CSCI4177
 * ------------------------------------------------------
 */

export const Register = () => {
    useContentLoader();

    const navigate = useNavigate();

    // State management for form data and validation errors
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State to manage validation errors
    const [errors, setErrors] = useState({});
    // State to control the visibility of password requirements
    const [showRequirements, setShowRequirements] = useState(false);

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Updating form data state on input change
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        // Conditionally showing password requirements based on the validation
        if (name === "password") {
            if (!validatePassword(value)) {
                setShowRequirements(true);
            } else {
                setShowRequirements(false);
            }
        }
    };

    // Function to validate form data
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Validate Password
        if (!validatePassword(formData.password)) {
            isValid = false; // Mark form as invalid without setting a specific error message
        }

        // Validate Confirm Password
        if (formData.confirmPassword !== formData.password) {
            isValid = false;
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        // Update the errors state with any validation errors
        setErrors(tempErrors);
        return isValid;
    };

    // Function to validate password based on specific criteria
    const validatePassword = (password) => {
        // Ensures password is at least 8 characters long
        return password.match(/^[\w!@#$%^&*]{8,}$/);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submit action
        if (validateForm()) {
            navigate('/profile'); // Navigate to profile page upon successful validation
        }
    };

    // JSX for rendering the registration form
    return (
        <div className="container">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    {/* Input fields for registration form with inline validation feedback */}
                    <label htmlFor="firstName">First Name</label>
                    <br/>
                    <input type="text" name="firstName" id="firstName" placeholder="John" onChange={handleChange} value={formData.firstName} required/>
                    <br/>
                    <label htmlFor="lastName">Last Name</label>
                    <br/>
                    <input type="text" name="lastName" id="lastName" placeholder="Smith" onChange={handleChange} value={formData.lastName} required/>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" name="email" id="email" placeholder="johnsmith@dal.ca" onChange={handleChange} value={formData.email} required/>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    {/* Dynamically displayed password requirements */}
                    <div className="requirements" style={{display: showRequirements ? 'block' : 'none'}}>
                        Password must be at least 8 characters long.
                    </div>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required/>
                    <br/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <br/>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Password" onChange={handleChange} value={formData.confirmPassword} required/>
                    <br/>
                    {/* Error message for confirm password validation */}
                    {errors.confirmPassword && <div style={{color: 'red'}}>{errors.confirmPassword}</div>}
                    <input type="submit" value="Register"/>
                    <p>Returning Explorer? <a href="/">Login</a></p>
                </form>
            </div>
        </div>
    );
};
