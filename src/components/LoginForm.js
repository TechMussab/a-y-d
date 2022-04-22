import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import auth from "../HelperClasses/Auth";

import {useNavigate} from "react-router-dom";


function LoginForm({isAuth, setIsAuth}) {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    if (auth.isAuthenticated()) {
        return navigate("/");
    }
    // const [userData, setUserData] = useState({})
    // let history=useHistory();
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }


    async function handleSubmit(event) {
        event.preventDefault();
        let res =null
        res=await (auth.login(email, password))
        if (!res.success) {
            setError(res.message)
        } else {
            // <Redirect to="/" />
            setIsAuth(true)
        }
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-lg-6 col-md-8 col-sm-4 col-xs-4">
                <div className="card">

                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body">
                        <div className="strong">
                            <div className="text-danger">
                                {error}
                            </div>
                        </div>
                        <div className="Login">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button block size="lg" type="submit" disabled={!validateForm()}>
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

// return (
//
//     <Layout startingTheme="light">
//         <LoginForm>
//
//         </LoginForm>
//
//
//     </Layout>
// );
