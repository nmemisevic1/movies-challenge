import './App.css';
import Navigation from './components/Navigation.js'
import Movies from './components/Movies.js'
import TvShows from './components/TvShows.js'
import Categories from './components/Categories/Categories.js'

import {BrowserRouter, Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Navigation/>
      <BrowserRouter>
      <Switch>
        <Route path='/' component={TvShows} exact />
        <Route path='/tvShows' component={TvShows}/>
        <Route path='/movies' component={Movies}></Route>
        <Route path='/categories' component={Categories}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
