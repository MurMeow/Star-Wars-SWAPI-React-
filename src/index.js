import React ,{Component ,Fragment} from "react";
import Content from "./components/content"
import { BrowserRouter, Route, Switch } from "react-router-dom";





export default class Index extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Fragment>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/dist/" component={Content} />
                </Switch>
              </BrowserRouter>
              <Content/>
            </Fragment>
        )
    }

}

