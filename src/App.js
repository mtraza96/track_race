import React, { useState, useEffect } from 'react';
import './App.css';

const EntryPage = ({ onStartRace }) => {
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleAddParticipant = () => {
    if (participants.length < 10) {
      setParticipants([...participants, { name, speed, startTime, endTime: '' }]);
      setName('');
      setSpeed('');
      setStartTime('');
    } else {
      alert('Maximum participants reached (10)');
    }
  };

  return (
    
    <div className="entry-page">
      <div className='container'>
      <h1 className='heading'>RUNNER DETAILS</h1>
      <p className='add_participant'> *You can add max 10 participant</p>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Speed:</label>
        <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <button  className='addButton' onClick={handleAddParticipant}> + Add Runner</button>
      </div>


      <div className='input_Shwom'>
      <table className='styled-table'>
        <thead >
            <tr >
            <th>Name</th>
            <th>Speed</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td >{participant.name}</td>
              <td>{participant.speed}</td>
              <td>{participant.startTime}</td>
              <td>{participant.endTime}</td>
            </tr>
          ))}
        </tbody>
      
      </table>
      <button  className='button' onClick={onStartRace}> Start Race <span>&#8594;</span>
</button>
    </div>
    </div>
  );
};

const RaceTrackPage = ({ participants }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="race-track-page">
      <h1>Race Track</h1>
      <div>
        <h2>Elapsed Time: {elapsedTime} seconds</h2>
      </div>
      <div className="participant-tracks">
        {participants.map((participant, index) => (
          <div key={index} className="participant-track">
            <p>{participant.name}</p>
            <div className="track" style={{ width: `${participant.speed * elapsedTime}px` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PopUp = ({ participants }) => {
  return (
    <div className="pop-up">
      <h1>Race Results</h1>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.name} - {participant.speed * elapsedTime} meters
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState(1); // 1: Entry Page, 2: Race Track Page, 3: PopUp
  const [participants, setParticipants] = useState([]);

  const handleStartRace = () => {
    setPage(2); // Switch to Race Track Page
  };

  const handleRaceComplete = () => {
    setPage(3); // Switch to PopUp Page
    // Implement logic for displaying race results
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) => ({
        ...participant,
        endTime: participant.speed * elapsedTime,
      }))
    );
  };

  return (
    <div>
      {page === 1 && <EntryPage onStartRace={handleStartRace} />}
      {page === 2 && <RaceTrackPage participants={participants} />}
      {page === 3 && <PopUp participants={participants} />}
      {page !== 3 && <button onClick={handleRaceComplete}>Race Complete</button>}
    </div>
  );
};

export default App;
