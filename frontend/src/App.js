import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Search from "./pages/Search";
import Playing from "./pages/Playing";
import Playing2 from "./pages/Playing2";
import Playing3 from "./pages/Playing3";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";
import Game3 from "./pages/Game3";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/search" component={Search} />
                    <PrivateRoute path="/playing" component={Playing} />
                    <PrivateRoute path="/playing2" component={Playing2} />
                    <PrivateRoute path="/playing3" component={Playing3} />
                    <PrivateRoute path="/game1" component={Game1} />
                    <PrivateRoute path="/game2" component={Game2} />
                    <PrivateRoute path="/game3" component={Game3} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
