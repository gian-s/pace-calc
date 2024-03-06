import { useState } from "react";
import Table from "./table";
import './App.css'
import PropTypes from 'prop-types';


const App = () => {
  const [data, setData] = useState([
    {  distance: 1, minutes: 6,seconds:30 },
  ]);

  // const [distance, setDistance] = useState(0)
  // const [seconds, setSeconds] = useState(0)
  const [calculate, setCalculate] = useState("");
  const [editing, setEditing] = useState(false);

  const columns = [
    { id: "distance", title: "Distance in mi" },
    { id: "minutes", title: "Minute" },
    {id:"seconds", title:"Second"}
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
    setData([...data, { distance: 1, minutes: 0 , seconds:0}]);
  };

  const handleCalculate = () =>{
    let distance = 0;
    // let minutes = 0;
    let seconds = 0;

    data.map((row) =>{
      if(Number(row.distance) > 0 ){

        distance += Number(row.distance)
        seconds += (Number(row.seconds) +(Number(row.minutes)*60) )

      }
     
    })
    console.log(seconds);
    // setDistance(distance);
    // setSeconds(seconds);
    setCalculate(true);

    let paceMin = (seconds/distance)/60

    let floor = Math.floor((seconds/distance)/60)

    let paceSec = (paceMin - floor) * 60
    let paceStr = "Ran "+ distance +" miles at " + floor + " min " + paceSec.toFixed(2) + " sec pace";
    
    setCalculate(paceStr);
    setEditing(false);
    
  }

  function Response({pace, isEditing}){

    if(pace.length > 0 && !isEditing){
      return(
        <h3>{pace}</h3>
      )
    }
  }

  return (
    <div>

      <h1>Running Pace Calculator</h1>


    <div className="tables" >
      <Table
        data={data}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
    <div className="button-group">
    <button onClick={handleAddRow}>Add Row</button> <button onClick={handleCalculate}> Calculate</button>
      <Response pace={calculate} isEditing={editing}/>
    </div>


    </div>

  );
};

App.propTypes = {
  pace: PropTypes.string,
  isEditing: PropTypes.bool
};

export default App;

