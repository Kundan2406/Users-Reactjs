import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditUser = () => {

    const location = useLocation();
    const { userid } = location.state || {}; 
    const navigate = useNavigate(); 

    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

    const user = users.find((user) => user.id === userid);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [errorname, setnameErrors] = useState("");
    const [erroremail, setemailErrors] = useState("");

    

    const [loggedInUser] = useState(JSON.parse(localStorage.getItem('LoggedInfo')));

    

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const EditSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;

        if (username === '') {
            formIsValid = false;
            setnameErrors('Username cannot be blank');
        } else if (email === '') {
            formIsValid = false;
            setemailErrors('Email cannot be blank');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            setemailErrors('Invalid Email');
        } else {
            if (formIsValid) {
                const updatedUsers = users.map((user) =>
                    user.id === userid ? { ...user, username: username, email: email } : user
                );
    
                localStorage.setItem("users", JSON.stringify(updatedUsers));
                alert('User information updated successfully!');
                navigate("/users");
            }
        }
        
    };

    return (
        <div className="container">
            <div className="main-div">
                <h1>Edit User Information</h1>

                <Form noValidate onSubmit={EditSubmit}>
                    <Form.Group className="mb-3" controlId="RegisterUsername">
                        <Form.Label>Edit Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            defaultValue={user.username}
                            placeholder="Enter User name"
                            onChange={handleUsernameChange}
                        />
                        <p className='error-message'>{errorname}</p>
                    </Form.Group>

                    {userid != loggedInUser.id && (
                        <Form.Group className="mb-3" controlId="RegisterEmail">
                            <Form.Label>Edit Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={user.email}
                                placeholder="Enter Email Id"
                                onChange={handleEmailChange}
                            />
                            <p className='error-message'>{erroremail}</p>
                        </Form.Group>
                    )}

                    <div className='btn-section'>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                        <Link to="/users">
                            <Button variant="primary" type="button">
                                Back
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditUser;
