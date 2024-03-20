// DayList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initialItems } from "./initialItems"; // Ensure this path is correct based on your project structure
import useFetch from "../hooks/useFetch"; // Assuming useFetch is your custom hook

const DayList = () => {
  const fetchedDays = useFetch("http://localhost:3000/days");
  const [days, setDays] = useState(initialItems); // Initialize with initialItems

  useEffect(() => {
    // Listen for the 'updateDayList' event
    const handleDayListUpdate = (event) => {
      setDays(event.detail);
    };

    window.addEventListener('updateDayList', handleDayListUpdate);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('updateDayList', handleDayListUpdate);
    };
  }, []);

  useEffect(() => {
    // Update days state when fetchedDays changes, combining with initialItems
    if (fetchedDays && fetchedDays.length > 0) {
      setDays([...initialItems, ...fetchedDays]);
    }
  }, [fetchedDays]); // Dependency on fetchedDays to update when it changes

  return (
    <ul style={{ display: "flex", flexDirection: "column", width: "100%", position: "fixed", bottom: "150px", left: "0" }}>
      {days.map((day, index) => (
        <li key={day.id} style={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
          <Link to={`/day/${day.day}`} style={{ textDecoration: 'none', color: 'black', fontSize: "50%" }}>
            {index + 1}. {day.day}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DayList;
