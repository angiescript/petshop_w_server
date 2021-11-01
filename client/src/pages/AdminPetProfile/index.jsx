import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

import AdminNavbar from "../../components/Navbars/AdminNavbar";
import styles from "./index.module.scss";

Modal.setAppElement("#root");

const AdminPetProfile = () => {
  const [pet, setPet] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [photoHasChanged, setPhotoHasChanged] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formHasChanged, setFormHasChanged] = useState(false);

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
          console.log(response);
          setPet(response.data);

          if (response.status === 200) {
            setModalIsOpen(true);

            setTimeout(() => {
              setModalIsOpen(false);
              history.push(`/admin/`);
            }, 1500);
          }
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
    }
  };

  const handleFormChange = () => {
    setFormHasChanged(true);
  };

  const handlePhotoChange = (e) => {
    setPhotoHasChanged(true);
    const currentUrl = e.target.value;
    setImgUrl(currentUrl);
  };

  const addDefaultPic = (e) => {
    e.target.src =
      "https://media.istockphoto.com/photos/happy-border-collie-dog-and-tabby-cat-together-closeup-picture-id1138523235?k=20&m=1138523235&s=612x612&w=0&h=K6lpiSJBvyqtghCESa9YsbKYrsvRJnS4Po0Jr8djuIw=";
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

  /*   useEffect(() => {
    setImgUrl(pet.img_url)
  }, []) */

  return (
    <div className={styles.flexContainer}>
      <AdminNavbar />
      <div className={styles.main}>
        <h2>Pets for sale</h2>
        <div className={styles.petIntroduction}>
          <span>Pets for sale /</span> {pet.pet_name} <hr />
        </div>

        <div className={styles.petInfo}>
          <div className={styles.petImage}>
            <img
              src={photoHasChanged ? imgUrl : pet.img_url}
              alt="Pet Placeholder"
              onError={(e) => addDefaultPic(e)}
            />
          </div>

          <div className={styles.petDetails}>
            <form
              id="petForm"
              onSubmit={(e) => handleSubmit(e)}
              onChange={() => handleFormChange()}
            >
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

              <fieldset>
                <legend>Image URL</legend>
                <label htmlFor="img_url"></label>
                <input
                  type="text"
                  id="img_url"
                  name="img_url"
                  placeholder={pet.img_url}
                  value={imgUrl}
                  onChange={(e) => handlePhotoChange(e)}
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
              <fieldset className={styles.petDescription}>
                <legend>Description</legend>
                <label htmlFor="description"></label>
                <textarea
                  type="text"
                  id="description"
                  name="pet_description"
                  placeholder={pet.pet_description}
                  rows="14"
                  cols="60"
                ></textarea>
              </fieldset>
              <fieldset className={styles.submitButton}>
                <input
                  type="submit"
                  value="Update pet"
                  className={
                    formHasChanged
                      ? `${styles.formHasChanged}`
                      : `${styles.formHasNotChanged}`
                  }
                ></input>
              </fieldset>
            </form>
          </div>
          <Modal
            isOpen={modalIsOpen}
            style={{
              content: {
                width: "500px",
                height: "100px",
                margin: "auto",
                backgroundColor: "#9AE6B4",
              },
            }}
          >
            <h2>Your update has been saved successfully.</h2>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminPetProfile;
