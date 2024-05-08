import './App.css';
import Navbar from './Component/Navbar';
import Manager from './Component/Manager';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <Navbar/>
    <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

    <Manager/>
    </div>
    {/* <ToastContainer /> */}
    </>
  );
}

export default App;
