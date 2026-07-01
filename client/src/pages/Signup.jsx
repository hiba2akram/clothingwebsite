import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Signup() {
  const [form, setForm] = useState({ fName: "", lName: "", Email: "", Password: "", Phone: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input style={styles.input} placeholder="First Name"
              value={form.fName} onChange={e => setForm({...form, fName: e.target.value})} required />
            <input style={styles.input} placeholder="Last Name"
              value={form.lName} onChange={e => setForm({...form, lName: e.target.value})} required />
          </div>
          <input style={styles.input} type="email" placeholder="Email"
            value={form.Email} onChange={e => setForm({...form, Email: e.target.value})} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.Password} onChange={e => setForm({...form, Password: e.target.value})} required />
          <input style={styles.input} placeholder="Phone (optional)"
            value={form.Phone} onChange={e => setForm({...form, Phone: e.target.value})} />
          <button style={styles.btn} type="submit">Create Account</button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf8f5" },
  card: { background: "#fff", padding: "40px", borderRadius: "8px", border: "1px solid #e8e0d6", width: "100%", maxWidth: "420px" },
  title: { fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", marginBottom: "24px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  row: { display: "flex", gap: "12px" },
  input: { flex: 1, padding: "12px 16px", border: "1px solid #d4c9bb", borderRadius: "4px", fontSize: "14px", fontFamily: "'Jost', sans-serif", width: "100%" },
  btn: { padding: "12px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer" },
  error: { color: "#c0392b", fontSize: "13px", marginBottom: "12px" },
  link: { textAlign: "center", marginTop: "16px", fontSize: "13px" }
};

export default Signup;
