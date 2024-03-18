import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateDay() {
  const navigate = useNavigate();
  const dayRef = useRef(null);
  const days = useFetch("http://localhost:3000/days");

  function addDay() {
    const dayValue = dayRef.current.value.trim();
    if (!dayValue) {
      alert("File list가 추가 되었습니다.");
      return;
    }

    fetch("http://localhost:3000/days/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: dayValue,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("생성이 완료 되었습니다");
        navigate(`/day/${dayValue}`);
      }
    });
  }

  function deleteDay(id) {
    fetch(`http://localhost:3000/days/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("삭제가 완료 되었습니다");
      })
      .catch((error) => {
        console.error("Error deleting day:", error);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", width: "20%" }}>
      <input type="text" ref={dayRef} placeholder="File name" style={{ fontSize: "50%", width: "100%" }} />
      <button onClick={addDay} style={{ fontSize: "50%", marginTop: "10px", width: "100%" }}>
        Add list
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {days.map((day) => (
          <li key={day.id} style={{ marginTop: "10px", display: "flex", alignItems: "center", width: "100%" }}>
            <span style={{ fontSize: "50%", width: "80%" }}>{day.day}</span>
            <button
              onClick={() => deleteDay(day.id)}
              style={{ fontSize: "50%", marginLeft: "10px", alignSelf: "flex-start", width: "70px" }} // 삭제 버튼의 너비를 조정
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
