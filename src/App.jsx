import React, { Component } from 'react';
import './App.css';
import DuckTable from './DuckTable.jsx'
import DuckEditor from './DuckEditor.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.refresh = this.refresh.bind(this);
  }
  
  refresh() {
    console.log('test');
    this.setState({'update':true});
  }

  render() {


    return (
      <div className="row">
        <div id="container" className="offset-md-4 col-md-4 col-sm-12">
          <h1>Duckhunt 🦆</h1>
          <DuckEditor refresh={this.refresh}/>
          <DuckTable/>
        </div>
      </div>
    );
  }
}

export default App;
