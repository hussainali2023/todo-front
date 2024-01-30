import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Todos from "../components/Todos";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/singleTodo/:id",
        element: <Todos/>
    }

])

export default router;