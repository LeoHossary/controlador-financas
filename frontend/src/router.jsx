import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SignUp from "./pages/SingUp";
import Login from "./pages/Login";
import Main from "./pages/Main";

function ProtectedRoutes({ redirectTo, logged }) {
  return logged ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  const [logged, setLogged] = useState(false);
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [dataModal, setDataModal] = useState([]);
  return (
    <Routes>
      <Route path="/">
        <Route
          path="/"
          element={
            <Login logged={logged} setLogged={setLogged} account={account} />
          }
        />
        <Route
          path="/login"
          element={
            <Login logged={logged} setLogged={setLogged} account={account} />
          }
        />
      </Route>

      <Route
        path="/cadastro"
        element={
          <SignUp
            logged={logged}
            account={account}
            setAccount={setAccount}
            setDataModal={setDataModal}
          />
        }
      />

      <Route
        element={<ProtectedRoutes redirectTo={"/login"} logged={logged} />}
      >
        <Route
          path="/main"
          element={
            <Main
              account={account}
              logged={logged}
              setLogged={setLogged}
              dataModal={dataModal}
              setDataModal={setDataModal}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
