import React, { Component } from 'react';

class Set extends Component {
  render() {
    return (
      <li className="set">
        <a href={this.props.set.set_url}>
          <img src={this.props.set.set_img_url} alt={this.props.set.name}/>
        </a>
        Name: {this.props.set.name}
        Year: {this.props.set.year}
        Num Parts: {this.props.set.num_parts}
      </li>
    );
  }
}

export default Set;
