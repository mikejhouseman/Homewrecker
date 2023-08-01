import React, { useRef, useEffect } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./AddSpotModal.css";
import CancelButton from "./CancelButton";

function AddSpotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const previewImageRef = useRef();

  const errorsRef = useRef({});

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const lat = latRef.current.value;
    const lng = lngRef.current.value;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const previewImage = previewImageRef.current.value;

    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };

    try {
      await dispatch(spotActions.addNewSpot(newSpot));
      closeModal();
      history.push(`/spots/${newSpot.id}`);
    } catch (err) {
      if (err.errors) {
        errorsRef.current = err.errors;
      }
    }
  };

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Add Spot</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Address
            <input type="text" ref={addressRef} required />
          </label>
          {errorsRef.current.address && <p>{errorsRef.current.address}</p>}
          <label>
            City
            <input type="text" ref={cityRef} required />
          </label>
          {errorsRef.current.city && <p>{errorsRef.current.city}</p>}
          <label>
            State
            <input type="text" ref={stateRef} required />
          </label>
          {errorsRef.current.state && <p>{errorsRef.current.state}</p>}
          <label>
            Country
            <input type="text" ref={countryRef} required />
          </label>
          {errorsRef.current.country && <p>{errorsRef.current.country}</p>}
          <label>
            Lat
            <input type="number" ref={latRef} required />
          </label>
          {errorsRef.current.lat && <p>{errorsRef.current.lat}</p>}
          <label>
            Lng
            <input type="number" ref={lngRef} required />
          </label>
          {errorsRef.current.lng && <p>{errorsRef.current.lng}</p>}
          <label>
            Name
            <input type="text" ref={nameRef} required />
          </label>
          {errorsRef.current.name && <p>{errorsRef.current.name}</p>}
          <label>
            Description
            <input type="text" ref={descriptionRef} required />
          </label>
          {errorsRef.current.description && <p>{errorsRef.current.description}</p>}
          <label>
            Price
            <input type="number" ref={priceRef} required />
          </label>
          {errorsRef.current.price && <p>{errorsRef.current.price}</p>}
          <label>
            Image
            <input type="text" ref={previewImageRef} required />
          </label>
          {errorsRef.current.previewImage && <p>{errorsRef.current.previewImage}</p>}
          <div className="button-container">
            <button type="submit">Submit Spot</button>
            <CancelButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSpotModal;
