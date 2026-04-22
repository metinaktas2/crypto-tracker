import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/coin/:id", element: <Detail /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
