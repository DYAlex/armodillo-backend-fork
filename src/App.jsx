import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default App;
