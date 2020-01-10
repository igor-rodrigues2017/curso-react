import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css'

class App extends Component {

	constructor() {
		super();
		this.state = {list: [], nome: '', email: '', senha: ''};
		this.submitForm = this.submitForm.bind(this);
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:8080/api/autores')
			.then(res => res.json())
			.then(data => this.setState({list: data}));
	}

	submitForm(event) {
		event.preventDefault();
		fetch('http://localhost:8080/api/autores', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			body: JSON.stringify({
				nome: this.state.nome,
				email: this.state.email,
				senha: this.state.senha
			})
		})
			.then(res => {
				if (!res.ok) {
					console.log(`Status: ${res.status}`)
				} else {
					console.log('data sent successfully')
				}
			})
	}

	setName(event) {
		this.setState({nome: event.target.value});
	}

	setEmail(event) {
		this.setState({email: event.target.value});
	}

	setPassword(event) {
		this.setState({senha: event.target.value});
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
							<form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
								<div className="pure-control-group">
									<label htmlFor="nome">Name</label>
									<input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setName} />
								</div>
								<div className="pure-control-group">
									<label htmlFor="email">Email</label>
									<input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} />
								</div>
								<div className="pure-control-group">
									<label htmlFor="senha">Password</label>
									<input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setPassword} />
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
								<tbody>
								{
									this.state.list.map(author => {
										return(
											<tr key={author.id}>
												<td>{author.nome}</td>
												<td>{author.email}</td>
											</tr>
										);
									})
								}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default App;
