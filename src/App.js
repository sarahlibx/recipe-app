import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchCurrentTime = async () => {
      const response = await fetch("/time");
      const data = await response.json();
      setCurrentTime(data.time);
    };
    fetchCurrentTime();
  }, []);

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
    </div>
  );
}

export default App;
