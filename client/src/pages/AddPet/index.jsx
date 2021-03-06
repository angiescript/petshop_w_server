import React, { useState } from "react";
import { useHistory } from "react-router";
import Modal from "react-modal";
import axios from "axios";

import AdminNavbar from "../../components/Navbars/AdminNavbar";
import styles from "./index.module.scss";

Modal.setAppElement("#root");

const AddPet = () => {
  const [status, setStatus] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const history = useHistory();

  const addPet = async (pet) => {
    try {
      await axios
        .post(`http://localhost:5000/pets`, pet, {
          headers: { "content-type": "application/json" },
        })
        .then((response) => {
          if (response.status !== 200) {
            console.log("Something went wrong!");
          } else {
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

    const petData = new FormData(e.target);
    const body = {};

    for (let [key, value] of petData) {
      if (value === "") {
        switch (key) {
          case "age":
            value = 0;
            break;

          case "price":
            value = 0;
            break;

          case "img_url":
            value =
              "https://media.istockphoto.com/photos/happy-border-collie-dog-and-tabby-cat-together-closeup-picture-id1138523235?k=20&m=1138523235&s=612x612&w=0&h=K6lpiSJBvyqtghCESa9YsbKYrsvRJnS4Po0Jr8djuIw=";
            break;

          default:
            value = "Unknown";
            break;
        }
      }

      body[key] = value;
    }

    body["purchase_status"] = "Available";

    addPet(body);
  };

  const handleChange = (e) => {
    const name = e.target.value;

    if (name.trim() === "") {
      return setStatus("Name is required");
    }

    if (name.trim().length < 3) {
      return setStatus("Name needs to be at least three characters");
    } else {
      setStatus("");
    }

    return null;
  };

  const handleImgUrl = (e) => {
    const currentUrl = e.target.value;
    setImgUrl(currentUrl);
  };

  const addDefaultPic = (e) => {
    e.target.src =
      "https://media.istockphoto.com/photos/happy-border-collie-dog-and-tabby-cat-together-closeup-picture-id1138523235?k=20&m=1138523235&s=612x612&w=0&h=K6lpiSJBvyqtghCESa9YsbKYrsvRJnS4Po0Jr8djuIw=";
  };

  return (
    <div className={styles.flexContainer}>
      <AdminNavbar />
      <div className={styles.main}>
        <h2>Add pet</h2>
        <div className={styles.petIntroduction}>
          <span>Add Pet /</span> New Pet <hr />
        </div>

        <div className={styles.petInfo}>
          <div className={styles.petImage}>
            <img
              src={imgUrl}
              alt="Pet Placeholder"
              onError={(e) => addDefaultPic(e)}
            />
          </div>

          <div className={styles.petDetails}>
            <form id="petForm" onSubmit={(e) => handleSubmit(e)}>
              <fieldset>
                <label htmlFor="name"></label>
                <input
                  type="text"
                  id="pet_name"
                  name="pet_name"
                  placeholder="Name"
                  required
                  onChange={(e) => handleChange(e)}
                ></input>
              </fieldset>
              {status.length > 0 ? (
                <p className={styles.validation}>{status}</p>
              ) : (
                <p></p>
              )}
              <fieldset>
                <label htmlFor="tagline"></label>
                <input
                  type="text"
                  id="tag_line"
                  name="tag_line"
                  placeholder="Tagline"
                  maxLength="60"
                ></input>
              </fieldset>
              <fieldset>
                <label htmlFor="color"></label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="Color"
                ></input>
              </fieldset>

              <fieldset>
                <label htmlFor="img_url"></label>
                <input
                  type="text"
                  id="img_url"
                  name="img_url"
                  placeholder="Image URL"
                  value={imgUrl}
                  onChange={(e) => handleImgUrl(e)}
                ></input>
              </fieldset>

              <div className={styles.smallInputs}>
                <fieldset>
                  <label htmlFor="breed"></label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    placeholder="Breed"
                  ></input>
                </fieldset>
                <fieldset>
                  <label htmlFor="age"></label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                  ></input>
                </fieldset>
                <fieldset>
                  <label htmlFor="animal"></label>
                  <input
                    type="text"
                    id="animal"
                    name="animal"
                    placeholder="Animal"
                  ></input>
                </fieldset>
                <fieldset>
                  <label htmlFor="price"></label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                  ></input>
                </fieldset>
              </div>
              <fieldset className={styles.petDescription}>
                <label htmlFor="description"></label>
                <textarea
                  type="text"
                  id="description"
                  name="pet_description"
                  placeholder="Description"
                  rows="14"
                  cols="60"
                ></textarea>
              </fieldset>
              <fieldset className={styles.submitButton}>
                <input type="submit" value="Add pet"></input>
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
            <h2>Done!</h2>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
