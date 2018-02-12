import React, { Component } from 'react';
import './DuckDisplay.css';

class DuckDisplay extends Component {
    constructor(props) {
    super(props);
    this.state = {
      sighting: this.props.sighting
    };
    this.getDate = this.getDate.bind(this);
    this.getDucks = this.getDucks.bind(this);
  }

  getDate() {
    return new Date(this.state.sighting.dateTime).toString();
  }

  getDucks() {
    let amount = this.state.sighting.count;
    if (amount < 150) {
      return '🦆'.repeat(amount);
    } else {
      return `${amount} x 🦆`
    }
  }

  render() {
    return (
      <div className='sighting'>
        {this.state.sighting.count > 1 ? (
          <h2>{this.state.sighting.count} {this.state.sighting.species}s</h2> 
        ) : (   
          <h2>{this.state.sighting.count} {this.state.sighting.species}</h2>         
        )}
        <h4>{this.state.sighting.description}</h4>
        <span className="date">{this.getDate()}</span>
        <br/>
        <span>{this.getDucks()}</span>
      </div> 
    );
  }
}

export default DuckDisplay;
