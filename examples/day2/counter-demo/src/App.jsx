import React, { useState } from "react";

export default function App() {
  return (
    <div style={page}>
      <h1 style={{ marginBottom: 6 }}>State Demo (Slides 12–16)</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Open the console. Click buttons slowly, then spam-click quickly.
      </p>

      <div style={grid}>
        <BrokenVariableCounter />
        <StateCounter />
        <SnapshotAndAsyncDemo />
        <BatchingClicksDemo />
      </div>
    </div>
  );
}

/* ---------------- Slide 12 ---------------- */
function BrokenVariableCounter() {
  let count = 0;

  return (
    <Card title="Slide 12 — Variable vs. State (Broken)">
      <p style={bigText}>
        Count: <strong>{count}</strong>
      </p>

      <button
        style={btn}
        onClick={() => {
          count++;
          console.log("[Slide 12] variable count is now:", count);
        }}
      >
        Click +1 (variable)
      </button>

      <p style={hint}>
        Console changes, UI does not. React didn’t re-render because no state was updated.
      </p>
    </Card>
  );
}

/* ---------------- Slide 13 ---------------- */
function StateCounter() {
  const [count, setCount] = useState(0);

  return (
    <Card title="Slide 13 — useState Hook (Works)">
      <p style={bigText}>
        Count: <strong>{count}</strong>
      </p>

      <button
        style={btn}
        onClick={() => {
          setCount(count + 1);
          console.log("[Slide 13] clicked, React will re-render with new count soon");
        }}
      >
        Click +1 (state)
      </button>

      <p style={hint}>
        setCount triggers a re-render. On the next render, the UI reflects the new state.
      </p>
    </Card>
  );
}

/* ---------------- Slides 14 + 15 ---------------- */
function SnapshotAndAsyncDemo() {
  const [count, setCount] = useState(0);

  // Slide 14: snapshot = value "seen" by this render
  const snapshot = count;

  return (
    <Card title="Slides 14–15 — Snapshot + Async Updates">
      <p style={{ marginTop: 0 }}>
        This render sees a <strong>snapshot</strong> of count:
      </p>

      <p style={bigText}>
        count snapshot: <strong>{snapshot}</strong>
      </p>

      <button
        style={btn}
        onClick={() => {
          // Slide 15 trap: not instant
          setCount(count + 1);
          console.log("[Slide 15] after setCount(count + 1), count is STILL:", count);
          console.log(
            "[Slide 14] snapshot in this render is STILL:",
            snapshot,
            "(same render)"
          );
        }}
      >
        setCount(count + 1) + console.log(count)
      </button>

      <p style={hint}>
        You’ll see the console prints the old value. React schedules the update for the next
        render.
      </p>
    </Card>
  );
}

/* ---------------- Slide 16 ---------------- */
function BatchingClicksDemo() {
  const [count, setCount] = useState(0);

  const add3Wrong = () => {
    // If React batches these, all three can read the same "count" snapshot.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("[Slide 16 WRONG] tried +3 using count snapshot:", count);
  };

  const add3Right = () => {
    // Functional update: each update receives the latest queued value.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    console.log("[Slide 16 RIGHT] +3 using prev => prev + 1");
  };

  return (
    <Card title="Slide 16 — Update Based on Previous State">
      <p style={bigText}>
        Count: <strong>{count}</strong>
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button style={btn} onClick={add3Wrong}>
          +3 WRONG (setCount(count + 1) x3)
        </button>

        <button style={btn} onClick={add3Right}>
          +3 RIGHT (setCount(prev =&gt; prev + 1) x3)
        </button>

        <button style={btnSecondary} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <p style={hint}>
        Rule: if the new state depends on the old state, use the functional form.
      </p>
    </Card>
  );
}

/* ---------------- Small UI helpers ---------------- */
function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

const page = {
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  padding: 20,
  background: "#f6f7fb",
  minHeight: "100vh",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 16,
  marginTop: 16,
};

const card = {
  background: "white",
  border: "1px solid #e6e6e6",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const cardTitle = {
  fontWeight: 700,
  marginBottom: 10,
};

const bigText = {
  fontSize: 18,
  margin: "10px 0",
};

const btn = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

const btnSecondary = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#f3f3f3",
  cursor: "pointer",
};

const hint = {
  color: "#666",
  marginTop: 10,
  lineHeight: 1.35,
};
