import React, {Component} from "react";

export default class SelectAuthors extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<select id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange} required="true">
				<option value="">Selecione</option>
				{
					this.props.authors.map(author => {
						return(
							<option key={author.id} value={author.id}>
								{author.nome}
							</option>
						)
					})
				}
			</select>
		);
	}

}