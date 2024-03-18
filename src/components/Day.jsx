// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Word from "./Word";
import useFetch from "../hooks/useFetch"; // useFetch 함수를 import합니다.

const Day = () => {
  const { day } = useParams();
  const words = useFetch(`http://localhost:3000/words?day=${day}`); // day 변수를 템플릿 리터럴로 사용하여 URL을 생성합니다.

  return (
    <div>
      <div style={{ fontSize: "70%" }}>{day}</div>
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Day;
