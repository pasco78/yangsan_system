import { useState, useEffect } from "react";

export default function Word({ word: w, onDelete }) {
  const [currentWord, setCurrentWord] = useState(w);
  const [isDone, setIsDone] = useState(w.isDone);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setIsDone(w.isDone);

    const savedFileName = localStorage.getItem(`fileName_${currentWord.id}`);
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, [w.isDone, currentWord.id]);

  function toggleDone() {
    // 완료 상태를 토글하는 로직
  }

  function del() {
    const isConfirmed = window.confirm("이 파일을 삭제하시겠습니까?");
    if (isConfirmed) {
      fetch(`http://localhost:3000/words/${currentWord.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
          }
          setCurrentWord({ id: 0 }); // 테이블에서 해당 항목 삭제
          onDelete(currentWord.id);
        })
        .catch((error) => {
          console.error("삭제 중 에러 발생: ", error);
        });
    }
  }

  function attachFile(event) {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      localStorage.setItem(`fileName_${currentWord.id}`, file.name);
      fetch(`http://localhost:3000/words/${currentWord.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentWord, isDone: true }),
      });
      setIsDone(true);
      alert("파일이 첨부되었습니다: " + file.name);
    }
  }

  function triggerFileInput() {
    document.getElementById("fileInput" + currentWord.id).click();
  }

  function downloadFile() {
    fetch(`http://localhost:3000/download/${currentWord.id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  if (currentWord.id === 0) {
    return null;
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td style={{ width: "5%", fontSize: "10px" }}>
        {fileName && <input type="checkbox" checked={isDone} onChange={toggleDone} />}
      </td>
      <td style={{ width: "15%", fontSize: "15px" }}>{currentWord.eng}</td>
      <td style={{ width: "15%", fontSize: "15px" }}>{currentWord.kor}</td>
      <td style={{ width: "15%", fontSize: "15px" }}>{currentWord.jan}</td>
      <td style={{ width: "15%", fontSize: "15px" }}>{currentWord.j}</td>
      <td style={{ width: "15%" }}>
        <button onClick={triggerFileInput} className="btn_attach" style={{ fontSize: "10px" }}>파일 첨부</button>
        <input type="file" id={"fileInput" + currentWord.id} style={{ display: "none" }} onChange={attachFile} />
        {fileName && <span style={{ marginLeft: "10px", fontSize: "10px" }}>{fileName}</span>}
        <button onClick={downloadFile} className="btn_download" style={{ fontSize: "10px", marginLeft:  "10px" }}>
          다운로드
        </button>
      </td>
      <td style={{ width: "10%" }}>
        <button onClick={del} className="btn_del" style={{ fontSize: "10px" }}>
          삭제
        </button>
      </td>
    </tr>
  );
}
