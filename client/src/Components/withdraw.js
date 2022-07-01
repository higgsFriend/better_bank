import React from 'react';
import {Card} from './context';
import '../App.css';

const { Context, minimumTransaction } = require("./context");

function Withdraw() {

  const [withdrawAmount, setwithdrawAmount] = React.useState(null);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  const { useEffect } = React;
  const ctx = React.useContext(Context);
  let user = ctx.currentUser;

  let userBalance = null;
  let userStatus = '';
  if (user.email) {
    userBalance = user.balance;
  }
  else {
    userStatus = 'Login required.';
  }
  const [status, setStatus] = React.useState(userStatus);
  const [balance, setBalance] = React.useState(userBalance);
  const [disableWithdrawAmount, setDisableWithdrawAmount] = React.useState(false);

  function handleWithdraw() {
    if (withdrawAmount <= balance) {
      let newBalance = parseFloat(balance) - parseFloat(withdrawAmount)
      setBalance(newBalance);
      setStatus('Transaction successful.');

      // TODO: Update balance in DB
      ctx.updateUser({balance:newBalance});
      
    }
    else {
      const msg = 'transaction failed.';

      setStatus(msg);
    }
    setDisableSubmit(true);
    setDisableWithdrawAmount(true);

    setTimeout(() => {
      setStatus('');
      setwithdrawAmount(null);
      setDisableWithdrawAmount(false);
    }, 3000);

  }
  // Capture and validate updates to the entered balance
  useEffect(() => {
    if (user.email) {
      if (withdrawAmount < 0) {
        setStatus(`Positive values only (minimum is ${minimumTransaction})`);
        setDisableSubmit(true);
      }
      else if (withdrawAmount <= 0.0) {
        setStatus(`Minimum transaction of $ ${minimumTransaction}`);
        setDisableSubmit(true);
      }
      else if (withdrawAmount > balance) {
        setStatus('This transaction is doomed to fail because you do not have enough money!!');
      }
      else {
        setStatus('');
        setDisableSubmit(false);
      }
    }
  }, [withdrawAmount]
  );
  return (

    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={user.email ? (
        <>
          <div className='Balance'>
            <div className="1">Balance:</div>
            <div className="2">{"$ " + balance}</div>
          </div><br />
          {/* <input type="text" placeholder={"$ " + balance} readOnly></input> */}
          <br />
          Withdraw amount: <br />
          <input readOnly={disableWithdrawAmount} type="number" placeholder="Minimum of 0.01" step="0.01" min="0.01" value={withdrawAmount} className="form-control" id="name" onChange={e => setwithdrawAmount(e.currentTarget.value)} /><br />
          <button disabled={disableSubmit} type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
        </>
      ) : ("")
      }
    />


  )
}

export default Withdraw;