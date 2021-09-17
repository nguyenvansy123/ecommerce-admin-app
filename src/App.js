import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Category from './containers/Category';
import Orders from './containers/Orders';
import Products from './containers/Products';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate])

  return (
    <div className="App">
      <Switch >
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" exact component={Category} />
        <PrivateRoute path="/orders" exact component={Orders} />
        <PrivateRoute path="/products" exact component={Products} />

        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />

      </Switch>

    </div>
  );
}

export default App;
