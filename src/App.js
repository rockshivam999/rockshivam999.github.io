import logo from "./logo.svg";
import "./App.css";
import GraphVisulizer from "./components/graphVisulizer/GraphVisulizer";

function App() {
  return (
    <div>
      <div style={{ height: "100px" }}></div>
      <GraphVisulizer size={60} />
    </div>
  );
}

export default App;
