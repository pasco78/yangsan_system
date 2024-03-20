import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initialItems } from "./initialItems"; 
import useFetch from "../hooks/useFetch"; 

const DayList = () => {
  const fetchedDays = useFetch("http://localhost:3000/days");
  const [days, setDays] = useState(initialItems); 

  useEffect(() => {
    if (fetchedDays && fetchedDays.length > 0) {
      setDays([...initialItems, ...fetchedDays]);
    }
  }, [fetchedDays]); 

  return (
    <ul style={{ display: "flex", flexDirection: "column", width: "100%", position: "fixed", bottom: "150px", left: "0", fontSize: "70%" }}>
      {days.map((day, index) => (
        <li key={day.id} style={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
          {/* 수정된 부분: Link to 경로를 day.id에서 day.day로 변경 */}
          <Link to={`/day/${day.day}`} style={{ textDecoration: 'none', color: 'black', fontSize: "inherit" }}>
            {index + 1}. {day.day}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DayList;
