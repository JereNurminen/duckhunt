import React, { Component } from 'react';
//import './Ducktable.css';
import DuckDisplay from './DuckDisplay.jsx'
import { orderBy } from 'lodash';

class DuckTable extends Component {
  constructor(props) {
    super(props);
    console.log('Ducktable props:');
    console.log(props);
    this.state = {
      sightings: props.sightings,
      sortBySelect: 'time',
      orderSelect: 'asc'
    };
    this.update = this.update.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.refreshSort = this.refreshSort.bind(this);
    console.log('DuckTable state:')
    console.log(this.state);
    //this.refreshSort();
  }

  update() {
    //this.refreshSort();
  }

	componentDidMount() {
    //this.props.refresh();
    this.setState({sightings: this.props.sightings});
    this.refreshSort();
	}

  componentDidUpdate() {
    //this.props.refresh();
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
      'sightings': orderBy(sightings, ['dateTime'], order)
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
