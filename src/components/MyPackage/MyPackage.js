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
        console.log(this.state.details.tracking_history[this.state.details.tracking_history.length - 1].status_details, "<---this.state.details")
    }
    componentDidMount() {
        this.getDetails();
        this.refreshDetailId = setInterval(this.getDetails, 100000)
    }

    render() {
        return (
            <div className="MyPackage-container">
                <button type="button" className="MyPackage-collapsible" style={this.state.isCollapsed ? {"borderRadius":"25px"} : {"borderRadius":"25px 25px 0px 0px","backgroundColor":"#ccc"}}onClick={this.collapseDetails}>
                <div>{this.props.myPackage.name}</div>
                <div className="marker">{this.state.isCollapsed ? "+" : "-"}</div>
                </button>
                <div className='MyPackage-content' style={this.state.isCollapsed ? {"display":"none"} : {"display":"block"}}>
                <p>CARRIER: {this.props.myPackage.carrier}</p>
                <p>Tracking Number: {this.props.myPackage.trackingNumber}</p>
                <div>
                    {this.state.details !== null? 
                    this.state.details.tracking_history.reverse().map(trackDetail => 
                        <PackageDetail key={trackDetail._id} trackDetail={trackDetail} />
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
                    <Link className='edit button' to={{ pathname: '/edit', state: {myPackage: this.props.myPackage}  }}>EDIT</Link>
                </div>
    
                
                
            </div>
            
    
        )
    }
}

export default MyPackage;


