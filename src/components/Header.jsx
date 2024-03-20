import React from "react";
import { Link } from "react-router-dom";
import DayList from "./DayList"; // DayList 컴포넌트를 불러옵니다.

const Header = () => {
  return (
    <div className="header">
      <h1 style={{ textAlign: "center" }}>
        <a href="/" style={{ fontSize: "80%" }}>
          {/* 텍스트 크기를 50%로 설정 */}
          양산 업무 폴더
        </a>
      </h1>

      <div className="menu">
        {/* DayList를 헤더에 추가합니다. */}
        <DayList />
        <Link to="/" className="link" style={{ fontSize: "0.75rem" }}>
          {/* Changed font size to rem */}
          Menu
        </Link>
        <Link to="/create_word" className="link" style={{ fontSize: "0.75rem" }}>
          {/* Changed font size to rem */}
          Input Data
        </Link>
        <Link to="/create_day" className="link" style={{ fontSize: "0.75rem" }}>
          {/* Changed font size to rem */}
          Item 추가
        </Link>
      </div>
    </div>
  );
};

export default Header;
