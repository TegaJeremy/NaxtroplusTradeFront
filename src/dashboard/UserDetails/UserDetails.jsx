import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './UserDetails.css'

function UserDetails() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          "https://naxtrotradebackup.onrender.com/getAllUsers"
        );
        console.log(response);
        setUsers(response.data);
      } catch (err) {
        toast.error(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);
  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead className="transaction-table-head">
          <tr className="transaction-table-row">
            <th className="transaction-table-th">Name</th>
            <th className="transaction-table-th">Email</th>
            {/* <th className="transaction-table-th">Occupation</th> */}
            {/* <th className="transaction-table-th">id</th> */}
            <th className="transaction-table-th">View</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => (
            <tr className="transaction-table-row" key={index}>
              <td className="transaction-table-data">{user.firstName}</td>
              <td
                className="transaction-table-data"
                style={{
                  fontSize: "1rem",
                }}
              >
                {user.email}
              </td>

              {/* <td className="transaction-table-data">{user._id}</td> */}
              <td
                className="transaction-table-data"
                style={{
                  padding: "0.1rem",
                  textAlign: "center",
                }}
              >
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  key={`modal_button_${index}`}
                  className="btn btn-[white] rounded-none text-[blue]"
                  onClick={() =>
                    document.getElementById(`my_modal_${index}`).showModal()
                  }
                >
                  view
                </button>
                <dialog
                  key={`modal_dialog_${index}`}
                  id={`my_modal_${index}`}
                  className="dialog"
                >
                    <h3><span>Name: </span> {user.firstName} {user.lastName}</h3>
                    <p><span>Email:</span> {user.email}</p>
                    <p><span>Id:</span> {user._id}</p>
                    <p><span>Address:</span> {user.address}</p>
                    <p><span>Mobile Number:</span> {user.mobile}</p>
                    <p><span>Account Balance :</span> {user.accountBalance} USD</p>
                    <p><span>Deposit Wallet:</span> {user.depositWallet} USD</p>
                    <p><span>Referral Wallet:</span> {user.referalWallet} USD</p>
                    <p><span>Interest Wallet:</span> {user.intrestWallet} USD</p>
                    <p><span>Verified:</span> {user.isVerified ? "true" : "false"}</p>
                    <p><span>Created:</span> {new Date(user.createdAt).toDateString()}{" "}</p>
                    <form method="dialog">
                      <button className="dialog_btn cancel">
                        ✕
                      </button>
                    </form> 
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
