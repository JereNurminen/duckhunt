import React, { Component } from 'react';
import './App.css';
import DuckTable from './DuckTable.jsx'
import DuckEditor from './DuckEditor.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightings: []
    };
    this.refresh = this.refresh.bind(this);
  }
  
  refresh() {
    fetch('http://localhost:8081/sightings')
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        sightings: responseData
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    //this.refresh();
    console.log('app updated');
  }

  render() {
    console.log('rendering app..');
    return (
      <div className="container">
        <div className="row">
          <div id="container" className="offset-md-3 col-md-6 col-sm-12">
            <h1>Duckhunt <span role='img' aria-label="A duck emoji">🦆</span></h1>
            <DuckEditor refresh={this.refresh}/>
            {this.state.sightings.length > 0 ? (
              <DuckTable  refresh={this.refresh} sightings={this.state.sightings}/>
            ) : (   
              <h2>Loading...</h2>         
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
