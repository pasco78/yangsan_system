import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Day from "./components/Day";
import DayList from "./components/DayList";
import Header from "./components/Header";
import EmptyPage from "./components/EmptyPage";
import CreateWord from "./components/CreateWord";
import CreateDay from "./components/CreateDay";

const App = () => {
  return (
    <Router>
      <Header />
      <DayList /> {/* 모든 페이지에서 DayList가 보이도록 Routes 밖으로 이동 */}
      <div className="App">
        <Routes>
          <Route path="/" element={<></>} /> {/* 메인 페이지에서 특별히 표시할 컴포넌트가 없으므로 비워둠 */}
          <Route path="/day/:day" element={<Day />} />
          <Route path="/create_word" element={<CreateWord />} />
          <Route path="/create_day" element={<CreateDay />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
