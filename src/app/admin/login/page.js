"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://tripzsearch-backend.onrender.com/api/admin/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect to protected page
      router.push("dashboard");
    } catch (error) {
      setError("Something went wrong");
    }
  }

  // 🔥 Navigate to signup
  function goToSignup() {
    router.push("/admin/signup");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
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

        <button type="submit" style={btnStyle}>
          Login
        </button>
      </form>

      {/* Signup button below */}
      <button onClick={goToSignup} style={signupBtnStyle}>
        Don’t have an account? Signup
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

// Simple inline styles
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

const signupBtnStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  background: "#555",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
