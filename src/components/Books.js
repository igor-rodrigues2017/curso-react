import React, {Component} from "react";
import InputCustom from "./InputCustom";
import SubmitCustom from "./SubmitCustom";
import PubSub from "pubsub-js";
import SelectAuthors from "./SelectAuthors";

class BookForm extends Component {

	constructor() {
		super();
		this.state = {titulo:'', preco: '', autorId:''};
		this.submitForm = this.submitForm.bind(this);
	}

	setField(inputName, event) {
		let field = {};
		field[inputName] = event.target.value;
		this.setState(field);
	}

	submitForm(event) {
		event.preventDefault();
		fetch('http://localhost:8080/api/livros', {
			headers: { 'Content-Type': 'application/json' },
			method: 'post',
			body: JSON.stringify({
				titulo: this.state.titulo,
				preco: this.state.preco,
				autorId: this.state.autorId
			})
		})
			.then(res => {
				PubSub.publish('clear-errors', {});
				return this.handleBooksResponse(res);
			})
	}

	handleBooksResponse(res) {
		if (!res.ok) {
			console.log(`Status: ${res.status}`)
			res.json().then(data => PubSub.publish('validate-erros', data));
		} else {
			console.log('data sent successfully')
			this.clearBookForm();
			return res.json().then(books => PubSub.publish('update-list-books', books));
		}
	}

	clearBookForm() {
		this.setState({titulo: '', preco: '', autorId: ''});
	}

	render() {
		return (
			<form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method="post">
				<InputCustom label="Title" id="title" type="text" name="titulo" value={this.state.titulo} onChange={this.setField.bind(this, 'titulo')}/>
				<InputCustom label="Value" id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setField.bind(this, 'preco')}/>
				<SelectAuthors authors={this.props.authors} id='authorId' name="autorId" value={this.state.autorId} onChange={this.setField.bind(this, 'autorId')} />
				<SubmitCustom label="Save" />
			</form>
		);
	}
}

class BooksTable extends Component {
	render() {
		return (
			<table className="pure-table">
				<thead>
				<tr>
					<th>Book</th>
					<th>Price</th>
					<th>Author</th>
				</tr>
				</thead>
				<tbody>
				{
					this.props.books.map(book => {
						return(
							<tr key={book.id}>
								<td>{book.titulo}</td>
								<td>{book.preco}</td>
								<td>{book.autor.nome}</td>
							</tr>
						);
					})
				}
				</tbody>
			</table>
		);
	}
}

export default class BookBox extends Component {
	constructor() {
		super();
		this.state = {books: [], authors: []};
	}

	componentDidMount() {
		fetch('http://localhost:8080/api/livros')
			.then(res => res.json())
			.then(data => this.updateList(data));

		fetch('http://localhost:8080/api/autores')
			.then(res => res.json())
			.then(data => this.setState({authors: data}));

		PubSub.subscribe('update-list-books', (topic, newList) => {
			this.updateList(newList);
		});
	}

	updateList(data) {
		this.setState({books: data});
	}

	render() {
		return(
			<div>
				<div className="header">
					<h1>Books Register</h1>
				</div>
				<div className="content" id="content">
					<BookForm authors={this.state.authors}/>
					<BooksTable books={this.state.books} />
				</div>
			</div>
		);
	}
}