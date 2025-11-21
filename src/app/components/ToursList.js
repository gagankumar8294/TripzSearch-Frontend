"use client";

import { useEffect, useState } from "react";
import styles from "./ToursList.module.css";
import Link from "next/link";

export default function ToursList() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch("https://tripzsearch-backend.onrender.com/api/tours");
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    }
    fetchTours();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Available Tours</h2>

      <div className={styles.grid}>
        {tours.map((tour) => (
          <div className={styles.card} key={tour._id}>
            
            <div className={styles.imageWrapper}>
              {tour.imageUrl ? (
                <img src={tour.imageUrl} alt={tour.title} />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
            </div>

            <div className={styles.info}>
              <h3>{tour.title}</h3>
              <p><strong>Destination:</strong> {tour.destination}</p>
              <p><strong>Price:</strong> ₹{tour.price}</p>
              <p><strong>Start Date:</strong> {tour.startDate}</p>
              <p><strong>Duration:</strong> {tour.duration} days</p>
            </div>

             <Link href={`/tours/${tour._id}`} className={styles.viewBtn}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
