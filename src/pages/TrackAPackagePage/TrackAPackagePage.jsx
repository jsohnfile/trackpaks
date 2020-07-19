import React, { Component } from 'react';
import "./TrackAPackagePage.css"
import TrackingForm from "../../components/TrackingForm/TrackingForm"
import MyPackage from '../../components/MyPackage/MyPackage';

class TrackAPackagePage extends Component {
    state = {
        myPackage: {}
    }

    handleChange = e => {
        const formData = {
            ...this.state.myPackage,
            [e.target.name]: e.target.value
        }

        this.setState({
            myPackage: formData
        })
    }
    handleTrackPackage = async packageData => {
        this.setState(
            {myPackage: packageData}
        )
      }

    render() {
        return (
            <div className="TrackAPackagePage-container">
                <h1>Track a Package</h1>
                <TrackingForm handleTrackPackage={this.handleTrackPackage}/>
                    {this.state.myPackage.carrier ?
                        <MyPackage myPackage={this.state.myPackage} />
                        :
                        ""}
            </div>
        );
    }
}

export default TrackAPackagePage;