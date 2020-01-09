import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css'

class App extends Component {

	constructor() {
		super();
		this.state = {list: [
				{
					name: 'Igor Rodrigues',
					email: 'igor.chagas.rodrigues@gmail.com',
					password: '123456'
				}
			]};
	}

	componentWillMount() {
		fetch('http://cdc-react.herokuapp.com/api/autores')
			.then(res => res.json()).then(data => this.setState({list: data})
		);
	}

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
							<form className="pure-form pure-form-aligned">
								<div className="pure-control-group">
									<label htmlFor="nome">Name</label>
									<input id="nome" type="text" name="nome" value=""  />
								</div>
								<div className="pure-control-group">
									<label htmlFor="email">Email</label>
									<input id="email" type="email" name="email" value=""  />
								</div>
								<div className="pure-control-group">
									<label htmlFor="senha">Password</label>
									<input id="senha" type="password" name="senha"  />
								</div>
								<div className="pure-control-group">
									<label></label>
									<button type="submit" className="pure-button pure-button-primary">Save</button>
								</div>
							</form>

						</div>
						<div>
							<table className="pure-table">
								<thead>
								<tr>
									<th>Name</th>
									<th>email</th>
								</tr>
								</thead>
								{
									this.state.list.map(author => {
										return(
											<tr>
												<td>{author.name}</td>
												<td>{author.email}</td>
											</tr>
										);
									})
								}
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
