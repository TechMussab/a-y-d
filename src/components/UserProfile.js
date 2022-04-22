import auth from "../HelperClasses/Auth";
import React, {useEffect, useState} from "react";
import useApiRequest, {REQUEST_STATUS} from "../hooks/useApiRequest";
import CallApi from "../HelperClasses/CallApi";
import ReactPlaceHolder from "react-placeholder";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UserProfileImage({image, fName, lName}) {
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

function UserDataForm({fName, lName, emailID, contactNO}) {
    const [first, setFirst] = useState(fName)
    const [last, setLast] = useState(lName)
    const [email, setEmail] = useState(emailID)
    const [contact, setContact] = useState(contactNO)
    const [updateStatus, setUpdateStatus] = useState('')
    const [api, setApi] = useState('')
    const {
        data: data,
        requestStatus: requestStatus,
        error: error,
    } = useApiRequest(api, 'post',
        {fName: first, lName: last, email: email, contact: contact}, [api]);
    if (data.message != null) {
        if (data.success) {
            auth.setUserData(data.user);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setApi('updateUser');
    }

    return (
        <ReactPlaceHolder
            type="media"
            rows={15}
            className="speakers-list-placeholder"
            ready={requestStatus === REQUEST_STATUS.SUCCESS}
        >

            <div className='text-danger'>{error}</div>
            <div className="card p-2 mt-4 card-dark">

                {/*<div className="card-header">*/}
                {/*    User Profile*/}
                {/*</div>*/}
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
        </ReactPlaceHolder>
    );
}

function UserProfile() {

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
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }

        callApi();
    }, []);
    return (
        <ReactPlaceHolder
            type="media"
            rows={15}
            className="speakers-list-placeholder"
            ready={requestStatus === REQUEST_STATUS.SUCCESS}
        >
            <div className="container container-fluid">
                <div className="col-10">
                    <div className="card justify-content-center mt-4">
                        <div className="card-header align-content-center">
                            User Profile
                        </div>
                        {/*<div className="card-header">*/}
                        {/*    <UserProfileImage image={image.url} fName={userData.fName} lName={userData.lName}/>*/}
                        {/*</div>*/}
                        <div className="card-body">
                            <UserProfileImage image={image.url} fName={userData.fName} lName={userData.lName}/>

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

export default React.memo(UserProfile, UserDataForm);
