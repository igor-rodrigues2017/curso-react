import React, {Component} from 'react';
import PubSub from 'pubsub-js';
export default class InputCustom extends Component {

	constructor() {
		super();
		this.state = {messageError:''}
	}

	componentDidMount() {
		PubSub.subscribe('validate-erros', (topic, data) => {
			if (data) {
				data.errors.forEach(error => {
					if (error.field == this.props.name) {
						this.setState({messageError: error.defaultMessage});
					}
				});
			}
		});

		PubSub.subscribe('clear-errors', topic => {
			this.setState({messageError: ''});
		});
	}

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} type={this.props.type} name={this.props.nome} value={this.props.value} onChange={this.props.onChange} />
				<span className="error">{this.state.messageError}</span>
			</div>
		);
	}
}