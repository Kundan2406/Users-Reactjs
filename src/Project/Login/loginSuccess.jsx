import React from "react";

const LoginSuccess = () => {

    const formData = localStorage.getItem("LoggedInfo") ? JSON.parse(localStorage.getItem("LoggedInfo")) : [];

    return (<>
        <div className="container">
            <div className="main-div">
                <h1>Login Successful</h1>
                <p>Welcome <span>{formData.email}</span></p>
            </div>
        </div>
    </>);
}

export default LoginSuccess;