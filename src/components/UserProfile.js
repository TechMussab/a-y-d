import auth from "../HelperClasses/Auth";
import React, {useEffect, useState} from "react";
import useApiRequest, {REQUEST_STATUS} from "../hooks/useApiRequest";
import CallApi from "../HelperClasses/CallApi";
import ReactPlaceHolder from "react-placeholder";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UserProfileImage({image, fName, lName}) {
    console.log('UserProfileImage ' + image)
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <img
                className="img-fluid"
                width='300'
                src={image}
                alt={`${fName} ${lName}`}
            />
        </div>
    );
}
function UserDataForm({fName,lName,emailID,contactNO})
{
    console.log('UserDataForm : ' + fName)
    console.log('UserDataForm : ' + lName)
    console.log('UserDataForm : ' + emailID)
    console.log('UserDataForm : ' + contactNO)
    const [first, setFirst] = useState(fName)
    const [last, setLast] = useState(lName)
    const [email, setEmail] = useState(emailID)
    const [contact, setContact] = useState(contactNO)
    async function handleSubmit(event) {
        event.preventDefault();
        //update handle
    }
    return (
        <div className="card p-2 mt-4 card-dark">

            <div className="card-header">
                User Profile
            </div>
            <div className="card-body">
                <div className="fName">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="fName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={first}
                                onChange={(e) => setFirst(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="lName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={last}
                                onChange={(e) => setLast(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="contact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </Form.Group>

                        <Button className="mt-4 float-right" block size="lg" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
function UserProfile() {
    const status = {
        LOADING: "loading",
        SUCCESS: "success",
        FAILURE: "failure",
    };
    const [requestStatus, setRequestStatus] = useState('loading')
    const [image, setImg] = useState('')
    const [error, setError] = useState('')

    let userData = JSON.parse(JSON.stringify(auth.userData));
    useEffect(() => {
        async function callApi() {
            try {
                let resp = new CallApi();
                let res = await resp.postData({apiUrl: 'getProfilePicture', data: {token: auth.token}})
                setRequestStatus(REQUEST_STATUS.SUCCESS);

                setImg(res);
                console.log(image);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }

        callApi();
    }, []);
    console.log('userData in profile : ' + userData)
    console.log('userData in profile fName: ' + userData.fName)
    console.log('userData in profile email: ' + userData.email)
    console.log('userData in profile lName: ' + userData.lName)
    console.log('userData in profile IA: ' + auth.isAuthenticated())
    return (
        <ReactPlaceHolder
            type="media"
            rows={15}
            className="speakers-list-placeholder"
            ready={requestStatus === REQUEST_STATUS.SUCCESS}
        >
            <div className="container container-fluid justify-content-center">
                <div className="col-10">
                    <div className="card  justify-content-center mt-4">
                        <div className="card-header">
                        <UserProfileImage image={image.url} fName={userData.fName} lName={userData.lName}/>
                        </div>
                        <div className="card-body">
                            <UserDataForm fName={userData.fName}
                                          emailID={userData.email}
                                          lName={userData.lName}
                                          contactNO={userData.contact}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ReactPlaceHolder>

    )


}

export default UserProfile;
