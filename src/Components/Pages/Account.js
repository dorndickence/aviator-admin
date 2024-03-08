import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Account = () => {
  const [verify, setVerify] = useState(false);

  const getverify = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}dashboard`, {
        token: Cookies.get("token"),
      })
      .then((data) => {
        setVerify(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const verifyPayout = (e, withdrawId, index) => {
    e.target.classList.add("hidden");
    const inputWithdraw = document.getElementById(
      `inputWithdraw${index}`
    ).value;
    axios
      .post(`${process.env.REACT_APP_API_URL}verifyPayout`, {
        token: Cookies.get("token"),
        withdrawId: withdrawId,
        code: inputWithdraw,
      })
      .then((data) => {
        toast.success(`${data.data.message}`, { theme: "dark" });
        getverify();
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`, { theme: "dark" });
        e.target.classList.remove("hidden");
      });
  };
  useEffect(() => {
    getverify();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="pt-12">
        <div className="flex gap-6 justify-center flex-col md:flex-row">
          {verify &&
            verify.map((withdraw, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-3 border-2 border-solid border-green-500 p-6 m-6"
                >
                  <div>Withdraw Batch ID:{withdraw.withdrawId}</div>
                  <div className="flex gap-6">
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      id={`inputWithdraw${index}`}
                    />
                    <button
                      onClick={(e) => {
                        verifyPayout(e, withdraw.withdrawId, index);
                      }}
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Account;
