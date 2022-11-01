import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/header";
import Overview from "./components/layout/overview";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Overview createView={false} />} />
        <Route path="/create" element={<Overview createView={true} />} />
      </Routes>
    </div>
  );
};

export default App;
