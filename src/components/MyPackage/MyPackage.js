import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyPackage.css';
import PackageDetail from '../PackageDetail/PackageDetail';
import * as shippoAPI from '../../utils/shippoAPI';



class MyPackage extends Component {
    state = {
        isCollapsed: true,
        details: null
    }
    collapseDetails = () => {
        this.setState(
            {isCollapsed: !this.state.isCollapsed})
    }

    getDetails = async () => {
        const details = await shippoAPI.getPackageDetails(this.props.myPackage.carrier, this.props.myPackage.trackingNumber);
        console.log(details, "<---details")
        this.setState({details: details})
    }
    componentDidMount() {
        this.getDetails();
        // this.refreshDetailId = setInterval(this.getDetails, 1000000)
    }

    render() {
        return (
            <div className="MyPackage-container">
                <div className="MyPackage-collapsible" 
                    style={this.state.isCollapsed ? {"borderRadius":"25px"} : {"borderRadius":"25px 25px 0px 0px","backgroundColor":"rgb(88, 111, 146)"}}
                    onClick={this.collapseDetails}
                >
                    <div className="button-container">
                        <div className="name-status">
                            <div className="MyPackage-name">{this.props.myPackage.name[0].toUpperCase()}{this.props.myPackage.name.slice(1)}</div>
                            <div>Status: {this.state.details !== null? this.state.details.tracking_status === null || this.state.details === null ? "Invalid Tracking Number or Information is currently not available" : <em style={this.state.details.tracking_status.status === "DELIVERED" ? {"color": "white", "textShadow": "1px 3px 3px blue"}: {"":""}}>{this.state.details.tracking_status.status}</em> : "...loading"}</div>
                        </div>
                        <div className="marker-container">
                            <div className="marker">{this.state.isCollapsed ? "+" : "-"}</div>
                        </div>
                    </div>
                </div>
                <div className='MyPackage-content' style={this.state.isCollapsed ? {"display":"none"} : {"display":"block"}}>
                    {this.state.details !== null?
                        <div className="icon-container">
                            {this.state.details.tracking_status === null ? "" : <div className="track-div" style={this.state.details.tracking_status.status === "PRE_TRANSIT" ? {"backgroundColor": "blue"}:  {"":""}}></div>}
                            {this.state.details.tracking_status === null ? "" :<div className="line">&nbsp;<hr></hr> &nbsp;</div>}
                            {this.state.details.tracking_status === null ? "" : <div className="track-div" style={this.state.details.tracking_status.status === "TRANSIT" ? {"backgroundColor": "blue"}:  {"":""}}></div>}
                            {this.state.details.tracking_status === null ? "" :<div className="line">&nbsp; <hr></hr> &nbsp;</div>}
                            {this.state.details.tracking_status === null ? "" : <div className="track-div" style={this.state.details.tracking_status.status === "DELIVERED" ? {"backgroundColor": "blue"}: {"":""}}></div>}

                        </div>
                        :
                        ""
                    }
                    <div className="spacer-container">
                        <div className="transit-location-container">
                            <div className="transit-location">
                                {this.state.details !== null && this.state.details.address_from!== null? 
                                (`${this.state.details.address_from.city}, ${this.state.details.address_from.state === "" ? this.state.details.address_from.country: this.state.details.address_from.state}`)
                                : ""}
                            </div>
                            <div className="transit-location">
                                {this.state.details !== null && this.state.details.address_from!== null? 
                                "Transit"
                                : ""}
                            </div>
                            <div className="transit-location">
                                {this.state.details !== null && this.state.details.address_to!== null? 
                                (`${this.state.details.address_to.city}, ${this.state.details.address_to.state === "" ? this.state.details.address_to.country: this.state.details.address_to.state}`)
                                : ""}
                            </div>
                        </div>
                    </div>


                    <p className="attr-detail">Carrier: {this.props.myPackage.carrier.toUpperCase()}</p>
                    <p className="attr-detail">Tracking Number: {this.props.myPackage.trackingNumber}</p>
                    <p className="attr-detail">Status: {this.state.details !== null? this.state.details.tracking_status === null ? "Invalid Tracking Number" : <em style={this.state.details.tracking_status.status === "DELIVERED" ? {"color": "blue"}: {"":""}}>{this.state.details.tracking_status.status}</em>: "...loading"}</p>
                    {this.state.details !== null && this.state.details.eta !== null? `ETA: ${this.state.details.eta} ${this.state.details.eta > this.state.details.original_eta? "Delayed" : "On Time"}`: ""}
                    <div className="details-container">
                        {this.state.details!== null? this.state.details.tracking_history === null ? "" :
                        this.state.details.tracking_history.reverse().map(trackDetail => 
                            <div className="MyPackage-detail">
                                <div className="MyPackage-divider">|</div>
                                <PackageDetail key={trackDetail._id} trackDetail={trackDetail} />
                            </div>
                        )
                        
                        : 
                        <p>"...loading"</p>
                        }

                    </div>
                    
                    <button
                        className='MyPackage-btn'
                        onClick={() => this.props.handleDeletePackage(this.props.myPackage._id)}
                    >
                        DELETE
                    </button>
                    <button className="MyPackage-btn"> <Link className='edit-button' to={{ pathname: '/edit', state: {myPackage: this.props.myPackage}  }}>EDIT</Link></button>
                </div>
    
                
                
            </div>
            
    
        )
    }
}

export default MyPackage;


