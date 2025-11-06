import { Navigate, Route, Routes } from "react-router";
import "./index.css";
import { routes } from "./routes/route";
import React, {
  createContext,
  ReactElement,
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getUser, User } from "./api";

interface AuthContextType {
  user: User | null;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
});

export function App() {
  const [context, setContext] = useState<AuthContextType>({
    user: null,
    isAuth: false,
  });

  useLayoutEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getUser()
        .then((user) => {
          setContext({
            user,
            isAuth: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setContext({ user: null, isAuth: false });
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={context}>
      <Routes>
        {routes.map((route) => {
          if (route.isAuth === true && context.isAuth === false) {
            return (
              <Route
                path={route.path}
                element={<Navigate to="/admin/home" replace />}
              />
            );
          }
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
    </AuthContext.Provider>
  );
}

export default App;
