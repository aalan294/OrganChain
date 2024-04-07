import React, { useEffect, useState } from "react";
import Web3 from "web3";
import json from '../OrganChain.json';
import { useNavigate } from "react-router-dom";

const Donor = ({ contract }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [organs, setOrgans] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user's address from local storage
    const storedUser = localStorage.getItem('OrganChain');
    if (!storedUser) {
      navigate('/');
    } else {
      setCurrentUser(JSON.parse(storedUser).address);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        if (!currentUser) return; // Ensure currentUser is initialized
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(json.abi, contract);
        const organIds = await contractInstance.methods.getOrganId(currentUser).call();
        const organData = [];
        for (const id of organIds) {
          const organ = await contractInstance.methods.organs(id).call();
          // Convert BigInt values to string or number, as needed
          organ.timestamp = Number(organ.timestamp); // Convert timestamp to number
          // Add more conversion logic as needed for other fields
          organData.push(organ);
        }
        setOrgans(organData);
      } catch (error) {
        console.error("Error fetching organs:", error);
        alert(error.message);
      }
    };
    fetchOrgans();
  }, [contract, currentUser]);


  const toggleVisibility = (id) => {
    setSelected(id);
  };

  return (
    <div className="h-screen bg-primary flex">
      <div>
        <h3>Tokens-1</h3>
        <h2 className="text-4xl text-white p-10">Organs</h2>
        <div className="ml-10 gap-2">
          {organs && organs.map((item, index) => (
            <button
              onClick={() => toggleVisibility(item.id)}
              className="p-5 m-5 w-96 bg-main rounded-xl text-xl active:bg-white"
              key={index}
            >
              {item.organType}
            </button>
          ))}
        </div>
      </div>
      <div className="border-2 border-main h-3/4 w-3/4 ml-10 mr-24 rounded-xl bg-main">
        {organs.map((item) => {
          if (item.id === selected) {
            const date = new Date(item.timestamp * 1000);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            console.log(item)
            return (
              <div className="" key={item.id}>
                <div>Organ Name : {item.organType}</div>
                <div>Donor Address : {item.donor}</div>
                <div>Donated Date : {`${day}/${month}/${year}`}</div>
                <div>OrganId: {Number(item.id)}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Donor;
