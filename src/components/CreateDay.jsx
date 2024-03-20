import { useRef, useState, useEffect } from "react";
import { initialItems } from "./initialItems"; // Ensure the path is correct

export default function CreateDay() {
  const dayRef = useRef(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/days");
        if (!response.ok) {
          throw new Error("Data fetch failed.");
        }
        const data = await response.json();
        setDays([...initialItems, ...data]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function addDay() {
    const dayValue = dayRef.current.value.trim();
    if (!dayValue) {
      alert("Please add a file list.");
      return;
    }

    fetch("http://localhost:3000/days/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day: dayValue }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.json();
    })
    .then((newDay) => {
      const updatedDays = [...days, newDay];
      setDays(updatedDays);
      dayRef.current.value = ""; // Reset input value

      // Dispatch an event with the updated list
      const event = new CustomEvent('updateDayList', { detail: updatedDays });
      window.dispatchEvent(event);

      alert("File list added successfully");
    })
    .catch((error) => {
      console.error("Error adding day:", error);
    });
  }

  function deleteDay(id) {
    fetch(`http://localhost:3000/days/${id}`, { method: "DELETE" })
    .then(() => {
      const updatedDays = days.filter(day => day.id !== id);
      setDays(updatedDays);

      // Dispatch an event with the updated list
      const event = new CustomEvent('updateDayList', { detail: updatedDays });
      window.dispatchEvent(event);

      alert("Day deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting day:", error);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "70%", marginTop: "-250px" }}>
  <div style={{ width: "20%" }}>
    <input type="text" ref={dayRef} style={{ width: "95%", fontSize: "inherit", height: "30px" }} />
    <button onClick={addDay} style={{ marginTop: "10px", width: "100%", fontSize: "inherit" }}>Add list</button>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {days.filter(day => !initialItems.find(item => item.id === day.id)).map((day) => (
        <li key={day.id} style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
          <span style={{ width: "80%", fontSize: "inherit" }}>{day.day}</span>
          <button onClick={() => deleteDay(day.id)} style={{ marginLeft: "10px", width: "70px", fontSize: "inherit" }}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}
