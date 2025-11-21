import styles from "./ToursDetails.module.css";


async function fetchTour(id) {
  const res = await fetch(`https://tripzsearch-backend.onrender.com/api/tours/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function TourDetails({ params }) {
  
  const { id } = await params
    const tour = await fetchTour(id);

  if (!tour) {
    return <h1>Tour Not Found</h1>;
  }

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

          {/* <button className={styles.backBtn} onClick={() => history.back()}>
            ← Back
          </button> */}
        </div>
      </div>
    </div>
  );
}
