import { useState } from "react";

export default function Word({ word: w }) {
  const [currentWord, setCurrentWord] = useState(w);
  const [isDone, setIsDone] = useState(w.isDone);
  const [fileName, setFileName] = useState(""); // State to hold the file name

  function toggleDone() {
    fetch(`http://localhost:3000/words/${currentWord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...currentWord,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsDone((prevIsDone) => !prevIsDone);
      }
    });
  }

  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`http://localhost:3000/words/${currentWord.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setCurrentWord({ id: 0 });
        }
      });
    }
  }

  function attachFile(event) {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the state with the file name
      alert("파일이 첨부되었습니다: " + file.name);
    }
  }

  function triggerFileInput() {
    document.getElementById("fileInput" + currentWord.id).click();
  }

  if (currentWord.id === 0) {
    return null;
  }

  return (
    <tr className={isDone ? "off" : ""} style={{ fontSize: "100%" }}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td style={{ fontSize: "60%" }}>{currentWord.eng}</td> {/* Font size reduced */}
      <td style={{ fontSize: "60%" }}>{currentWord.kor}</td> {/* Font size reduced */}
      <td>
        <button onClick={triggerFileInput} className="btn_attach" style={{ fontSize: "40%" }}>
          파일 첨부
        </button>
        <input type="file" id={"fileInput" + currentWord.id} style={{ display: "none" }} onChange={attachFile} />
        {fileName && <span style={{ marginLeft: "10px", fontSize: "50%" }}>{fileName}</span>}{" "}
        {/* 파일 이름의 글자 크기를 50%로 설정 */}
      </td>
      <td>
        <button onClick={del} className="btn_del" style={{ fontSize: "40%" }}>
          삭제
        </button>
      </td>
    </tr>
  );
}
