import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Components/Loading/Loading";
import Page404 from "./Components/Page404/Page404";
import { MOVIE_LIST } from "./routes";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect
  const PageMovieListing = React.lazy(() => import("./Page/PageMovieListing"));

  useEffect(() => {
    setTimeout(() => {
      if (location.pathname === "/") {
        navigate(MOVIE_LIST);
      }
    }, 500);
  }, []);

  return (
    <div className="App">
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path={"*"} element={<Page404 />} />
          <Route path={MOVIE_LIST} element={<PageMovieListing />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
