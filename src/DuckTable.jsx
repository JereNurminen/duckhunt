import React, { Component } from 'react';
//import './Ducktable.css';
import DuckDisplay from './DuckDisplay.jsx'
import { orderBy } from 'lodash';

class DuckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: [],
      sortBySelect: 'time',
      orderSelect: 'asc',
      newSort: false
    };
    this.update = this.update.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.refreshSort = this.refreshSort.bind(this);
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
    if (this.state.newSort) {
      this.setState({newSort: false})
      return;
    }
    this.update();
	}

  componentDidUpdate() {
    if (this.state.newSort) {
      this.setState({newSort: false})
      return;
    }
    this.update();
  }

  handleSortByChange(event) {
    this.setState({'sortBySelect':event.target.value});
    this.refreshSort();
  }

  handleOrderChange(event) {
    this.setState({orderSelect:event.target.value});
    this.refreshSort();
  }

  refreshSort() {
    let sightings = this.state.sightings;
    let sortBy = this.state.sortBySelect;
    let order = this.state.orderSelect;
    console.log(orderBy(sightings, ['dateTime'], order));
    this.setState({
      'sightings': orderBy(sightings, ['dateTime'], order),
      'newSort': true
    });
  }

  render() {
    return (
    	<div className="duckContainer">
        <div className="sortControls">
          <span>Sort by:</span>
          <select value={this.state.sortBySelect} onChange={this.handleSortByChange}>
            <option value='time'>Observation Time</option>
          </select>
          <select value={this.state.orderSelect} onChange={this.handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {this.state.sightings.map(sighting =>
          <DuckDisplay key={sighting.id.toString()} sighting={sighting}/>
        )}
    	</div>
    );
  }
}

export default DuckTable;
