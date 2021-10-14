import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";

const AdminHome = () => {
  const [allPets, setAllPets] = useState([]);
 
  const fetchPets = async () => {
    try {
      const result = await axios (
        "http://localhost:5000/pets",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(result.data);
      return setAllPets(result.data);

    } catch (err) {
      console.error(err.message);
    }
  };

  /* useEffect(() => {
    // POST request using axios inside useEffect React hook
    const article = { title: 'React Hooks POST Request Example' };
    axios.post('https://reqres.in/api/articles', article)
        .then(response => setArticleId(response.data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
 */
  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Admin Home Page</h2>
      <div className={styles.wrapper}>
        <div className={styles.tableView}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Animal type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tbody>
              { allPets.map((pet, index) => {
                  return (
                    <tr key={index}>
                      <td>{pet.img_url}</td>
                      <td>{pet.pet_name}</td>
                      <td>{pet.animal}</td>
                      <td>{pet.price}</td>
                      <td>{pet.purchase_status}</td>
                      <td>Posted</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
