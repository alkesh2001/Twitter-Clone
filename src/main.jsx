import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useEffect } from "react";
import store, { Persistor } from "./Store/Store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  Login,
  AuthLayout,
  Profile,
  PostCard,
  EditProfile,
  UserProfile
} from "./component/index.js";
import Home from "./Page/Home.jsx";
import CreatePost from "./Page/CreatePost.jsx";
import Singup from "./Page/Singup.jsx";
import StartPage from "./component/StartPage.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Search from "./Page/Search.jsx";
import FollowerPage from "./Page/FollowerPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/",
        element: <PostCard/>
      },
      {
        path: "/Login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/Singup",
        element: (
          <AuthLayout authentication={false}>
            <Singup />
          </AuthLayout>
        ),
      },
      {
        path: "/Profile",
        element: (
          <AuthLayout authentication>
            {""}
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/EditProfile",
        element: (
          <AuthLayout authentication>
            {""}
            <EditProfile/>
          </AuthLayout>
        ),
      },
      {
        path: "/CreatePost",
        element: (
          <AuthLayout authentication>
            {""}
            <CreatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/Search",
        element: (
          <AuthLayout authentication>
            {""}
            <Search/>
          </AuthLayout>
        ),
      },
      {
        path: "/UserProfile",
        element: (
          <AuthLayout authentication>
            {""}
            <UserProfile/>
          </AuthLayout>
        ),
      },
      {
        path: "/Follower",
        element: (
          <AuthLayout authentication>
            {""}
            <FollowerPage/>
          </AuthLayout>
        ),
      },
      {
        path: "/Home",
        element: <Home />,
      },
    ],
  },
]);

const AppContainer = () => {
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("persist:main-root");
    if (!isAuthenticated) {
      router.navigate("/");
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppContainer />);