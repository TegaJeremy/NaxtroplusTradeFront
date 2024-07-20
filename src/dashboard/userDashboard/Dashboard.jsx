import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./DashboardMedia.css";
import {
  CryptoCurrencyMarket,
  EconomicCalendar,
  StockMarket,
  SymbolOverview,
} from "react-ts-tradingview-widget";
import CheckVerifications from "./CheckVerifications";
import { FaCoins, FaWallet } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { expireSession } from "../../Redux/State";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [lastestTransaction, setlastestTransaction] = useState({});
  const { id } = useSelector((state) => state.BTC.user);

  async function getTotalDeposit() {
    try {
      const response = await axios.get(
        `https://naxtrotradebackup.onrender.com/getTotalDeposit/${id}`
      );
      console.log(response);
      setTotalDeposit(response?.data?.totalDeposit);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  async function getTotalWithdrawal() {
    try {
      const response = await axios.get(
        `https://naxtrotradebackup.onrender.com/getTotalWithdraw/${id}`
      );
      console.log(response);
      setTotalWithdrawal(response?.data?.totalWithdraw);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  async function getLatestTransaction() {
    try {
      const response = await axios.get(
        `https://naxtrotradebackup.onrender.com/getLatestTransaction/${id}`
      );
      console.log(response);
      setlastestTransaction(response.data?.data);
      console.log(lastestTransaction);
    } catch (err) {
      console.log(err);
      if (err?.message === " Network Error") {
        toast.error("Bad Internet Connection");
      } else if (err?.response?.data?.message === "jwt expired") {
        nav("/login");
        dispatch(expireSession(true));
      } else {
        toast.error(err?.response?.data?.message);
      }
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    getTotalDeposit();
    getTotalWithdrawal();
    getLatestTransaction();
  }, []);

  return (
    <div className="dashboard-content-container">
      <div className="dashboard-content-body">
        <CheckVerifications />
        <>
          <div className="dashboard-coin-card-container">
            <div className="dashboard-coin-balance-body">
              <SymbolOverview width="100%" colorTheme="dark" />
            </div>
          </div>
          <div className="dashboard-balance-and-profit-holder">
            <div className="dashboard-coin-balance-card-up">
                <div className="dashboard-total-deposit-wrapper-up-wrapper">
                  <span className="dashboard-total-deposit-wrapper-up-wrapper-icon-holder">
                    <FaWallet className="dashboard-total-deposit-wrapper-up-wrapper-icon" />
                  </span>
                  <div className="dashboard-total-deposit-wrapper-up-wrapper-title">
                    <h3 className="dashboard-total-deposit-wrapper-up-wrapper-title-h3">
                      Total Deposit Balance
                    </h3>
                    <h2 className="dashboard-total-deposit-wrapper-up-wrapper-title-amount">
                      {totalDeposit || "N/A"} USD
                    </h2>
                  </div>
                </div>
            </div>
            <div className="dashboard-coin-balance-card-down">
                <div className="dashboard-total-deposit-wrapper-down-wrapper">
                  <span className="dashboard-total-deposit-wrapper-down-wrapper-icon-holder">
                    <FaCoins className="dashboard-total-deposit-wrapper-down-wrapper-icon" />
                  </span>
                  <div className="dashboard-total-deposit-wrapper-down-wrapper-title">
                    <h3 className="dashboard-total-deposit-wrapper-down-wrapper-title-h3">
                      Total Withdraw
                    </h3>
                    <h2 className="dashboard-total-deposit-wrapper-down-wrapper-title-amount">
                      {totalWithdrawal || "N/A"} USD
                    </h2>
                  </div>
                </div>
            </div>
          </div>
          <div className="dashboard_plan">
            <h3>Start a plan :</h3>
            <div className="the_plans">
              <div className="plans" onClick={()=>nav("/investment")}>Starter Plan</div>
              <div className="plans" onClick={()=>nav("/investment")}>Premium Plan</div>
              <div className="plans" onClick={()=>nav("/investment")}>Enterprise Plan</div>
              <div className="plans" onClick={()=>nav("/investment")}>Pro Plan</div>
              <div className="plans" onClick={()=>nav("/investment")}>Ultimate Plan</div>
            </div>
          </div>
          <div className="dashboard_stock_widget">
            <StockMarket width="100%" colorTheme="dark" />
          </div>
          <div className="dashboard-recent-transaction-investment-container">
            <div className="dashboard-recent-investment">
              <div className="dashboard-recent-investment-body">
                <h5 className="dashboard-recent-investment-card-title">
                  Latest Transaction
                </h5>
              </div>

              {!loading ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <span>Please wait...</span>
                  <BounceLoader size={120} color="orangered" />
                </div>
              ) : lastestTransaction?.length === null ? (
                <p
                  style={{
                    color: "orangered",
                    fontSize: "1.2rem",
                    textAlign: "center",
                  }}
                >
                  No transaction yet
                </p>
              ) : (
                <div className="table-container">
                  <table className="transaction-table">
                    <thead className="transaction-table-head">
                      <tr className="transaction-table-row">
                        <th className="transaction-table-th">Id</th>
                        <th className="transaction-table-th">Amount</th>
                        <th className="transaction-table-th">Date</th>
                        <th className="transaction-table-th">Type</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="transaction-table-row">
                        <td className="transaction-table-data">
                          {lastestTransaction?.ID
                            ? lastestTransaction.ID
                            : "N/A"}
                        </td>
                        <td className="transaction-table-data">
                          {lastestTransaction?.amount}
                        </td>
                        <td className="transaction-table-data">
                          {new Date(
                            lastestTransaction?.timestamp
                          ).toLocaleDateString()}
                        </td>
                        <td className="transaction-table-data">
                          {lastestTransaction?.type}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <div className="dashboard_stock_widget">
            <CryptoCurrencyMarket width="100%" colorTheme="dark" />
          </div>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
