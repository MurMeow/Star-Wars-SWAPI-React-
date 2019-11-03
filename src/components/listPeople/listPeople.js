import React from 'react';
import './style.scss'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import  Card from '../card/card';


const path = '/dist/'

class ListPeople extends React.Component {
  constructor(props) {
    super(props);
  }


  setId = () => {
    const url = this.props.url;
    let arrayOfStrings = url.split('/');
    const id = '/' + arrayOfStrings[arrayOfStrings.length-2];
    return id
  };


render(){

  return (

    <div className="listPeople">
      <BrowserRouter>
        <Switch>
          <Route  path={`${path}${this.props.name}${this.setId()}`} component={Card}/>
        </Switch>
        <Link to={`${path}${this.props.name}${this.setId()}`} >
          {this.props.name}
        </Link>
      </BrowserRouter>
    </div>
  );
}


};


export default ListPeople;
