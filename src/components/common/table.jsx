import TableBody from './table_body';
import TableHeader from './table_header';

const Table = ({data , columns , sortingColumn , onSorting}) => {
    return ( <table className="table">
    <TableHeader columns={columns} sortingColumn={sortingColumn} onSorting={onSorting}/> 
    <TableBody data={data} columns={columns}/>
</table> );
}
 
export default Table;