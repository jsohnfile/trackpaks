import React from 'react';
import './PackageDetail.css'

function PackageDetail(props) {
    return (
        <div className="PackageDetail-container">
            <div className="PackageDetail-date">
                {props.trackDetail.status_date}
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