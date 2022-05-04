import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import './App.css';
import {Search} from "./components/Search";
import {DetailView} from "./components/DetailView";




function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Search/>}></Route>
                <Route path="/beer/:id" element={<DetailView/>}></Route>

            </Routes>

        </BrowserRouter>

    </div>
  );
}

export default App;
