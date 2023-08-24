import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [greatest, setGreatest] = useState("");

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const response = await fetch("/time");
      const data = await response.json();
      setCurrentTime(data.time);
    };
    fetchCurrentTime();
  }, []);

  const handleOnClickGreatest = () => {
    const fetchGreatest = async () => {
      const response = await fetch("/whoisthegreatest");
      const data = await response.json();
      setGreatest(data);
    };
    fetchGreatest();
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  };
  const formatTime = new Date(currentTime * 1000).toLocaleString("en-US", options);
  return (
    <div className='App'>
      <header>
        <h1>Ann experiments with Flask and React! Woo!</h1>
      </header>
      {formatTime}

      <button onClick={handleOnClickGreatest}>Find out who is the Greatest by clicking here!</button>
      {greatest && <h2>{greatest.name} is the Greatest!</h2>}
    </div>
  );
}

export default App;
