import PropTypes from 'prop-types';


const Table = ({ data, columns, handleEdit, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.title}</th>
          ))}
          
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.id + row.id}>
                <input
                  value={row[column.id]}
                  onChange={(e) => handleEdit(index, column.id, e.target.value)}
                />
              </td>
            ))}

            {(data.length > 1 )&&(
                 <td>
                 <button onClick={() => handleDelete(index)}>Delete</button>
               </td>
        )}
           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  // Add other props validations as required
};


export default Table;
