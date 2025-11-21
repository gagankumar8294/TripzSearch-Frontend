import styles from "./TourDetails.module.css";

async function fetchTour(id) {
  const res = await fetch(`https://tripzsearch-backend.onrender.com/api/tours/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function TourDetails({ params }) {
  const tour = await fetchTour(params.id);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {tour.imageUrl ? (
            <img src={tour.imageUrl} alt={tour.title} />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
        </div>

        <div className={styles.info}>
          <h1>{tour.title}</h1>

          <p><strong>Destination:</strong> {tour.destination}</p>
          <p><strong>Price:</strong> ₹{tour.price}</p>
          <p><strong>Start Date:</strong> {tour.startDate}</p>
          <p><strong>Duration:</strong> {tour.duration} days</p>

          <button className={styles.backBtn} onClick={() => history.back()}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
