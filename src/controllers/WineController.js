import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { ReturnIcon } from "../icons";
import RatingInput from '../inputs/RatingInput';

import { addWine, editWine } from '../actions/wineActions'

import { withRouter } from '../utils/utils';

import '../assets/styles/wine.scss';

const DEFAULT_VALUES = {
    name: '',
    vineyard: '',
    year: 1800,
    rating: undefined,
    review: '',
    notes: '',
    timestamp: undefined
};

class WineController extends React.Component {

    constructor(props) {
        super(props);

        this.form = React.createRef();

        this.isEdit = this.props.router.location.pathname.includes('/edit/');

        let initalValues = { ...DEFAULT_VALUES }
        if (this.isEdit) {
            let editingWine = this.props.wines.find(wine => wine.timestamp == this.props.router.params.wineId)
            if (editingWine) {
                initalValues = editingWine;
            }
        }

        this.state = {
            values: initalValues,
            fields: [{
                key: 'name',
                type: 'string',
                label: 'Name',
                validations: ['required']
            }, {
                key: 'vineyard',
                type: 'string',
                label: 'Vineyard',
                validations: ['required']
            }, {
                key: 'year',
                type: 'date',
                label: 'Production Year',
                validations: ['required']
            }, {
                key: 'rating',
                type: 'rating',
                label: 'Rating',
                validations: []
            }, {
                key: 'review',
                type: 'text',
                label: 'Review',
                validations: []
            }, {
                key: 'notes',
                type: 'text',
                label: 'Personal Notes',
                validations: []
            }]
        };
    }

    setValues = (key, value) => {
        let newValues = { ...this.state.values };
        newValues[key] = value;
        this.setState({
            values: newValues
        });
    }

    fieldType = (field) => {
        switch (field.type) {
            case 'integer':
                return <input
                    type="number"
                    step="1"
                    id={field.key}
                    defaultValue={this.state.values[field.key]}
                    onChange={(e) => { this.setValues(field.key, e.target.value); }} />
            case 'date':
                return <input
                    type="number"
                    min="1800"
                    max={new Date().getFullYear()}
                    id={field.key} defaultValue={this.state.values[field.key]}
                    onChange={(e) => { this.setValues(field.key, e.target.value); }} />
            case 'rating':
                return <RatingInput
                    value={this.state.values[field.key]}
                    onChange={(value) => { this.setValues(field.key, value); }} />
            case 'text':
                return <textarea
                    id={field.key}
                    defaultValue={this.state.values[field.key]}
                    onChange={(e) => { this.setValues(field.key, e.target.value); }} />
            default:
                return <input
                    type="text"
                    id={field.key}
                    defaultValue={this.state.values[field.key]}
                    onChange={(e) => { this.setValues(field.key, e.target.value); }} />
        }
    }

    renderField = (field) => {
        return (
            <div className="form-group" key={field.key}>
                <label htmlFor={field.key}>{field.label}:</label>
                {this.fieldType(field)}
            </div>
        )
    }

    submitForm = (e) => {
        e.preventDefault();

        if (!this.isEdit) {
            // If Add -> Reset
            this.props.addWine({ ...this.state.values, timestamp: new Date().getTime() });

            this.form.reset();
            this.setState({
                values: DEFAULT_VALUES
            });
        } else {
            this.props.editWine(this.state.values);
            this.props.router.navigate('/');
        }
    }

    render() {
        return (
            <div className="wine-container">
                <div className="main-container small">
                    <h1>{this.isEdit ? 'Edit' : 'Add'} Wine</h1>
                    <form onSubmit={this.submitForm} ref={(el) => this.form = el}>
                        {this.state.fields.map(field => this.renderField(field))}
                        <div className="form-ations">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                    <Link className="return-wine-btn" to='/'><ReturnIcon width="17px" color="white" /></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    wines: state.wines
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addWine,
        editWine
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WineController));