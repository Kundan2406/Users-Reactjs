import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateForm = () => {
        const { email, password } = this.state;
        let errors = {};
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            errors['email'] = 'Please enter your email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            errors['email'] = 'Email is not valid.';
        }

        if (!password) {
            formIsValid = false;
            errors['password'] = 'Please enter your password.';
        } else if (password.length <= 7) {
            formIsValid = false;
            errors['password'] = 'Password length should be at least 8 characters.';
        }

        this.setState({ errors });
        return formIsValid;
    }

    LoginSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            const { email, password } = this.state;
            let Users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
            let loginValidate = Users.find((user) => user.email === email && user.password === password);

            if (loginValidate) {
                let UserData = {
                    id: loginValidate.id,
                    username: loginValidate.username,
                    email: loginValidate.email,
                };

                localStorage.setItem('LoggedInfo', JSON.stringify(UserData));
                this.setState({ redirect: true });
            } else {
                this.setState({
                    errors: { message: 'Incorrect Login and Password. Please try again!' }
                });
            }
        }
    }

    render() {
        const { email, password, errors, redirect } = this.state;

        if (redirect) {
            return <Navigate to="/loginsuccess" />;
        }

        return (
            <div className='container'>
                <div className='form-div'>
                    <h1>Login</h1>
                    <Form noValidate onSubmit={this.LoginSubmit}>
                        <Form.Group className="mb-3" controlId="RegisterEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter Email Id"
                                onChange={this.handleChange}
                            />
                            {errors.email && <p className='error-message'>{errors.email}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="RegisterPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                            />
                            {errors.password && <p className='error-message'>{errors.password}</p>}
                        </Form.Group>

                        <div className='btn-section'>
                            <Button variant="primary" className='text-center' type="submit">
                                Login
                            </Button>
                            <Link to="/welcome" >
                                <Button variant="primary" type="button">
                                    Back
                                </Button>
                            </Link>
                        </div>

                        {errors.message && <p className='error-message'>{errors.message}</p>}
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
