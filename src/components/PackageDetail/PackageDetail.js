import React, { Component } from 'react';

function PackageDetail(props) {
    return (
        <div>
            {props.trackDetail.status_details}
            {props.trackDetail.status_date}
        </div>
    );
}

export default PackageDetail;