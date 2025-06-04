import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Routes from './Routes/Routes';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}
export default App;
