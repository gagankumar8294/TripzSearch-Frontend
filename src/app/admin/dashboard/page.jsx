"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editTour, setEditTour] = useState(null);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    startDate: "",
    duration: "",
    imageUrl: "",
  });

  // ------------------------------
  // 🔐 CHECK AUTH + FETCH TOURS
  // ------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchTours();
  }, []);

  // ------------------------------
  // 📌 Fetch All Tours
  // ------------------------------
  async function fetchTours() {
    setLoading(true);
    const res = await fetch("https://tripzsearch-backend.onrender.com/api/tours");
    const data = await res.json();
    setTours(data);
    setLoading(false);
  }

  // ------------------------------
  // ✏ Open Edit Modal
  // ------------------------------
  function openEdit(tour) {
    setEditTour(tour);
    setForm({
      title: tour.title,
      destination: tour.destination,
      price: tour.price,
      startDate: tour.startDate,
      duration: tour.duration,
      imageUrl: tour.imageUrl || "",
    });
  }

  // ------------------------------
  // 🔄 UPDATE TOUR (PUT)
  // ------------------------------
  async function handleUpdate() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://tripzsearch-backend.onrender.com/api/tours/${editTour._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Update Error:", data);
        alert(data.message || "Failed to update");
        return;
      }

      alert("Updated Successfully!");
      setEditTour(null);
      fetchTours();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  // ------------------------------
  // 🗑 DELETE TOUR
  // ------------------------------
  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://tripzsearch-backend.onrender.com/api/tours/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Delete Error:", data);
        alert(data.message || "Failed to delete");
        return;
      }

      alert("Deleted Successfully!");
      fetchTours();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (loading) return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1>Admin Panel – All Tours</h1>

      {/* -------------------------- */}
      {/* TOUR LIST */}
      {/* -------------------------- */}
      <div style={styles.grid}>
        {tours.map((tour) => (
          <div key={tour._id} style={styles.card}>
            <img
              src={tour.imageUrl || "/default.jpg"}
              alt={tour.title}
              style={styles.image}
            />
            <h3>{tour.title}</h3>
            <p><b>Destination:</b> {tour.destination}</p>
            <p><b>Price:</b> ₹{tour.price}</p>
            <p><b>Start Date:</b> {tour.startDate}</p>
            <p><b>Duration:</b> {tour.duration} days</p>

            <div style={{ marginTop: "10px" }}>
              <button style={styles.editBtn} onClick={() => openEdit(tour)}>
                Edit
              </button>
              <button style={styles.deleteBtn} onClick={() => handleDelete(tour._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -------------------------- */}
      {/* EDIT MODAL */}
      {/* -------------------------- */}
      {editTour && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>Edit Tour</h2>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Destination"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Start Date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              style={styles.input}
            />

            <button style={styles.saveBtn} onClick={handleUpdate}>
              Update
            </button>
            <button style={styles.cancelBtn} onClick={() => setEditTour(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

//
// 🔵 INLINE STYLES FOR UI
//

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  card: {
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    background: "#fafafa",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  editBtn: {
    padding: "8px 12px",
    marginRight: "10px",
    background: "orange",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "8px 12px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#fff",
    padding: "25px",
    width: "400px",
    borderRadius: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #aaa",
  },

  saveBtn: {
    width: "100%",
    padding: "12px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  cancelBtn: {
    width: "100%",
    padding: "12px",
    background: "gray",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
