import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import Footer from './components/Footer';
import routes from "./routes/routes";
import store from "./stores/store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          {routes}
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </Provider>

    </>
  )
}
export default App;

