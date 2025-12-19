// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import App from "../App";
// import ErrorPage from "../pages/ErrorPage/ErrorPage";
// import HomePage from "../pages/Home/HomePage";
// import Register from "../pages/AuthPage/Register";
// import Login from "../pages/AuthPage/Login";
// import AuthLayout from "../Firebase/AuthLayout";
// import Cartpage from "../pages/CartPage/Cartpage";
// import ChackOut from "../pages/ChekoutPage/ChackOut";
// import Dashbord from "../pages/Dashbord/Dashbord";
// import PrivateRoute from "../Firebase/PrivateRoute";
// import MyOrder from "../pages/Dashbord/MyOrder";
// import AllBook from "../pages/AllBooks/AllBook";

// import Payment from "../pages/PaymentPages/Payment";
// import PaymentSucces from "../pages/PaymentPages/PaymentSucces";
// import MyPayments from "../pages/PaymentPages/myPayment";
// import BookDetail from "../components/BookDetail";
// import UserManagement from "../pages/Dashbord/UserManagement";
// import AdminRoute from "./AdminRoute";
// import AddBook from "../pages/Dashbord/AddBook";
// import UpdateBook from "../pages/Dashbord/UpadteBook";
// import ManageBooksUpdate from "../pages/Dashbord/ManageBooksUpdate";
// import PaymentCancel from "../components/PaymentCancel";
// import OrderManagement from "../pages/Dashbord/OrderManagement";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/",
//                 element: <HomePage />,
//                 loader: () =>
//                     fetch("warehouses.json").then((res) => res.json()),
//             },
//             {
//                 path: "/cart",
//                 element: <Cartpage></Cartpage>
//             },
//             {
//                 path: "/all-books",
//                 element: <AllBook></AllBook>,

//             },
//             {
//                 path: "/checkout",
//                 element: <ChackOut></ChackOut>,
//             },
//             {
//                 path: "/books/:id",
//                 element: (
//                     <PrivateRoute>
//                         <BookDetail></BookDetail>
//                     </PrivateRoute>
//                 )

//             },

//         ],
//     },

//     // AUTH ROUTES
//     {
//         path: "/",
//         errorElement: <ErrorPage />,
//         element: <AuthLayout />,
//         children: [
//             {
//                 path: "login",
//                 element: <Login />,
//             },
//             {
//                 path: "register",
//                 element: <Register />,
//             },
//         ],
//     },
//     {
//         path: "/dashboard",
//         element:
//             <PrivateRoute>
//                 <Dashbord></Dashbord>
//             </PrivateRoute>,
//         children: [
//             {
//                 path: "my-orders",
//                 element: <MyOrder></MyOrder>,
//             },
//             {
//                 path: "payment/:orderId",
//                 element: <Payment></Payment>,
//             },
//             {
//                 path: "payment-success",
//                 element: <PaymentSucces></PaymentSucces>,
//             },
//             {
//                 path: "payment-cancel",
//                 element: <PaymentCancel></PaymentCancel>,
//             },
//             {
//                 path: "my-Payment",
//                 element: <MyPayments></MyPayments>,
//             },
//             {
//                 path: "UserManagement",
//                 element: <AdminRoute> <UserManagement></UserManagement></AdminRoute>,
//             },
//             {
//                 path: "OrderManagement",
//                 element: <AdminRoute> <OrderManagement></OrderManagement></AdminRoute>,
//             },
//             {
//                 path: "AddBook",
//                 element: <AdminRoute> <AddBook></AddBook></AdminRoute>,
//             },
//             {
//                 path: "UpdateBook",
//                 element: <AdminRoute> <ManageBooksUpdate></ManageBooksUpdate></AdminRoute>,
//                 loader: ({ params }) => fetch(`http://localhost:3000/books/${params.id}`)
//             },
//         ]

//     }
// ]);

// export default router;



import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/Home/HomePage";
import Register from "../pages/AuthPage/Register";
import Login from "../pages/AuthPage/Login";
import AuthLayout from "../Firebase/AuthLayout";
import Cartpage from "../pages/CartPage/Cartpage";
import ChackOut from "../pages/ChekoutPage/ChackOut";
import Dashbord from "../pages/Dashbord/Dashbord";
import PrivateRoute from "../Firebase/PrivateRoute";
import MyOrder from "../pages/Dashbord/MyOrder";
import AllBook from "../pages/AllBooks/AllBook";
import Payment from "../pages/PaymentPages/Payment";
import PaymentSucces from "../pages/PaymentPages/PaymentSucces";
import MyPayments from "../pages/PaymentPages/myPayment";
import BookDetail from "../components/BookDetail";
import UserManagement from "../pages/Dashbord/UserManagement";
import AdminRoute from "./AdminRoute";
import AddBook from "../pages/Dashbord/AddBook";
import ManageBooksUpdate from "../pages/Dashbord/ManageBooksUpdate";
import PaymentCancel from "../components/PaymentCancel";
import OrderManagement from "../pages/Dashbord/OrderManagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            /* HOME (index route) */
            {
                index: true,
                element: <HomePage />,
                loader: () =>
                    fetch("warehouses.json").then((res) => res.json()),
            },

            /* PUBLIC PAGES */
            { path: "cart", element: <Cartpage /> },
            { path: "all-books", element: <AllBook /> },
            { path: "checkout", element: <ChackOut /> },

            {
                path: "books/:id",
                element: (
                    <PrivateRoute>
                        <BookDetail />
                    </PrivateRoute>
                ),
            },

            /* AUTH (nested, NOT another root) */
            {
                element: <AuthLayout />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },
                ],
            },

            /* DASHBOARD */
            {
                path: "dashboard",
                element: (
                    <PrivateRoute>
                        <Dashbord />
                    </PrivateRoute>
                ),
                children: [
                    { path: "my-orders", element: <MyOrder /> },
                    { path: "payment/:orderId", element: <Payment /> },
                    { path: "payment-success", element: <PaymentSucces /> },
                    { path: "payment-cancel", element: <PaymentCancel /> },
                    { path: "my-payment", element: <MyPayments /> },

                    {
                        path: "UserManagement",
                        element: (
                            <AdminRoute>
                                <UserManagement />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "OrderManagement",
                        element: (
                            <AdminRoute>
                                <OrderManagement />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "AddBook",
                        element: (
                            <AdminRoute>
                                <AddBook />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "UpdateBook",
                        element: (
                            <AdminRoute>
                                <ManageBooksUpdate />
                            </AdminRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
