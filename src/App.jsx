import { AppProvider } from './context/AppContext.jsx';
import RouterApp from './RouterApp.jsx';
import './index.css';

function App() {
  return (
    <AppProvider>
      <RouterApp />
    </AppProvider>
  );
}

export default App;


