import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import styles from "./index.module.scss";
import AdminTable from "../../components/TableComponents/AdminTable";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

const AdminHome = () => {
  const [allPets, setAllPets] = useState([]);
  const history = useHistory();

  const fetchPets = async () => {
    try {
      const result = await axios("http://localhost:5000/pets", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return setAllPets(result.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRowClick = (id) => {
    history.push(`/admin/petProfile/${id}`);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchPets();
    }

    return () => {
      isMounted = false;
    };

  }, []);

 /* useEffect(() => {
      // POST request using axios inside useEffect React hook
      const article = { title: 'React Hooks POST Request Example' };
      axios.post('https://reqres.in/api/articles', article)
          .then(response => setArticleId(response.data.id));
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
   */

  return (
    <div className={styles.flexContainer}>
      <AdminNavbar />
      <div className={styles.main}>
        <h2>Pets for sale</h2>
        {allPets.length > 0 && (
          <AdminTable allPets={allPets} handleRowClick={handleRowClick} />
        )}
      </div>
    </div>
  );
};

export default AdminHome;
