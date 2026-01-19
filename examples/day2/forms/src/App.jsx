import React, { useState } from "react";

/**
 * ONE CODEBASE DEMO: "Newsletter Signup"
 * Covers:
 * - Slide 21: Handling Events (camelCase, passing handlers, onClick pitfall)
 * - Slide 22: Event object (e.target.value, e.preventDefault, e.stopPropagation)
 * - Slide 23: Controlled Components (single source of truth)
 * - Slide 24: Form code structure (value + onChange)
 * - Slide 25: Multiple inputs (single object state + computed property)
 * - Slide 26: Submitting forms (onSubmit on <form> + preventDefault)
 * - Slide 27: Basic validation (simple checks)
 */

export default function App() {
  // Slide 25: Multiple inputs -> single object state (instead of 10 useState hooks)
  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "weekly", // extra field so students see it scales
  });

  // Small UI state to show "submit result"
  const [status, setStatus] = useState({
    state: "idle", // "idle" | "syncing" | "success" | "error"
    message: "",
  });

  // Slide 21: Handling Events -> pass function *definition*, not call
  const handleReset = () => {
    setForm({ name: "", email: "", plan: "weekly" });
    setStatus({ state: "idle", message: "" });
  };

  /**
   * Slide 25: One change handler for many inputs
   * - Uses e.target.name and e.target.value
   * - Updates object state immutably using spread
   */
  const handleChange = (e) => {
    // Slide 22: The event object (Synthetic Event)
    const { name, value } = e.target;

    // Slide 23/25: State is the single source of truth; input reads from state
    setForm((prev) => ({
      ...prev,
      [name]: value, // computed property name: updates name/email/plan based on input name
    }));
  };

  /**
   * Slide 22: stopPropagation demo
   * We'll create a clickable "card" wrapper.
   * Clicking inside the form should NOT trigger the card click.
   */
  const handleCardClick = () => {
    alert("Card clicked (bubbling example). Click inside the form to stop this.");
  };

  /**
   * Slide 26: Submit handling on the <form> tag
   * - preventDefault to stop page reload
   * - do validation before "API" call
   */
  const handleSubmit = async (e) => {
    // Slide 22/26: preventDefault stops browser refresh + state loss
    e.preventDefault();

    // Slide 27: Basic validation (simple checks)
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    // Basic email check for teaching purposes (not production-grade)
    if (!form.email.includes("@")) {
      alert("Invalid Email (must include @).");
      return;
    }

    // Simulate API latency + possible failure
    setStatus({ state: "syncing", message: "Syncing..." });

    try {
      // Fake API: wait 800ms
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Fake failure rule so students can SEE error handling:
      // if email ends with "fail.com" we throw
      if (form.email.toLowerCase().endsWith("fail.com")) {
        throw new Error("Server rejected this email domain.");
      }

      setStatus({
        state: "success",
        message: `Subscribed ${form.email} to the ${form.plan} plan ✅`,
      });
    } catch (err) {
      setStatus({
        state: "error",
        message: err.message || "Something went wrong.",
      });
    }
  };

  // Slide 21: Common pitfall demonstration
  // ❌ WRONG: onClick={handleReset()} would run immediately on render
  // ✅ RIGHT: onClick={handleReset} (pass the function)
  //
  // We'll keep the wrong version as a comment in JSX below.

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Newsletter Signup Demo</h1>
      <p style={styles.subtitle}>
        One example covering events, the event object, controlled forms, multi-input handling,
        submit, and basic validation.
      </p>

      {/* Wrapper to demonstrate bubbling */}
      <div style={styles.card} onClick={handleCardClick}>
        <div style={styles.cardHeader}>
          <strong>Signup Card</strong>
          <span style={styles.smallNote}>(clicking the card triggers an alert)</span>
        </div>

        {/* Slide 22: stopPropagation - prevents the card onClick from firing */}
        <form
          style={styles.form}
          onSubmit={handleSubmit} // Slide 26: onSubmit on the FORM
          onClick={(e) => {
            // If you remove this, clicking inputs triggers the card alert (bubbling).
            e.stopPropagation(); // Slide 22: stop bubbling
          }}
        >
          {/* Slide 24: Controlled input structure (value + onChange) */}
          <label style={styles.label}>
            Name
            <input
              style={styles.input}
              name="name"
              value={form.name} // state -> input value (controlled)
              onChange={handleChange} // Slide 21: pass handler (not called)
              placeholder="Ada Lovelace"
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              style={styles.input}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ada@example.com"
            />
          </label>

          <label style={styles.label}>
            Plan
            <select
              style={styles.input}
              name="plan"
              value={form.plan}
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          {/* Status display */}
          <div style={styles.statusRow}>
            {status.state === "syncing" && (
              <span style={styles.syncing}>{status.message}</span>
            )}
            {status.state === "success" && (
              <span style={styles.success}>{status.message}</span>
            )}
            {status.state === "error" && (
              <span style={styles.error}>{status.message}</span>
            )}
          </div>

          <div style={styles.actions}>
            {/* Slide 26: submit is triggered by form submit (button type submit) */}
            <button style={styles.primaryBtn} type="submit" disabled={status.state === "syncing"}>
              Subscribe
            </button>

            {/* Slide 21: common pitfall explanation */}
            {/* ❌ WRONG (would run immediately): onClick={handleReset()} */}
            {/* ✅ RIGHT: */}
            <button style={styles.secondaryBtn} type="button" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div style={styles.debugBox}>
            <strong>Debug (State)</strong>
            <pre style={styles.pre}>{JSON.stringify(form, null, 2)}</pre>
          </div>
        </form>
      </div>

      <div style={styles.tipBox}>
        <strong>Teaching tip:</strong> Ask students to remove <code>e.stopPropagation()</code> in
        the form, then click the inputs and watch the card alert fire. Put it back to show why
        it exists.
      </div>
    </div>
  );
}

/* Simple inline styles to keep it self-contained and visually clear */
const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    padding: 24,
    maxWidth: 860,
    margin: "0 auto",
  },
  title: { margin: 0, fontSize: 28 },
  subtitle: { marginTop: 8, marginBottom: 18, opacity: 0.8 },
  card: {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    background: "#fff",
  },
  cardHeader: {
    display: "flex",
    gap: 10,
    alignItems: "baseline",
    marginBottom: 12,
  },
  smallNote: { fontSize: 12, opacity: 0.7 },
  form: {
    display: "grid",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    background: "#f7f7f9",
  },
  label: { display: "grid", gap: 6, fontSize: 14 },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
    outline: "none",
    fontSize: 14,
    background: "#fff",
  },
  actions: { display: "flex", gap: 10, marginTop: 6 },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #222",
    background: "#222",
    color: "#fff",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #bbb",
    background: "#fff",
    cursor: "pointer",
  },
  statusRow: { minHeight: 22 },
  syncing: { fontSize: 13, opacity: 0.8 },
  success: { fontSize: 13 },
  error: { fontSize: 13 },
  debugBox: {
    marginTop: 10,
    border: "1px dashed #bbb",
    borderRadius: 10,
    padding: 10,
    background: "#fff",
  },
  pre: { margin: 0, fontSize: 12, overflowX: "auto" },
  tipBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    background: "#fafafa",
    fontSize: 14,
  },
};
