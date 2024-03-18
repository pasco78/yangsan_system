import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const DayList = () => {
  const days = useFetch("http://localhost:3000/days");

  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          position: "fixed",
          bottom: "150px",
          left: "0",
        }}
      >
        {days &&
          days.map((day, index) => (
            <li key={day.id} style={{ width: "15%", textAlign: "left", paddingLeft: "20px" }}>
              <Link to={`/day/${day.day}`} style={{ fontSize: "50%" }}>
                {index + 1}. {day.day}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default DayList;
