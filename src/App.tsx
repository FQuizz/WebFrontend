import { Route, Routes } from "react-router";
import "./index.css";
import { routes } from "./routes/route";
import React, { ReactElement } from "react";

export function App() {
  return (
    <Routes>
      {routes.map((route) => {
        const Layout = route.layout ?? React.Fragment;
        const Page = route.component;
        return (
          <Route
            path={route.path}
            element={
              <Layout>
                <Page />
              </Layout>
            }
            key={route.path}
          />
        );
      })}
    </Routes>
  );
}

export default App;
