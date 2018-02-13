import React, { Component } from 'react';
import './DuckTable.css';
import DuckDisplay from './DuckDisplay.jsx'
import { orderBy } from 'lodash';

class DuckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: props.sightings,
      sortBySelect: 'dateTime',
      orderSelect: 'asc'
    };
    this.update = this.update.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.refreshSort = this.refreshSort.bind(this);
  }

  update() {
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving props:');
    console.log(nextProps);
    this.setState({ sightings: nextProps.sightings }, () => this.refreshSort());
    console.log('new state:');
    console.log(this.state);
  }

	componentDidMount() {
    this.setState({sightings: this.props.sightings});
    this.refreshSort();
	}

  componentDidUpdate() {
  }

  handleSortByChange(event) {
    this.setState({'sortBySelect':event.target.value}, () => {
      this.refreshSort();
    });
  }

  handleOrderChange(event) {
    this.setState({orderSelect:event.target.value}, () => {
      this.refreshSort();
    });
  }

  refreshSort() {
    let sightings = this.state.sightings;
    let sortBy = this.state.sortBySelect;
    let order = this.state.orderSelect;
    console.log(`Sort by: ${sortBy}\nOrder: ${order}\n`);
    this.setState({
      'sightings': orderBy(sightings, [sortBy, 'dateTime'], [order])
    });
  }

  render() {
    return (
    	<div className="duckContainer">
        <div className="sortControls">
          <span>Sort by:</span>
          <select value={this.state.sortBySelect} onChange={this.handleSortByChange}>
            <option value='dateTime'>Observation Time</option>
            <option value='count'>Number of Ducks</option>
            <option value='species'>Duck Species</option>
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
