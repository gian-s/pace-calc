/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Table from "./table";
import './App.css';
import PropTypes from 'prop-types';

const App = () => {
  const [data, setData] = useState([
    { distance: 1, minutes: 6, seconds: 30 },
  ]);
  const [calculatedPace, setPace] = useState("");
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
    // Check if there is at least one row to copy from
    if (data.length > 0) {
      const firstRow = data[0];
      setData([...data, { ...firstRow }]);
    } else {
      // Optional: Handle the case where there are no existing rows to copy from
      // For example, you can add a row with predefined default values
      setData([...data, { distance: 1, minutes: 0, seconds: 0 }]);
    }
  };
  

  const handleCalculate = () => {
    let totalDistance = 0;
    let totalSeconds = 0;
  
    data.forEach(row => {
      // Convert all values to numbers to avoid unexpected JavaScript type coercion
      const distance = Number(row.distance);
      const seconds = Number(row.seconds);
      const minutes = Number(row.minutes);
  
      // Accumulate total distance and time only if distance is positive
      if (distance > 0) {
        totalDistance += distance;
        totalSeconds += seconds + (minutes * 60);
      }
    });
  
    // Check to prevent division by zero and ensure there is valid data
    if (totalDistance > 0) {
      const paceMinutes = Math.floor(totalSeconds / totalDistance / 60);
      const paceSeconds = Math.floor((totalSeconds / totalDistance) % 60);
      setPace(`Ran ${totalDistance} miles at ${paceMinutes} min ${paceSeconds} sec pace`);
    } else {
      // Optionally, set some default state or message if there's no distance to calculate pace
      setPace('No valid distance provided to calculate pace.');
    }
  
    setEditing(false); // Update editing state irrespective of the calculation outcome
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
      <Response pace={calculatedPace} isEditing={editing} />
    </div>
  );
};


App.propTypes = {
  pace: PropTypes.string,
  isEditing: PropTypes.bool
};


export default App;
