import Aboutme from "./components/Aboutme/Aboutme.jsx";
import Form from "./components/Form/Form.jsx";
import { Provider } from "react-redux";
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Form/>
      <Aboutme/>
    </div>
    </Provider>
  );
}

export default App;
