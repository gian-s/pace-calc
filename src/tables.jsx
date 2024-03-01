import React, { useState } from "react";

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

export default Table;
