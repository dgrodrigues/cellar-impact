import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { orderBy } from 'lodash';

import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    CloseIcon,
    SortIcon,
    SortDescIcon,
    SortAscIcon,
    SearchIcon
} from "../icons";
import { removeWine } from '../actions/wineActions'

import '../assets/styles/list.scss';

class ListController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detailToShow: undefined,
            sortColumn: undefined,
            sortType: 'asc',
            searchTerm: undefined
        };
    }

    showDetails = (timestampId) => {
        const details = this.props.wines.find(wine => wine.timestamp == timestampId);
        if (details) {
            this.setState({
                detailToShow: details
            });
        }
    }

    closeDetails = () => {
        this.setState({
            detailToShow: undefined
        });
    }

    // Render Sort icon based in current selected key and order
    sortIconForKey = (key) => {
        if (this.state.sortColumn == key) {
            if (this.state.sortType == 'asc') {
                return <SortAscIcon width="8px" color="#9a0038" />
            } else {
                return <SortDescIcon width="8px" color="#9a0038" />
            }
        } else {
            return <SortIcon width="8px" color="#9a0038" />
        }
    }

    setSort = (key) => {
        if (this.state.sortColumn == key) {
            if (this.state.sortType == 'asc') {
                this.setState({
                    sortColumn: key,
                    sortType: 'desc'
                });
            } else {
                this.setState({
                    sortColumn: undefined,
                    sortType: 'asc'
                });
            }
        } else {
            this.setState({
                sortColumn: key,
                sortType: 'asc'
            });
        }
    }

    setSearch = (e) => {
        let strNoSpaces = e.target.value.replace(/\s+/g, '');
        if (strNoSpaces.length > 0) {
            this.setState({
                searchTerm: e.target.value
            });
        } else {
            this.setState({
                searchTerm: undefined
            });
        }
    }

    render() {

        // Sort wines based on selected headers
        let wines = [];
        if (this.state.sortColumn == undefined) {
            wines = orderBy(this.props.wines, ['timestamp'], [this.state.sortType]);
        } else {
            wines = orderBy(this.props.wines, [this.state.sortColumn], [this.state.sortType]);
        }

        // filter items based on search term
        if (this.state.searchTerm) {
            const search = this.state.searchTerm.toLowerCase();
            wines = wines.filter(wine => wine.name.toLowerCase().includes(search) ||
                wine.vineyard.toLowerCase().includes(search) ||
                wine.year.toString().includes(search) ||
                wine.rating.toString().includes(search)) || []
        }

        return (
            <div className="list-container">
                <div className="main-container">
                    <div className="list-header">
                        <h1>Wines</h1>
                        <div className="search-box">
                            <input type="text" placeholder="Search Name, Vineyard or Year..." onChange={this.setSearch} />
                            <SearchIcon width="17px" color={'rgba(0, 0, 0, 0.4)'} />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td><div className="header-sort" onClick={() => this.setSort('name')}>Name {this.sortIconForKey('name')}</div></td>
                                <td><div className="header-sort" onClick={() => this.setSort('vineyard')}>Vineyard {this.sortIconForKey('vineyard')}</div></td>
                                <td><div className="header-sort" onClick={() => this.setSort('year')}>Year {this.sortIconForKey('year')}</div></td>
                                <td><div className="header-sort" onClick={() => this.setSort('rating')}>Rating {this.sortIconForKey('rating')}</div></td>
                                <td className="details-col"></td>
                                <td className="actions-col"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {wines.length > 0 && wines.map((wine, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{wine.name}</td>
                                        <td>{wine.vineyard}</td>
                                        <td>{wine.year}</td>
                                        {wine.rating && (<td>{wine.rating.toString().length == 1 ? `${wine.rating}.0` : wine.rating}/5.0</td>)}
                                        {!wine.rating && (<td>-</td>)}
                                        <td className="details-col">
                                            <button className="details-btn" onClick={() => this.showDetails(wine.timestamp)}>See Details</button>
                                        </td>
                                        <td className="actions-col">
                                            <div className="actions">
                                                <Link className="edit-btn" to={`/wine/edit/${wine.timestamp}`}>
                                                    <PencilIcon width="17px" color="#9a0038" />
                                                </Link>
                                                <button className="delete-btn" onClick={() => this.props.removeWine(wine.timestamp)}>
                                                    <TrashIcon width="17px" color="#9a0038" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {wines.length == 0 && (
                        <div className="no-items">
                            <p>No wines in the inventory or no result found at this time.</p>
                        </div>
                    )}
                    <Link className="add-wine-btn" to='/wine/add'><PlusIcon width="17px" color="white" /></Link>
                </div>
                {this.state.detailToShow && (<div className="details-modal">
                    <div className="details-container">
                        <h1>Details</h1>
                        <button className="close-btn" onClick={this.closeDetails}>
                            <CloseIcon width="17px" color="#9a0038" />
                        </button>
                        <div className="details-content">
                            <div className="detail-row">
                                <div className="detail-item">
                                    <label>Name:</label>
                                    <p>{this.state.detailToShow.name}</p>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item">
                                    <label>Vineyard:</label>
                                    <p>{this.state.detailToShow.vineyard}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Year:</label>
                                    <p>{this.state.detailToShow.year}</p>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item">
                                    <label>Rating:</label>
                                    {this.state.detailToShow.rating && (<p>{this.state.detailToShow.rating.toString().length == 1 ? `${this.state.detailToShow.rating}.0` : this.state.detailToShow.rating}/5.0</p>)}
                                    {!this.state.detailToShow.rating && (<p>-</p>)}
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item full-width">
                                    <label>Review:</label>
                                    <p>{this.state.detailToShow.review}</p>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item full-width">
                                    <label>Personal Notes:</label>
                                    <p>{this.state.detailToShow.notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    wines: state.wines
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeWine
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListController);