import React, { Component } from 'react';

class TableHeader extends Component {

raiseSorting = path => {
const sortingColumn = {...this.props.sortingColumn};
if (sortingColumn.path === path) {
sortingColumn.order = sortingColumn.order === "asc" ? "desc" : "asc";
}
else{
sortingColumn.path = path;
sortingColumn.order = 'asc';
}
this.props.onSorting(sortingColumn);
}

renderSortIcon = column => {
    const {sortingColumn} = this.props;

    if (column.path !== sortingColumn.path) {
        return null;
    }
    if (sortingColumn.order === "asc") {
        return <i className="fas fa-sort-up"></i>;
    }
    return <i className="fas fa-sort-down"></i>;
}


render() {
const {columns} = this.props;

return (<thead>
    <tr>
        {columns.map(column => <th className="clickable" key={column.path || column.key} onClick={()=>
            this.raiseSorting(column.path)}>{column.label} {this.renderSortIcon(column)}</th>)}
    </tr>
</thead> );
}
}

export default TableHeader;