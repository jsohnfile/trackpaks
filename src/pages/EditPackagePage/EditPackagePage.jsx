import React, { Component } from 'react';

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
            <>
                <h1>Edit a Package</h1>
                <form onSubmit={this.handleSubmit}>
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
                            className="form-control"
                            name="carrier"
                            value={this.state.formData.carrier}
                            onChange={this.handleChange}
                            required
                        >
                        <option>Choose a Courier</option>
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
                        className="btn"
                    >
                        Save Package
                    </button>
                </form>
            </>
        );
    }
}

export default EditPackagePage;