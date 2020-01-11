import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css'
import InputCustom from './components/InputCustom'
import SubmitCustom from "./components/SubmitCustom";
import AuthorBox, {AuthorForm, AuthorsTable} from "./components/Author";

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
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Book</a></li>
						</ul>
					</div>
				</div>

				<div id="main">
					<div className="header">
						<h1>Cadastro de Autores</h1>
					</div>
					<div className="content" id="content">
						<div className="pure-form pure-form-aligned">
							<AuthorBox />
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default App;
