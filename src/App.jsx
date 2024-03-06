/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Table from "./table";
import './App.css';
import PropTypes from 'prop-types';

const App = () => {
  const [data, setData] = useState([
    { distance: 1, minutes: 6, seconds: 30 },
  ]);
  const [calculate, setCalculate] = useState("");
  const [editing, setEditing] = useState(false);

  const columns = [
    { id: "distance", title: "Distance in mi" },
    { id: "minutes", title: "Minute" },
    { id: "seconds", title: "Second" }
  ];

  const handleEdit = (rowIndex, columnId, newValue) => {
    const newData = [...data];
    newData[rowIndex][columnId] = newValue;
    setData(newData);
  };

  const handleDelete = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
    setEditing(true);
  };

  const handleAddRow = () => {
    setData([...data, { distance: 1, minutes: 0, seconds: 0 }]);
  };

  const handleCalculate = () => {
    let totalDistance = 0;
    let totalSeconds = 0;
    data.forEach(row => {
      if (Number(row.distance) > 0) { // Ensure valid distance
        totalDistance += Number(row.distance);
        totalSeconds += Number(row.seconds) + (Number(row.minutes) * 60);
      }
    });

    if (totalDistance > 0) { // Avoid division by zero
      const paceMin = Math.floor(totalSeconds / totalDistance / 60);
      const paceSec = ((totalSeconds / totalDistance) % 60).toFixed(2); // Keep precision for seconds
      setCalculate(`Ran ${totalDistance} miles at ${paceMin} min ${paceSec} sec pace`);
    } else {
      setCalculate("Invalid data for calculation."); // Handle case with no valid distance
    }
    setEditing(false); // Move out of the if-else to ensure it always sets editing to false after calculation
  };

  // Define the Response component within App if it's only used here
  function Response({ pace, isEditing }) {
    if (pace && !isEditing) { // Ensure pace exists and editing is not active
      return <h3>{pace}</h3>;
    }
    return null; // Return null to render nothing when conditions are not met
  }

  return (
    <div>
      <h1>Giancarlo's Running Pace Calculator</h1>
      <Table data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className="button-group">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      <Response pace={calculate} isEditing={editing} />
    </div>
  );
};

App.propTypes = {
  pace: PropTypes.string,
  isEditing: PropTypes.bool
};


export default App;
