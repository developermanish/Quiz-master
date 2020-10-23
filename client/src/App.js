import React from "react";
import Main from './components/main'
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  render() {

    return (
      <div>
        <Router>
          <Main />
        </Router>
      </div>
    );
  }
}

export default App;
