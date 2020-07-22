import React, { Component } from 'react';
import "./TrackingForm.css";

class TrackingForm extends Component {
    state = {
        formData: {
            carrier: '',
            trackingNumber: '',
            name: ''
        }
    }

    handleChange = e => {
        const formData = {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }
        this.setState({
            formData: formData
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleTrackPackage(this.state.formData);
    }

    render() {
        return (
            <div className="Track">
                <form onSubmit={this.handleSubmit} className="track-form">
                    <p className="track-header">Track a Package</p>
                        <div className="form-container">
                        <div className="form-group">
                            <select
                                className="carrier-select"
                                name="carrier"
                                value={this.state.formData.carrier}
                                onChange={this.handleChange}
                                required
                            >
                                <option>Select a Carrier</option>
                                <option value="ups">UPS</option>
                                <option value="usps">USPS</option>
                                <option value="fedex">FedEx</option>
                                <option value="dhl_express">DHL Express</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                className="Track-tracking"
                                name="trackingNumber"
                                value={this.state.formData.trackingNumber}
                                placeholder="Tracking Number"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="track-btn"
                        >
                            TRACK
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default TrackingForm;