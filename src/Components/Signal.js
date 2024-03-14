import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
export default function Signal() {
  const [signal, setSignal] = useState("0.00");
  const signalProvider = async () => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_API_URL}signal`, {
        token: Cookies.get("token"),
      });
      setSignal(data.data.data);
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <span className="text-4xl">Aviator Signal</span>
        <div className="p-12 h-48 flex items-center m-6 text-4xl border-4 border-solid border-green-500 rounded-[50%]">
          {signal}
        </div>
        <button onClick={signalProvider} className="btn btn-primary">
          Get Signal
        </button>
      </div>
    </>
  );
}
