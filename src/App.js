import logo from "./logo.svg";
import "./App.css";
import GraphVisulizer from "./components/graphVisulizer/GraphVisulizer";
import GraphVisualizer1 from "./CTest";

function App() {
  return (
    <div>
      <div style={{ height: "100px" }}></div>
      <GraphVisulizer size={60} />
      {/* <GraphVisualizer1 size={10} /> */}
    </div>
  );
}

export default App;
