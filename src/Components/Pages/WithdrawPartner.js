import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const WithdrawPartner = () => {
  const [history, setHistory] = useState(false);
  const [totalPages, setTotalPages] = useState([0]);
  // const [type, setType] = useState("all");
  const getStatusMethod = (sts) => {
    if (sts === "Processing") {
      return `<span class="badge badge-warning">Sending</span>`;
    } else if (sts === "finished") {
      return `<span class="badge badge-primary">Completed</span>`;
    } else if (sts === "failed") {
      return `<span class="badge badge-secondary">Failed</span>`;
    } else {
      return `<span class="badge badge-info">Processing</span>`;
    }
  };
  const getTimeMethod = (backTime) => {
    const oldDate = new Date(backTime);
    const currentTime = new Date();
    const Difference_In_Time = currentTime.getTime() - oldDate.getTime();
    let days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    if (days === 0) {
      days = `Today`;
    } else if (days < 2) {
      days = `${days} day ago`;
    } else {
      days = `${days} days ago`;
    }
    return days;
  };
  const historyMethod = (page = 0, type = "all") => {
    axios
      .post(`${process.env.REACT_APP_API_URL}partner-withdraw`, {
        token: Cookies.get("token"),
        page: page,
        type: type,
      })
      .then((data) => {
        setHistory(data.data.data);
        setTotalPages(data.data.totalPages);
      })
      .catch(() => {
        setHistory(false);
      });
  };
  const setPageNumber = (index, e) => {
    setHistory(false);
    const pagesBtn = document.querySelectorAll(".pagebtns");
    let counter = 0;
    pagesBtn.forEach((btn) => {
      if (btn.classList.contains("bg-green-500")) {
        counter++;
        btn.classList.remove("bg-green-500", "text-black");
        if (index === "next") {
          index = parseInt(btn.innerText);

          if (index < pagesBtn.length) {
            setTimeout(() => {
              pagesBtn[index].classList.add("bg-green-500", "text-black");
            }, 10);
          }
          if (index === pagesBtn.length) {
            index = 0;
            pagesBtn[index].classList.add("bg-green-500", "text-black");
          }
        }
        if (index === "back") {
          index = parseInt(btn.innerText) - 2;

          if (index >= 0) {
            setTimeout(() => {
              pagesBtn[index].classList.add("bg-green-500", "text-black");
            }, 10);
          }
          if (index < 0) {
            index = pagesBtn.length - 1;
            setTimeout(() => {
              pagesBtn[index].classList.add("bg-green-500", "text-black");
            }, 10);
          }
        }
      }
    });

    if (counter === 0 && (index === "next" || index === "back")) {
      if (index === "next") {
        index = 0;
      } else {
        index = pagesBtn.length - 1;
      }
      pagesBtn[index].classList.add("bg-green-500", "text-black");
    }

    if (!e.target.classList.contains("bg-green-500")) {
      e.target.classList.add("bg-green-500", "text-black");
    }

    historyMethod(index);
  };

  const filter = (type, e) => {
    setHistory(false);
    const butttons = document.querySelectorAll("button");
    butttons.forEach((btn) => {
      if (!btn.classList.contains("btn-outline")) {
        btn.classList.add("btn-outline");
      }
    });
    e.target.classList.remove("btn-outline");
    // setType(type);
    historyMethod(0, type);
  };

  const sendAllPayments = async (e) => {
    e.target.innerText = "Processsing...";
    try {
      const processData = await axios.post(
        `${process.env.REACT_APP_API_URL}sendAllPartnerPayments`,
        {
          token: Cookies.get("token"),
        }
      );
      e.target.innerText = "Send All Payments";
      toast.success(`${processData.data.message}`, { theme: "dark" });
      setHistory(false);
      historyMethod();
    } catch (error) {
      e.target.innerText = "Send All Payments";
      if (error.status === 403) {
        toast.error(
          `${error.response.data.message} -> Code: ${error.response.data.data}`,
          { theme: "dark" }
        );
      } else {
        toast.error(error.response.data.message, { theme: "dark" });
      }
    }
  };

  useEffect(() => {
    historyMethod();
  }, []);
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="py-6">
        <h2 className="text-center py-6">User Withdrawals</h2>
        <div className="flex justify-between p-6 gap-6">
          <div className="flex gap-6">
            <button
              onClick={(e) => {
                filter("all", e);
              }}
              className="btn btn-primary"
            >
              All
            </button>
            <button
              onClick={(e) => {
                filter("finished", e);
              }}
              className="btn btn-success btn-outline"
            >
              Completed
            </button>
            <button
              onClick={(e) => {
                filter("in progress", e);
              }}
              className="btn btn-info btn-outline"
            >
              In Progress
            </button>
            <button
              onClick={(e) => {
                filter("failed", e);
              }}
              className="btn btn-error btn-outline"
            >
              Failed
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                sendAllPayments(e);
              }}
              className="btn btn-error btn-outline"
            >
              Send All Payments
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Receiving</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Time</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {history ? (
                history.map((his, index) => (
                  <tr key={index}>
                    <td>{his.account}</td>
                    <td>{his.amount.$numberDecimal}</td>
                    <td>{his.payoutCurrency.toUpperCase()}</td>
                    <td>{getTimeMethod(his.updatedAt)}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: getStatusMethod(his.status),
                      }}
                    />
                  </tr>
                ))
              ) : (
                <>
                  <tr className="absolute left-[45%]">
                    <td>
                      <span className="loading loading-bars loading-lg"></span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Receiving</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Time</th>
                <th>status</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="join flex-wrap">
          <button
            onClick={(e) => {
              setPageNumber("back", e);
            }}
            className="join-item btn btn-outline"
          >
            Previous
          </button>
          {totalPages &&
            totalPages.map((page, index) => (
              <div
                key={index}
                onClick={(e) => {
                  setPageNumber(index, e);
                }}
                className="join-item btn btn-outline pagebtns"
              >
                {page}
              </div>
            ))}

          <button
            onClick={(e) => {
              setPageNumber("next", e);
            }}
            className="join-item btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default WithdrawPartner;
