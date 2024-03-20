import React from 'react';
import { useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch'; // 경로는 실제 구조에 맞게 조정해주세요

const Day = () => {
  const { day } = useParams();
  const words = useFetch(`http://localhost:3000/words?day=${day}`);

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

export default Day; // Day 컴포넌트를 default export로 설정
