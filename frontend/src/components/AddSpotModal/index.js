// frontend/src/components/AddSpotModal/index.js
import React, { useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddSpotModal.css";

function AddSpotModal() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const handleCancel = () => {
  //   handleReset();
  //   closeModal();
  // };

  // const handleReset = () => {
  //   setAddress("");
  //   setCity("");
  //   setState("");
  //   setCountry("");
  //   setLat("");
  //   setLng("");
  //   setName("");
  //   setDescription("");
  //   setPrice("");
  //   setPreviewImage("");
  //   setErrors({});
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotActions.addNewSpot({ address, city, state, country, lat, lng, name, description, price, previewImage }))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
      <h1>Add Spot</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {errors.address && ( <p>{errors.address}</p>)}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && ( <p>{errors.city}</p>)}
        <label>
          State
          <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required />
        </label>
        {errors.state && ( <p>{errors.state}</p>)}
        <label>
          Country
          <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required />
        </label>
        {errors.country && ( <p>{errors.country}</p>)}
        <label>
          Latitude
          <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required />
        </label>
        {errors.lat && ( <p>{errors.lat}</p>)}
        <label>
          Longitude
          <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required />
        </label>
        {errors.lng && ( <p>{errors.lng}</p>)}
        <label>
          Name
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />
        </label>
        {errors.name && ( <p>{errors.name}</p>)}
        <label>
          Description
          <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required />
        </label>
        {errors.description && ( <p>{errors.description}</p>)}
        <label>
          Price
          <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required />
        </label>
        {errors.price && ( <p>{errors.price}</p>)}
        <label>
          Preview Image
          <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required />
        </label>
        <div className="button-container">
          <button type="submit">Submit Spot</button>
          <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSpotModal;
