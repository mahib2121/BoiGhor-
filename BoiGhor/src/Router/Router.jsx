import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/Home/HomePage";
import Register from "../pages/AuthPage/Register";
import Login from "../pages/AuthPage/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                loader: () =>
                    fetch("warehouses.json").then((res) => res.json()),
            },
            {
                path: "/about",
                element: <div>sample about</div>,
            },
            {
                path: "/books",
                element: <div>All Books Is here</div>,
            },
        ],
    },

    // AUTH ROUTES
    {
        path: "/",
        // element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
