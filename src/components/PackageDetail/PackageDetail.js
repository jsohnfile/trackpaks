import React from 'react';
import './PackageDetail.css'

function grabDate (date) {
    let newDate = date.slice(0,9).split("-")
    let temp = newDate[0];
    newDate[0] = newDate[1];
    newDate[1] = newDate[2];
    newDate[2] = temp;
    return newDate.join("-")
}

function PackageDetail(props) {
    return (
        <div className="PackageDetail-container">
            <div className="PackageDetail-date">
                {grabDate(props.trackDetail.status_date)}
            </div>
            <div className="PackageDetail-location">
                {props.trackDetail.location!== null? 
                (`${props.trackDetail.location.city}, ${props.trackDetail.location.state === "" ? props.trackDetail.location.country: props.trackDetail.location.state}`)
                : ""}
            </div>
            <div className="PackageDetail-details">
                {props.trackDetail.status_details}
            </div>
        </div>
    );
}

export default PackageDetail;