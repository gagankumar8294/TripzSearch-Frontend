"use client";

import { useState } from "react";
import styles from "./AddTour.module.css";

export default function AddTour() {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    startDate: "",
    duration: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("https://tripzsearch-backend.onrender.com/api/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMsg("Failed to add tour");
        setLoading(false);
        return;
      }

      setMsg("Tour added successfully!");

      // Clear form
      setForm({
        title: "",
        destination: "",
        price: "",
        startDate: "",
        duration: "",
        imageUrl: "",
      });

    } catch (error) {
      console.error(error);
      setMsg("Error occurred");
    }

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Tour</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="startDate"
          placeholder="Start Date"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          name="duration"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Adding..." : "Add Tour"}
        </button>

      </form>

      {msg && <p className={styles.message}>{msg}</p>}
    </div>
  );
}
