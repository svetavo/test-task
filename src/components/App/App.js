import "normalize.css";
import { Calculator } from "../Calculator/Calculator";
import appstyles from "./App.module.css";

function App() {
  return (
    <div className={appstyles.page}>
      <Calculator/>
    </div>
  )
}

export default App;
