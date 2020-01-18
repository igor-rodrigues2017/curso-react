import React, {Component} from "react";

export default class SelectAuthors extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<select {...this.props} required="true">
					<option value="">Select</option>
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
			</div>
		);
	}

}