import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthScreen from "./pages/AuthScreen";
import { useEffect } from "react";
import { HomeScreen } from "./pages/HomeScreen";
import { axiosInstance } from "./axios";

function App() {
  useEffect(() => {
    axiosInstance
      .get("/api/batches/getdetails")
      .then((res) => {
        console.log(res.data);
        setBatches([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
