import React, { Component } from 'react';
//import './Ducktable.css';
import DuckDisplay from './DuckDisplay.jsx'
import DuckEditor from './DuckEditor.jsx'

class DuckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: []
    };
    this.update = this.update.bind(this);
  }

  update() {
    fetch('http://localhost:8081/sightings')
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        sightings: responseData
      });
    });
  }

	componentDidMount() {
    this.update();
	}

  render() {
    return (
    	<div className="duckContainer">
        {this.state.sightings.map(sighting =>
          <DuckDisplay key={sighting.id.toString()} sighting={sighting}/>
        )}
    	</div>
    );
  }
}

export default DuckTable;
