import React, { Component } from "react";

const TableHead = () => {
    return(
        <thead>
        <tr>
            <th>Writers</th>
            <th>Books</th>
            <th>Prices</th>
            <th>Remove</th>
        </tr>
        </thead>
    );
}

const TableBody = props => {
    const lines = props.writers.map((line, index) => {
       return (
           <tr>
               <td>{line.writer}</td>
               <td>{line.book}</td>
               <td>{line.price}</td>
               <td><button>Remove</button></td>
           </tr>
       );
    });

    return(
        <tbody>
            {lines}
        </tbody>
    );
    
}

class Table extends Component {
    render() {
        const { writers } = this.props;

        return (
            <table>
                <TableHead />
                <TableBody writers = { writers }/>
            </table>
        );
    }
}

export default Table;