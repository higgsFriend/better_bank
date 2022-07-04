import React from 'react';
import { Table } from 'react-bootstrap';
import { Context } from "./context";


function AllData() {

  const ctx = React.useContext(Context);
  ctx.setUpdateRequired(true);

  ctx.userList.map((user) => {
    console.log(`${JSON.stringify(user)}`);
  });

  return (
    <>
      <h5>All Data in Store</h5>
      <Table striped bordered hover>
        <thead>
          <tr key={1}>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {
            ctx.userList.map((user) => {
              return(
              <>
                <tr>
                  <td key={user.email}>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.balance}</td>
                </tr>
              </>)
            })
          }
        </tbody>
      </Table>
    </>
  );
}

export default AllData;