import Login from "./Screens/Login";
import Browse from "./Screens/Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";

const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/browse", element: <Browse /> },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
