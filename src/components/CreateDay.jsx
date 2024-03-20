import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDay() {
  const navigate = useNavigate();
  const dayRef = useRef(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  // 사용자가 정의한 초기 항목
  const initialItems = [
    { id: 'structure', day: '구조 구성도' },
    { id: 'specification', day: '의장 시방서' }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/days");
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        // 데이터 로딩이 성공적으로 완료된 후 초기 항목 설정
        setDays([...initialItems, ...data]); // 초기 항목과 로드된 데이터 병합
      } catch (error) {
        console.error("데이터 로딩 중 오류:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function addDay() {
    const dayValue = dayRef.current.value.trim();
    if (!dayValue) {
      alert("File list 추가가 필요합니다.");
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
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.json();
    })
    .then((newDay) => {
      setDays((prevDays) => [...prevDays, newDay]);
      alert("File list 추가가 완료 되었습니다");
      dayRef.current.value = ""; // 입력 값 초기화
    })
    .catch((error) => {
      console.error("Error adding day:", error);
    });
  }

  function deleteDay(id) {
    fetch(`http://localhost:3000/days/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setDays((prevDays) => prevDays.filter((day) => day.id !== id));
      alert("삭제가 완료 되었습니다");
    })
    .catch((error) => {
      console.error("Error deleting day:", error);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start", width: "100%" }}>
      <div style={{ width: "20%" }}>
        <input
          type="text"
          ref={dayRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="File name"
          style={{ fontSize: "50%", width: "100%" }}
        />
        <button onClick={addDay} style={{ fontSize: "50%", marginTop: "10px", width: "100%" }}>
          Add list
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {days.map((day) => (
            <li key={day.id} style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "50%", width: "80%" }}>{day.day}</span>
              <button
                onClick={() => deleteDay(day.id)}
                style={{ fontSize: "50%", marginLeft: "10px", width: "70px" }}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
