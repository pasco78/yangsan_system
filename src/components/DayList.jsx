import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

const DayList = () => {
  // 서버로부터 가져온 데이터
  const fetchedDays = useFetch("http://localhost:3000/days");

  // 사용자가 정의한 초기 항목
  const initialItems = [
    { id: 'structure', day: '구조 구성도' },
    { id: 'specification', day: '의장 시방서' }
  ];

  // days 상태 초기화, 초기에는 사용자가 정의한 항목만 포함
  const [days, setDays] = useState(initialItems);

  useEffect(() => {
    // fetchedDays가 유효할 때, 사용자 정의 항목과 서버로부터 받아온 데이터를 병합
    if (fetchedDays) {
      setDays([...initialItems, ...fetchedDays]);
    }
  }, [fetchedDays]); // fetchedDays가 변경될 때마다 이 효과를 재실행

  return (
    <>
      <ul style={{ display: "flex", flexDirection: "column", width: "100%", position: "fixed", bottom: "150px", left: "0" }}>
        {days.map((day, index) => (
          // 각 일자를 리스트 아이템으로 렌더링
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
