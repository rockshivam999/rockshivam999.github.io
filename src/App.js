import logo from "./logo.svg";
import "./App.css";
import GraphVisulizer from "./components/graphVisulizer/GraphVisulizer";

function App() {
  return (
    <div>
      <div style={{ height: "100px" }}></div>
      <GraphVisulizer n={40} />
      {/* <GraphVisualizer1 size={10} /> */}
    </div>
  );
}

export default App;
