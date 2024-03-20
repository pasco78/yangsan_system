import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1 style={{ textAlign: "center" }}>
        <a href="/" style={{ fontSize: "80%" }}>
          {" "}
          {/* 텍스트 크기를 50%로 설정 */}
          양산 업무 폴더
        </a>
      </h1>

       <div className="menu" style={{ display: "flex", justifyContent: "flex-start", paddingLeft: "20px" }}>
        <Link to="/" className="link" style={{ fontSize: "0.75rem", marginRight: "20px" }}>
          Menu
        </Link>
        <Link to="/create_word" className="link" style={{ fontSize: "0.75rem", marginRight: "20px" }}>
          Input Data
        </Link>
        <Link to="/create_day" className="link" style={{ fontSize: "0.75rem", marginRight: "20px" }}>
          Add Item
        </Link>
      </div>
    </div>
  );
};

export default Header;