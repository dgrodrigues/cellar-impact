import React from "react";

import '../assets/styles/rating.scss';

class RatingInput extends React.Component {

    handleLeave = (e) => {
        let elems = document.querySelectorAll('.half-value.hover')
        if (elems && elems.length > 0) {
            for (let i = 0; i < elems.length; i++) {
                elems[i].classList.remove('hover');
            }
        }
    }

    handleEnter = (e) => {
        let index = e.nativeEvent.relatedTarget.getAttribute('index');
        let parent = e.nativeEvent.target.parentNode;
        let allChilds = parent.querySelectorAll('.half-value');
        if (allChilds) {
            for (let i = 0; i < allChilds.length; i++) {
                if (allChilds[i].getAttribute('index') <= index) {
                    allChilds[i].classList.add('hover');
                } else if (allChilds[i].classList.contains('hover')) {
                    allChilds[i].classList.remove('hover');
                }
            }
        }
    }

    render() {
        return (
            <div className="rating">
                <div className="rating-input" onMouseLeave={this.handleLeave}>
                    {[...Array(10)].map((x, i) => <div key={i} index={i}
                        className={`half-value ${this.props.value !== undefined && (i + 1) / 2 <= this.props.value ? 'active' : ''}`}
                        onMouseEnter={this.handleEnter} onClick={() => { this.props.onChange((i + 1) / 2); }} />)}
                </div>
                {this.props.value != undefined && <p className="current-rating">{this.props.value.toString().length == 1 ? `${this.props.value}.0` : this.props.value}/5.0</p>}
            </div>
        );
    }
};

export default RatingInput;

//onMouseLeave={this.handleLeave}