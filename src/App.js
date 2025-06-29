import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Routes from './Routes/Routes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './UserContext';

function App() {
  return (
      <AuthProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </AuthProvider>
  );
}
export default App;
