import React, { Component } from 'react';
import './Track.css';
import PackageDetail from '../PackageDetail/PackageDetail';
import * as shippoAPI from '../../utils/shippoAPI';

class Track extends Component {
    state = {
        details: null
    }

    getDetails = async () => {
        const details = await shippoAPI.getPackageDetails(this.props.myPackage.carrier, this.props.myPackage.trackingNumber);
        console.log(details, "<---details")
        this.setState({details: details})
    }
    
    componentDidMount() {
        this.getDetails();
    }

    render() {
        return (
            <div className="Track-container">
                <div className='Track-content'>
                    <p>Carrier: {this.props.myPackage.carrier.toUpperCase()}</p>
                    <p>Tracking Number: {this.props.myPackage.trackingNumber}</p>
                    <p>Status: {this.state.details !== null? this.state.details.tracking_status === null ? "Invalid Tracking Number" : <em>{this.state.details.tracking_status.status}</em> : "...loading"}</p>
                    {this.state.details !== null && this.state.details.eta !== null? `ETA: ${this.state.details.eta} ${this.state.details.eta > this.state.details.original_eta? "Delayed" : "On Time"}`: ""}
                    <div>
                        {this.state.details!== null? this.state.details.tracking_history === null ? "" :
                            this.state.details.tracking_history.reverse().map(trackDetail => 
                                <div className="Track-detail">
                                    <div className="Track-divider">|</div>
                                    <PackageDetail key={trackDetail._id} trackDetail={trackDetail} />
                                </div>
                            )    
                        : 
                        <p>"...loading"</p>
                        }
                    </div>    
                </div>
            </div>
        )
    }
}

export default Track;


