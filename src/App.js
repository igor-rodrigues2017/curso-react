import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css'
import {Link} from 'react-router-dom';
import MainRoutes from "./MainRoutes";

class App extends Component {

	render() {
		return (
			<div id="layout">

				<a href="#menu" id="menuLink" className="menu-link">

					<span></span>
				</a>

				<div id="menu">
					<div className="pure-menu">
						<a className="pure-menu-heading" href="#">Company</a>

						<ul className="pure-menu-list">
							<li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
							<li className="pure-menu-item"><Link to="/authors" className="pure-menu-link">Authors</Link></li>
							<li className="pure-menu-item"><Link to="/books" className="pure-menu-link">Books</Link></li>
						</ul>
					</div>
				</div>

				<div id="main">
					<MainRoutes />
				</div>
			</div>
		);
	}

}

export default App;
