import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

const Account = () => {
  const [verify, setVerify] = useState([]);
  const [users, setUsers] = useState(0);
  const [pendingWithraw, setPendingWithdraw] = useState(0);
  const [amount, setAmount] = useState(0);

  const [username, setUsername] = useState(0);

  const getverify = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}dashboard`, {
        token: Cookies.get("token"),
      })
      .then((data) => {
        setVerify(data.data.data);
        setUsers(data.data.users);
        setPendingWithdraw(data.data.pendingWithraw);
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

  const depositBDT = async (e, type) => {
    e.target.innerText = "please wait";
    try {
      const post = await axios.post(
        `${process.env.REACT_APP_API_URL}depositBDT`,
        {
          token: Cookies.get("token"),
          amount: amount,
          username: username,
          type: type,
        }
      );
      e.target.innerText = `${type} ${post.data}. do again`;
    } catch (error) {
      e.target.innerText = error.response.data;
    }
  };
  const setDepositBDT = (am) => {
    setAmount(am);
  };
  const setPrivateUsername = (user) => {
    setUsername(user);
  };
  useEffect(() => {
    getverify();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>

      <div className="pt-12 px-6">
        <div>
          <h2 className="text-1xl">BDT Deposit</h2>
        </div>
        <div className="flex gap-6 py-6">
          <input
            type="number"
            placeholder="Amount BDT"
            className="input input-bordered w-full max-w-xs"
            onKeyUp={(e) => setDepositBDT(e.target.value)}
          />
          <input
            type="text"
            placeholder="Private Username"
            className="input input-bordered w-full max-w-xs"
            onKeyUp={(e) => setPrivateUsername(e.target.value)}
          />
          <button
            onClick={(e) => depositBDT(e, "deposit")}
            className="btn btn-primary"
          >
            Deposit BDT
          </button>
          <button
            onClick={(e) => depositBDT(e, "withdraw")}
            className="btn btn-primary"
          >
            Withdraw BDT
          </button>
        </div>

        <div>
          <h2 className="text-1xl">Stats</h2>
        </div>
        <div className="flex gap-6 justify-around flex-col md:flex-row">
          <div className="flex flex-col gap-3 border-2 border-solid border-green-500 p-6 m-6">
            <span>Total players: {users}</span>
          </div>
          <div className="flex flex-col gap-3 border-2 border-solid border-green-500 p-6 m-6">
            <span>Pending withdraw: {pendingWithraw}</span>
          </div>
        </div>
        {verify.length > 0 && (
          <div>
            <h2 className="text-1xl">Withdraw Verification</h2>
          </div>
        )}
        <div className="flex gap-6 justify-center flex-col md:flex-row">
          {verify.length > 0 &&
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
