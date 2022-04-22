import React, {useState, useContext} from "react";
// import {Modal} from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";


function ItemImage({img, name}) {
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <img
                className="img-fluid "
                src={img}
                alt={`${name}`}
            />
        </div>
    );
}

function ItemInfo({
                      name,
                      description,
                      price, inStock, isBargainAble, reviews_avg_rating,type
                  }) {
    let rat = reviews_avg_rating != null ? reviews_avg_rating : 0;
    return (
        <div className="speaker-info">
            <div className="d-flex justify-content-between mb-3">
                <h3 className="text-truncate w-200">
                    {name}
                </h3>
            </div>
            <div>
                <p className="card-description">{description}</p>
                <p className={`text-${isBargainAble ? "info" : "danger"}`}>This {type} is {!isBargainAble ? 'not' : ''} Bargain
                    able</p>
                <p className={`text-${inStock ? "primary" : "danger"}`}>{price} RS</p>
                <p className={`text-${inStock ? "success" : "danger"}`}>This {type} is {!inStock ? 'not' : ''} in Stock</p>
            </div>
            <i
                className={
                    "fa fa-star orange"
                }
            />
            <span className="strong">{rat}</span>
            <div>
                <button className="float-right btn btn-primary" disabled={!inStock}>Order Now</button>
            </div>
        </div>

    );
}

function Item({itemData,popupHandle,myStyles=null}) {
    const {image, name} = itemData;

    function ph()
    {
        // console.log({...itemData})
         popupHandle({...itemData})
    }
    return (
        <div
        id={'item'+itemData.id}
            className={myStyles===null?"col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12":myStyles }>
            <div className="card card-height p-4 mt-4" >
                <div onClick={ph}>
                <ItemImage img={image} name={name}/>
                </div>
                <ItemInfo {...itemData} />
            </div>
        </div>
    );
}

export default Item;
