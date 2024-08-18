import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false,
            errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm = () => {
        const { username, email, password, confirmPassword } = this.state;
        let errors = {};
        let formIsValid = true;

        // Retrieve existing users from local storage
        let Users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

        // Check if the email already exists in the Users array
        const emailExists = Users.some((user) => user.email === email);

        if (!username) {
            formIsValid = false;
            errors['username'] = 'Please enter your username.';
        }

        if (!email) {
            formIsValid = false;
            errors['email'] = 'Please enter your email.';
        } else if (emailExists) {
            formIsValid = false;
            errors['email'] = 'This email is already registered.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid.';
        }

        if (!password) {
            formIsValid = false;
            errors['password'] = 'Please enter your password.';
        } else if (password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password length is less than 8 characters.';
        }

        if (!confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Please confirm your password.';
        } else if (confirmPassword.length < 8) {
            formIsValid = false;
            errors['confirmPassword'] = 'Confirm password length is less than 8 characters.';
        } else if (password !== confirmPassword) {
            formIsValid = false;
            errors['confirmPassword'] = 'Confirm password does not match the password.';
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {

            const { username, email, password, confirmPassword } = this.state;
            let Users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

            // Create new user data
            let UserData = {
                id: Number(new Date()),
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };

            // Add new user to the users array
            Users.push(UserData);

            // Save updated users array to local storage
            localStorage.setItem('users', JSON.stringify(Users));

            console.log('Form submitted successfully');

            this.setState({ redirect: true });

        } else {
            console.log('Form has errors.');
        }
    }

    render() {
        const { username, email, password, confirmPassword, errors, redirect } = this.state;

        return (
            <>
                <div>
                    {
                        redirect && (
                            <Navigate to="/registersuccess" />
                        )
                    }
                </div>

                <div className='container'>
                    <div className='form-div'>
                        <h1>Register Form Validation</h1>
                        <Form className="" noValidate onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="Registername">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" name="username" value={username} placeholder="Enter User Name" onChange={this.handleChange} />
                                <p className='error-message'>{errors.username}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="RegisterEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={email} placeholder="Enter Email Id" onChange={this.handleChange} />
                                <p className='error-message'>{errors.email}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="RegisterPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={password} placeholder="Enter Password" onChange={this.handleChange} />
                                <p className='error-message'>{errors.password}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="RegisterconfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" value={confirmPassword} placeholder="Enter Confirm Password" onChange={this.handleChange} />
                                <p className='error-message'>{errors.confirmPassword}</p>
                            </Form.Group>

                            <div className='btn-section'>
                                <Button variant="primary" className='text-center' type="submit">
                                    Register
                                </Button>
                                <Link to="/welcome" >
                                    <Button variant="primary" type="button" >
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </>
        );
    }
}

export default RegisterForm;
