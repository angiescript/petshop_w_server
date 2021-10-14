import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";

const AdminHome = () => {
  const [allPets, setAllPets] = useState([]);
  const [status, setStatus] = useState("available");

  const fetchPets = async (currentStatus) => {
    try {
      const result = await axios(
        "https://petstore3.swagger.io/api/v3/pet/findByStatus",
        {
          params: {
            status: currentStatus,
          },
        }
      );
      console.log(result);
      return setAllPets(result.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPets(status);
  }, [status]);

  return (
    <div>
      {console.log(allPets)}
      <h2>Admin Home Page</h2>
      <div className={styles.wrapper}>
        <div className={styles.tableView}> 
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Animal type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Views</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tobdy>
              {allPets.map((pet, index) => {
                return(
                  <tr key={index}>
                    <td>{pet.name}</td>
                    <td>2000</td>
                  </tr>
                )
              })}
            </tobdy>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
