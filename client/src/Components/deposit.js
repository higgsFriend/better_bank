import React from 'react';
import {Card} from './context';
import '../App.css';

const { Context, minimumTransaction } = require("./context");

function Deposit() {
  const [depositAmount, setDepositAmount] = React.useState(null);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const { useEffect } = React;
  const ctx = React.useContext(Context);
  let user = ctx.currentUser;
  let userBalance = null;
  let userStatus = '';

  if (user.email != null) {
    userBalance = user.balance;
  }
  else {
    userStatus = 'Login required.';
  }

  const [status, setStatus] = React.useState(userStatus);
  const [balance, setBalance] = React.useState(userBalance);
  const [disableDepositAmount, setDisableDepsoitAmount] = React.useState(false);

  function handleDeposit() {
    if (depositAmount >= minimumTransaction) {
      let newBalance = parseFloat(balance) + parseFloat(depositAmount)
      
      // TODO: Better would be to use Context version of balance
      setBalance(newBalance);

      ctx.updateUser({balance:newBalance});

      setStatus('Transaction successful.');
    }
    else {
      const msg = 'transaction failed.';
      setStatus(msg);
    }
    setDisableSubmit(true);
    setDisableDepsoitAmount(true);

    setTimeout(() => {
      setStatus('');
      setDepositAmount(null);
      setDisableDepsoitAmount(false);
    }, 3000);

  }
  // Capture and validate updates to the entered balance
  useEffect(() => {
    if (user.email) {
      if (depositAmount < 0) {
        setStatus(`Positive values only (minimum is ${minimumTransaction})`);
        setDisableSubmit(true);
      }
      else if (depositAmount <= 0.0) {
        setStatus(`Minimum transaction of $ ${minimumTransaction}`);
        setDisableSubmit(true);
      }
      else if (depositAmount < minimumTransaction) {
        setStatus(`This transaction is doomed to fail because minimum amount is {minimumDeposit}!!`);
      }
      else {
        setStatus('');
        setDisableSubmit(false);
      }
    }
  }, [depositAmount]
  );

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={user.email != null ? (
        <>
          <div className='Balance'>
            <div className="1">Balance:</div>
            <div className="2">{"$ " + balance}</div>
          </div><br />
          {/* <input type="text" placeholder={"$ " + balance} readOnly></input> */}
          <br />
          Deposit amount: <br />
          <input readOnly={disableDepositAmount} type="number" placeholder="Minimum of 0.01" step="0.01" min="0.01" value={depositAmount} className="form-control" id="name" onChange={e => setDepositAmount(e.currentTarget.value)} /><br />
          <button disabled={disableSubmit} type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
      ) : ("")
      }
    />
  )
}

export default Deposit;