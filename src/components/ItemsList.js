import Item from "./Item";
import ReactPlaceHolder from "react-placeholder";
import useApiRequest, {REQUEST_STATUS} from "../hooks/useApiRequest";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import ReactDOM from 'react-dom';
function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.itemData.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div ></div>
                <Item
                    key={props.itemData.id}
                    itemData={props.itemData}
                    popupHandle={null}
                    myStyles={"col-12"}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
// <p>
//     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//     consectetur ac, vestibulum at eros.
// </p>
function ItemsList() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowData, setModalShowData] = useState({});
    const {
        data: temp,
        requestStatus: rs,
        error: error1,
    } = useApiRequest('topSoldToday');

    if (rs === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger">
                ERROR: <b>loading Data Failed {error1.toString()}</b>
            </div>
        );
    }

    //if (isLoading === true) return <div>Loading...</div>
    function popupHandle(itemData) {
        //{document.getElementById(props.itemId)}
        // console.log('id: ' + itemData.id)
        // return;
        setModalShowData(itemData);
        setModalShow(true)
        console.log('modalShow: ' + modalShow)
    }

    return (
        <div className="container speakers-list">

            <ReactPlaceHolder
                type="media"
                rows={15}
                className="speakers-list-placeholder"
                ready={rs === REQUEST_STATUS.SUCCESS}
            >
                < MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    itemData={modalShowData}
                />
                <div className="row">
                    {temp.map(function (t) {
                        return (
                            <Item
                                key={t.id}
                                itemData={t}
                                popupHandle={popupHandle}
                            />
                        );
                    })}
                </div>
            </ReactPlaceHolder>
        </div>
    );
}

export default ItemsList;
