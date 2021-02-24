import React from 'react';

import SignIn from './pages/SignIn/index'
import SignUp from './pages/SignUp/index';


import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {


  return (  
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup/" component={SignUp} />
        </Switch>
     </Router>

  );
}

export default App;
