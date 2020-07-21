import React, { Component } from 'react';
import "./EditPackagePage.css"

class EditPackagePage extends Component {
    state = {
        formData: this.props.location.state.myPackage
    }

    handleChange = e => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdatePackage(this.state.formData);
    }

    render() {
            return (
            <div className="EditPackagePage-container">
                <form onSubmit={this.handleSubmit} className="EditPackagePage-form-container">
                    <h1>Edit a Package</h1>
                    <div className="form-group">
                        <label>Package Name (required)</label>
                        <input
                            className="form-control"
                            name="name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Courier Service</label>
                        <select
                            className="EditPackagePage-select"
                            name="carrier"
                            value={this.state.formData.carrier}
                            onChange={this.handleChange}
                            required
                        >
                        <option>Carrier</option>
                        <option value="ups">UPS</option>
                        <option value="usps">USPS</option>
                        <option value="fedex">FedEx</option>
                        
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tracking Number (required)</label>
                        <input
                            className="form-control"
                            name="trackingNumber"
                            value={this.state.formData.trackingNumber}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="EditPackagePage-btn"
                    >
                        SAVE
                    </button>
                </form>
            </div>
        );
    }
}

export default EditPackagePage;