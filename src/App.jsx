import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Routes 추가
import Day from "./components/Day";
import DayList from "./components/DayList";
import Header from "./components/Header";
import EmptyPage from "./components/EmptyPage";
import CreateWord from "./components/CreateWord";
import CreateDay from "./components/CreateDay";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
<Routes>
  <Route path="/" element={<DayList />} />
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
