import React, {Component} from "react";
import InputCustom from "./InputCustom";
import SubmitCustom from "./SubmitCustom";
import PubSub from 'pubsub-js';

class AuthorForm extends Component {

	constructor() {
		super();
		this.state = {nome: '', email: '', senha: ''};
		this.submitForm = this.submitForm.bind(this);
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
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
				PubSub.publish('clear-errors', {});
				return this.handleResponse(res);
			})
	}

	handleResponse(res) {
		if (!res.ok) {
			console.log(`Status: ${res.status}`)
			res.json().then(data => PubSub.publish('validate-erros', data));
		} else {
			console.log('data sent successfully')
			this.clearForm();
			return res.json().then(list => PubSub.publish('update-list-authors', list));
		}
	}

	clearForm() {
		this.setState({nome: '', email: '', senha: ''});
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
		return (<form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
			<InputCustom label="Name" id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setName}/>
			<InputCustom label="Email" id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
			<InputCustom label="Password" id="password" type="password" name="senha" value={this.state.senha} onChange={this.setPassword}/>
			<SubmitCustom label="Save" />
		</form>);
	}
}

class AuthorsTable extends Component {
	render() {
		return (
			<table className="pure-table">
				<thead>
				<tr>
					<th>Name</th>
					<th>email</th>
				</tr>
				</thead>
				<tbody>
				{
					this.props.list.map(author => {
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
		);
	}
}

export default class AuthorBox extends Component {

	constructor() {
		super();
		this.state = {list: []};
	}

	componentDidMount() {
		fetch('http://localhost:8080/api/autores')
			.then(res => res.json())
			.then(data => this.updateList(data));

		PubSub.subscribe('update-list-authors', (topic, newList) => {
			this.updateList(newList);
		});
	}

	updateList(data) {
		this.setState({list: data});
	}

	render() {
		return(
			<div>
				<AuthorForm />
				<AuthorsTable list={this.state.list} />
			</div>
		);
	}
}