import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import AdminNavbar from "../../components/Navbars/AdminNavbar";
import styles from "./index.module.scss";

const AdminPetProfile = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const fetchPet = async (id) => {
    try {
      const result = await axios(`http://localhost:5000/pets/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return setPet(result.data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updatePet = async (updatedPet) => {
    try {
      await axios
        .put(`http://localhost:5000/pets/${id}`, updatedPet)
        .then((response) => {
          setPet(response.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let petForm = e.target;
    let formData = new FormData(petForm);

    let updatedPet = {};

    for (let [key, value] of formData) {
      if (value) {
        updatedPet[key] = value;
      }
    }

    if (Object.keys(updatedPet).length === 0) {
      console.log("No changes were made.");
    } else {
      for (let pet_key in pet) {
        if (!(pet_key in updatedPet)) {
          updatedPet[pet_key] = pet[pet_key];
        }
      }
      updatePet(updatedPet);
      //Lägg till en "your data was saved"-pop up?
      history.push(`/admin/`);
    }

    //Om inget är ändrat, disable skicka
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchPet(id);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className={styles.flexContainer}>
      <AdminNavbar />
      <div className={styles.main}>
        <h2>Pets for sale</h2>
        <p>
          <span>Pets for sale /</span> {pet.pet_name}{" "}
        </p>

        <div className={styles.petInfo}>
          <div className={styles.petImage}>
            <img src={pet.img_url} alt={pet.pet_name} />
            <form></form>
          </div>

          <div className={styles.petDetails}>
            <form id="petForm" onSubmit={(e) => handleSubmit(e)}>
              <fieldset>
                <legend>Name</legend>
                <label htmlFor="name"></label>
                <input
                  type="text"
                  id="pet_name"
                  name="pet_name"
                  placeholder={pet.pet_name}
                ></input>
              </fieldset>
              <fieldset>
                <legend>Tagline</legend>
                <label htmlFor="tagline"></label>
                <input
                  type="text"
                  id="tag_line"
                  name="tag_line"
                  placeholder={pet.tag_line}
                ></input>
              </fieldset>
              <fieldset>
                <legend>Color</legend>
                <label htmlFor="color"></label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder={pet.color}
                ></input>
              </fieldset>
              <div className={styles.smallInputs}>
                <fieldset>
                  <legend>Breed</legend>
                  <label htmlFor="breed"></label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder={pet.breed}
                  ></input>
                </fieldset>
                <fieldset>
                  <legend>Age</legend>
                  <label htmlFor="age"></label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    placeholder={pet.age}
                  ></input>
                </fieldset>
                <fieldset>
                  <legend>Animal</legend>
                  <label htmlFor="animal"></label>
                  <input
                    type="text"
                    id="animal"
                    name="animal"
                    placeholder={pet.animal}
                  ></input>
                </fieldset>
                <fieldset>
                  <legend>Price</legend>
                  <label htmlFor="price"></label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder={pet.price}
                  ></input>
                </fieldset>
              </div>
              <fieldset>
                <legend>Description</legend>
                <label htmlFor="description"></label>
                <input
                  type="text"
                  id="description"
                  name="pet_description"
                  placeholder={pet.pet_description}
                ></input>
              </fieldset>
              <input type="submit" value="Send"></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPetProfile;
