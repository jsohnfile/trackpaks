import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyPackage.css';



class MyPackage extends Component {
    state = {
        isCollapsed: true
    }
    collapseDetails = () => {
        this.setState(
            {isCollapsed: !this.state.isCollapsed}
        )
    }
    render() {
        return (
            <div className="MyPackage-container">
                <button type="button" className="MyPackage-collapsible" style={this.state.isCollapsed ? {"borderRadius":"25px"} : {"borderRadius":"25px 25px 0px 0px","backgroundColor":"#ccc"}}onClick={this.collapseDetails}>
                <div>{this.props.myPackage.name}</div>
                <div className="marker">{this.state.isCollapsed ? "+" : "-"}</div>
                </button>
                <div className='MyPackage-content' style={this.state.isCollapsed ? {"display":"none"} : {"display":"block"}}>
                <p>{this.props.myPackage.carrier}</p>
                <p>{this.props.myPackage.trackingNumber}</p>
                <p>loading tracking history...</p>
                    <button
                        className='btn btn-xs btn-danger margin-left-10'
                        onClick={() => this.props.handleDeletePackage(this.props.myPackage._id)}
                    >
                        DELETE
                    </button>
                </div>
    
                
                
            </div>
            
    
        )
    }
}

export default MyPackage;


