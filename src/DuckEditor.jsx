import React, { Component } from 'react';
import './DuckEditor.css';
import 'react-select/dist/react-select.css';

class DuckEditor extends Component {
    constructor(props) {
    super(props);
    this.state = {
      'species': [],
      'count': 1,
      'speciesOptions': [],
      'selectedSpecies': 'mallard',
      'description': '',
      'isOpen': false
    };
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);    
    this.update = this.update.bind(this);
    this.sendSighting = this.sendSighting.bind(this);
  }

  update() {
    fetch('http://localhost:8081/species')
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        species: responseData
      });
    });
  }

  sendSighting() {
    let data = {
      'dateTime': new Date().toISOString(),
      'description': this.state.description,
      'species': this.state.selectedSpecies,
      'count': this.state.count
    }
    console.log(data);
    fetch('http://localhost:8081/sightings', { 
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
       'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
      this.props.refresh();
      this.toggleEditor(false);
    });
  }

  componentDidMount() {
    this.update();
  }

  toggleEditor(toggle) {
    this.setState({'isOpen': toggle})
  }

  handleCountChange(event) {
    this.setState({count: event.target.value});
  }

  handleSpeciesChange(event) {
    this.setState({'selectedSpecies': event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  render() {
    return (
      <div className="editor">
      {this.state.isOpen ? (
        <div>
          <label htmlFor="countInput">Amount:</label>
          <br/>
          <input id='countInput' type='number' min='1' value={this.state.count} onChange={this.handleCountChange}/>
          <br/>
          <label htmlFor="speciesSelect">Species:</label>
          <br/>
          <select id='speciesSelect' value={this.state.selectedSpecies} onChange={this.handleSpeciesChange}>
            {this.state.species.map(species =>
              <option key={species.name} value={species.name}>{species.name}</option>
            )}
          </select>
          <br/>
          <label htmlFor='descriptionInput'>Description:</label>
          <br/>
          <textarea id='descriptionInput' value={this.state.description} onChange={this.handleDescriptionChange}/>
          <button onClick={this.sendSighting}>Send sighting</button>
          <button onClick={() => this.toggleEditor(false)}>Cancel</button>
        </div>
      ) : (   
        <button onClick={() => this.toggleEditor(true)}>Add a duck sighting</button>   
      )}
      </div>
    );
  }
}

export default DuckEditor;
