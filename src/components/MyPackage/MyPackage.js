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
        this.refreshDetailId = setInterval(this.getDetails, 100000)
    }

    render() {
        return (
            <div className="MyPackage-container">
                <button type="button" className="MyPackage-collapsible" 
                    style={this.state.isCollapsed ? {"borderRadius":"25px"} : {"borderRadius":"25px 25px 0px 0px","backgroundColor":"#ccc"}}
                    onClick={this.collapseDetails}
                >
                    <div>{this.props.myPackage.name}</div>
                    <div className="marker">{this.state.isCollapsed ? "+" : "-"}</div>
                </button>
                <div className='MyPackage-content' style={this.state.isCollapsed ? {"display":"none"} : {"display":"block"}}>
                <p>CARRIER: {this.props.myPackage.carrier}</p>
                <p>Tracking Number: {this.props.myPackage.trackingNumber}</p>
                <p>Status: {this.state.details !== null? this.state.details.tracking_status.status : "pending"}</p>
                {this.state.details !== null? `ETA: ${this.state.details.eta} <em> ${this.state.details.eta > this.state.details.original_eta? "Delayed" : "On Time"}</em>`: ""}
                <div>
                    {this.state.details !== null?  
                    this.state.details.tracking_history.reverse().map(trackDetail => 
                        <div>
                            <div className="MyPackage-divider">|</div>
                            <PackageDetail key={trackDetail._id} trackDetail={trackDetail} />
                        </div>
                    )
                    
                    : 
                    <p>"...loading"</p>
                    }

                </div>
                    
                    <button
                        className='MyPackage-delete-btn'
                        onClick={() => this.props.handleDeletePackage(this.props.myPackage._id)}
                    >
                        DELETE
                    </button>
                    <button> <Link className='edit button' to={{ pathname: '/edit', state: {myPackage: this.props.myPackage}  }}>EDIT</Link></button>
                </div>
    
                
                
            </div>
            
    
        )
    }
}

export default MyPackage;


