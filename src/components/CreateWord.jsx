import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported correctly
import useFetch from "../hooks/useFetch";

const CreateWord = () => {
  const days = useFetch("http://localhost:3000/days");
  const navigate = useNavigate(); // Correctly using useNavigate here

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  const janRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault(); // Ensuring default form submission is prevented

    fetch(`http://localhost:3000/words/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: dayRef.current.value,
        eng: engRef.current.value,
        kor: korRef.current.value,
        jan: janRef.current.value,
        isDone: false,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(() => {
        alert("생성이 완료 되었습니다");
        navigate(`/day/${dayRef.current.value}`); // Correct use of navigate
      });
  }

  // Check if 'days' data is correctly fetched and utilized
  return (
    <form onSubmit={onSubmit}>
      {" "}
      {/* onSubmit handler attached to form */}
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} /> {/* ref is correctly used */}
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>jan</label>
        <input type="text" placeholder="컴퓨터" ref={janRef} />
      </div>
      <div className="input_area">
        <label>항목</label>
        <select ref={dayRef}>
          {days &&
            days.map((day) => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
        </select>
      </div>
      <button type="submit">저장</button> {/* Ensure button is of type submit */}
    </form>
  );
};

export default CreateWord;
