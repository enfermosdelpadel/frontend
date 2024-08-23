import React from "react";
import Layout from "../../Components/Layout";

function MyAccount() {
  const user = {
    name: "John Doe",
    address: "123 Main St",
    phone: "555-1234"
  };

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4">User Information</h1>
        <figure className="p-2">
          <img src="/avatar.svg" alt="" />
        </figure>
        <p className="mb-2">Name: {user.name}</p>
        <p className="mb-2">Address: {user.address}</p>
        <p className="mb-2">Phone: {user.phone}</p>
      </div>
    </Layout>
  );
}

export default MyAccount;