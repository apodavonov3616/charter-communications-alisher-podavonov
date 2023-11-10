import '../styles/App.css';
import Transactions from './Transactions';
import IndexPoints from './IndexPoints';
import ShowPoints from './ShowPoints';
import { Routes, Route } from "react-router-dom";
import CharterImage from "../assets/CharterImage.svg"
import { Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="nav-header">
            <Link to={'/'}><img src={CharterImage} alt="Charter Communications" /></Link>
            <nav>
                <Link to={`/`}><button>Totals Page</button></Link>
                <Link to={`/transactions`}><button>Transactions Page</button></Link>
            </nav>
        </header>
      <Routes>
        <Route path="/" element={<IndexPoints />} />
        <Route path="/transactions" element={<Transactions />}>
        </Route>
        <Route path="/show-points/:id" element={<ShowPoints />} />

      </Routes>

    </div >
  );
}

export default App;
