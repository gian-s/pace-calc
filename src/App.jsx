/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Table from "./table";
import './App.css';
import PropTypes from 'prop-types';

const App = () => {
  const [data, setData] = useState([
    { distance: 1, minutes: 6, seconds: 30 },
  ]);
  // const [calculatedPace, setPace] = useState("");
  const [editing, setEditing] = useState(false);
  const [paceData, setPaceData] = useState(null);

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
    if (data.length > 0) {
      const firstRow = data[0];
      setData([...data, { ...firstRow }]); // Creates a new object with the same properties as the first row
    }
  };
  
  

  const handleCalculate = () => {
    let totalDistance = 0;
    let totalSeconds = 0;
  
    data.forEach(row => {
      const distance = Number(row.distance);
      const seconds = Number(row.seconds);
      const minutes = Number(row.minutes);
  
      if (distance > 0) {
        totalDistance += distance;
        totalSeconds += seconds + (minutes * 60);
      }
    });
  
    if (totalDistance > 0) {
      const paceMinutes = Math.floor(totalSeconds / totalDistance / 60);
      const paceSeconds = Math.floor((totalSeconds / totalDistance) % 60);
      setPaceData({ totalDistance, paceMinutes, paceSeconds });
    } else {
      // Here you should update the state to reflect there's no valid pace data
      setPaceData(null); // Indicate that there's no valid data
    }
    setEditing(false); // Update editing state irrespective of the calculation outcome
  };
  
  

  // Define the Response component within App if it's only used here
  function Response({ paceData, isEditing }) {
    // Ensure paceData exists and editing is not active
    if (paceData && !isEditing) {
      return (
        <h3>
          <span className="highlight">{paceData.totalDistance} miles</span> at 
          <span className="highlight">{paceData.paceMinutes} min</span> 
          <span className="highlight">{paceData.paceSeconds} sec</span> average pace
        </h3>
      );
    } else if (!isEditing) { // Handle case where there's no valid data but editing is not active
      return <h3>No valid distance provided to calculate pace.</h3>;
    }
    return null; // Return null to render nothing when conditions are not met
  }
  
  Response.propTypes = {
    paceData: PropTypes.shape({
      totalDistance: PropTypes.number,
      paceMinutes: PropTypes.number,
      paceSeconds: PropTypes.number,
    }),
    isEditing: PropTypes.bool,
  };
  

  return (
    <div>
      <div className="header">
        <h1>Giancarlo's Running Pace Calculator</h1>
      </div>
      <div className="table-container">
        <Table data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      <div className="button-group">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      <Response paceData={paceData} isEditing={editing} />
    </div>
  );
};


App.propTypes = {
  pace: PropTypes.string,
  isEditing: PropTypes.bool
};


export default App;
