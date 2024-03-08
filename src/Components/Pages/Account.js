import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import usdttrc20 from "../../images/usdttrc20.svg";
import trx from "../../images/trx.svg";
import dai from "../../images/dai.svg";
import sol from "../../images/sol.svg";
const Account = () => {
  const [balances, setBalances] = useState([]);
  const [totalUsdBalance, setTotalUsdBalance] = useState([]);
  const [withdrawn, setWtihdrawn] = useState(0);
  const [partners, setPartners] = useState(0);
  const [partnerId, setPartnerId] = useState(0);

  const [promo, setPromo] = useState(0);

  const currencyImage = {
    usdttrc20: usdttrc20,
    sol: sol,
    dai: dai,
    trx: trx,
  };

  const getBalance = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}balance`, {
        token: Cookies.get("token"),
      })
      .then((data) => {
        setBalances(data.data.data);
        setPartners(data.data.partners);
        setWtihdrawn(data.data.withdrawn);
        setPartnerId(data.data.partnerId);
        setPromo(data.data.promo);
        setTotalUsdBalance(data.data.totalUsd);
      })
      .catch((error) => {
        console.log(error);
        setBalances([]);
      });
  };
  useEffect(() => {
    if (Cookies.get("token")) {
      getBalance();
    }
  }, []);

  const copy = (e) => {
    const addressBox = document.getElementById("addressBox");

    if (navigator.clipboard.writeText(addressBox.childNodes[0].innerText)) {
      addressBox.childNodes[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-400">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
    `;
      setTimeout(() => {
        addressBox.childNodes[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
    `;
      }, 5000);
    }
  };
  return (
    <>
      <div className="pt-12">
        <div className="flex gap-6 justify-center flex-col md:flex-row">
          <div className="space-y-6 mx-auto">
            <h4>My Commisssion</h4>
            {balances.length === 0 ? (
              <div className="badge badge-primary">Balance: 00</div>
            ) : (
              <>
                <div
                  className="min-w-64 right-0 p-3 top-10 bg-gradient-to-r from-indigo-300 text-black rounded"
                  id="btnm"
                >
                  {Object.entries(balances).map(([currency, amount]) => (
                    <div
                      className="p-3 flex gap-2 justify-between "
                      key={currency}
                    >
                      <span> {currency.toUpperCase()}: </span>
                      <div className="flex gap-1 items-center">
                        <span
                          className={
                            amount?.$numberDecimal
                              ? amount?.$numberDecimal > 0
                                ? "text-green-500"
                                : "text-red-500"
                              : amount > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {amount?.$numberDecimal
                            ? parseFloat(amount.$numberDecimal).toFixed(8)
                            : parseFloat(amount).toFixed(8)}
                        </span>
                        <img class="w-4 h-4" src={currencyImage[currency]} />
                      </div>
                    </div>
                  ))}
                  <div className="p-3 flex gap-2 justify-between ">
                    <span> Total In USD (PNL): </span>
                    <span
                      className={
                        totalUsdBalance > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {totalUsdBalance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="stats shadow mx-auto">
            <div className="stat place-items-center">
              <div className="stat-title">Players</div>
              <div className="stat-value">{partners}</div>
              <div className="stat-desc">All time</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Withdrawn</div>
              <div className="stat-value text-secondary">{withdrawn}</div>
              <div className="stat-desc">All time</div>
            </div>
          </div>
        </div>
        <div className="mockup-code text-white m-6">
          <div className="p-4 space-y-3">
            <div>
              <code>Affiliate Details!</code>
            </div>
            <div>
              <code>
                <div id="addressBox" className="flex " onClick={copy}>
                  <p
                    id="address"
                    className="overflow-ellipsis overflow-hidden  mr-2 text-xs sm:text-base"
                  >
                    Link: https://cryptocrash.win/play/{partnerId}{" "}
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </p>
                </div>
              </code>
            </div>
            <div>
              <code>Promo: {promo}</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
