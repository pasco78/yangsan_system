import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const CreateWord = () => {
  const fetchedDays = useFetch("http://localhost:3000/days");
  const navigate = useNavigate();

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  const janRef = useRef(null);

  const initialItems = [
    { id: "structure", day: "구조 구성도" },
    { id: "specification", day: "의장 시방서" },
  ];

  const [days, setDays] = useState(initialItems);

  useEffect(() => {
    if (fetchedDays) {
      setDays([...initialItems, ...fetchedDays]);
    }
  }, [fetchedDays]);

  function onSubmit(e) {
    e.preventDefault();

    if (!engRef.current.value || !korRef.current.value || !janRef.current.value) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

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
        navigate(`/day/${dayRef.current.value}`);
      });
  }

  function onCancel() {
    navigate(-1); // 이전 페이지로 이동
  }

  return (
<div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", overflowX: "auto" }}>
  <form onSubmit={onSubmit} style={{ width: "auto", margin: "0 auto", maxWidth: "90%" }}>
    <div className="input_area" style={{ fontSize: "60%", marginBottom: "10px" }}> {/* 글자 크기를 1.2배로 조정 */}
      <label>Portfolio Name</label>
      <input type="text" ref={engRef} style={{ width: "80%", fontSize: "60%" }} /> {/* 글자 크기를 1.2배로 조정 */}
    </div>
    <div className="input_area" style={{ fontSize: "60%", marginBottom: "10px" }}> {/* 글자 크기를 1.2배로 조정 */}
      <label>Owner</label>
      <input type="text" ref={korRef} style={{ width: "80%", fontSize: "60%" }} /> {/* 글자 크기를 1.2배로 조정 */}
    </div>
    <div className="input_area" style={{ fontSize: "60%", marginBottom: "10px" }}> {/* 글자 크기를 1.2배로 조정 */}
      <label>Type</label>
      <input type="text" ref={janRef} style={{ width: "80%", fontSize: "60%" }} /> {/* 글자 크기를 1.2배로 조정 */}
    </div>

    <div className="input_area" style={{ fontSize: "60%", marginBottom: "10px" }}> {/* 글자 크기를 1.2배로 조정 */}
      <label>Data list</label>
      <select ref={dayRef} style={{ width: "80%", fontSize: "0.96em" }}> {/* select 요소의 글자 크기를 1.2배로 조정 */}
        {days.map((day) => (
          <option key={day.id} value={day.day} style={{ fontSize: "0.96em" }}> {/* option 요소들의 글자 크기를 1.2배로 조정 */}
            {day.day}
          </option>
        ))}
      </select>
    </div>
    <div style={{ display: "flex" }}>
      <button type="submit" style={{ fontSize: "60%" }}> {/* 글자 크기를 1.2배로 조정 */}
        저장
      </button>
      <button type="button" onClick={onCancel} style={{ fontSize: "60%", marginLeft: "5px" }}> {/* 글자 크기를 1.2배로 조정 */}
        취소
      </button>
    </div>
  </form>
</div>
  );
};

export default CreateWord;
