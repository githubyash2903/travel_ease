import AppLayout from "./components/layout/AppLayout";
import AppProvider from "./provider/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <AppLayout />
    </AppProvider>
  );
}

export default App;
