"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");

    const res = await fetch(
      "https://tripzsearch-backend.onrender.com/api/admin/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/admin/login"); // 👈 Auto navigate after signup
      }, 1200);
    } else {
      setMessage(data.message || "Signup failed");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Admin Signup</h2>

      <form onSubmit={handleSignup} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={inputStyle}
        />

        <button style={btnStyle}>Signup</button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      {/* 👇 Login section */}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <button
          onClick={() => router.push("/admin/login")}
          style={{
            background: "none",
            color: "#0070f3",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "15px",
            padding: 0,
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #aaa",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
