import React, { Component } from 'react';
import "./TrackAPackagePage.css"
import TrackingForm from "../../components/TrackingForm/TrackingForm"
import Track from '../../components/Track/Track';

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
                <TrackingForm handleTrackPackage={this.handleTrackPackage}/>
                    {this.state.myPackage.carrier ?
                        <Track myPackage={this.state.myPackage} />
                        :
                        ""}
            </div>
        );
    }
}

export default TrackAPackagePage;