import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import "./App.css";
const router = createBrowserRouter([
  { path: "/", Component: Login },
  { path: "/upload", Component: Upload },
]);

function App() {
  // require("dotenv").config();

  return <RouterProvider router={router} />;
}

export default App;
