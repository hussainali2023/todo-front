import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Todos from "../components/Todos";
// import Image from "../pages/Image";
import ImageUpload from "../pages/Image";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />
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
    },
    {
        path:"/image",
        element: <ImageUpload/>
    }

])

export default router;