// // export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LivePrices from "./LivePrices";
// import Login from "./Login";      // Create a Login.js component
// // import Signup from "./Signup";    // Optional: Create a Signup.js component

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LivePrices />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/signup" element={<Signup />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import StartBot from "./pages/StartBot";
import StopBot from "./pages/StopBot";
import Balances from "./pages/Balances";
import History from "./pages/History";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/start" element={<StartBot />} />
        <Route path="/stop" element={<StopBot />} />
        <Route path="/balance" element={<Balances />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
