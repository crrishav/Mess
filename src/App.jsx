import React from "react";
import HomePage from "./homePage";
import SmoothScroll from "./Components/smoothScroll";
import ErrorBoundary from "./Components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <SmoothScroll>
          <HomePage />
        </SmoothScroll>
      </ErrorBoundary>
    </div>
  );
}

export default App;
