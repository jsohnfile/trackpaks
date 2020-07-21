import React, { Component } from 'react';
import "./AddPackagePage.css";

class AddPackagePage extends Component {
    state = {
        formData: {
            name: '',
            trackingNumber: '',
        }
    }

    handleChange = e => {
        const formDataAsUserTypes = {
            ...this.state.formData,
            [e.target.name]: e.target.value
        }

        this.setState({
            formData: formDataAsUserTypes
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddPackage(this.state.formData);
    }

    render() {
        return (
            <div className="AddPackagePage-container">
                <form className="AddPackagePage-form-container" onSubmit={this.handleSubmit}>
                    <p className="form-p-header">Add a Package</p>
                    <div className="form-group">
                        {/* <label>Package Name (required)</label> */}
                        <input
                            className="form-control"
                            name="name"
                            placeholder="Package Name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        {/* <label>Carrier Service</label> */}
                        <select
                            className="AddPackagePage-select"
                            name="carrier"
                            value={this.state.formData.carrier}
                            onChange={this.handleChange}
                            required
                        >
                        <option>Select a Carrier</option>
                        <option value="ups">UPS</option>
                        <option value="usps">USPS</option>
                        <option value="fedex">FedEx</option>
                        <option value="dhl">DHL</option>
                        
                        </select>
                    </div>
                    <div className="form-group">
                        {/* <label>Tracking Number (required)</label> */}
                        <input
                            className="form-control"
                            name="trackingNumber"
                            placeholder="Tracking Number"
                            value={this.state.formData.trackingNumber}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="AddPackagePage-btn"
                    >
                        ADD
                    </button>
                </form>
            </div>
        );
    }
}

export default AddPackagePage;