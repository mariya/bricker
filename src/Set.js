import React, { Component } from 'react';

class Set extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="product-image">
          <a href={this.props.set.set_url}>
            <img src={this.props.set.set_img_url} alt={this.props.set.name}/>
          </a>
        </div>
        <div className="product-info">
          <h5>{this.props.set.year} - {this.props.set.name} - {this.props.set.num_parts} parts</h5>
        </div>
      </div>
    );
  }
}

export default Set;
