import React, {Component} from "react";
import AuthorBox from "./components/Author";
import Home from "./Home";
import {Route, Switch} from "react-router-dom";
import BookBox from "./components/Books";

export default class MainRoutes extends Component {
	render() {
		return (
			<Switch>
				<Route path='/authors' component={AuthorBox}/>
				<Route path='/books' component={BookBox}/>
				<Route   path='/' component={Home}/>
			</Switch>
		);
	}
}