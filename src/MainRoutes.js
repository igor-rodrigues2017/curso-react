import React, {Component} from "react";
import AuthorBox from "./components/Author";
import Home from "./Home";
import {Route, Switch} from "react-router-dom";

export default class MainRoutes extends Component {
	render() {
		return (
			<Switch>
				<Route path='/authors' component={AuthorBox}/>
				<Route path='/books' />
				<Route   path='/' component={Home}/>
			</Switch>
		);
	}
}