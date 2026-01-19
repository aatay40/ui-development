import React, { useMemo, useState } from "react";

function CartItemRow({ item, onChangeQty, onRemove }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderTop: "1px solid #eee" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: "#666" }}>£{item.price.toFixed(2)} each</div>
      </div>

      <button onClick={() => onChangeQty(item.id, Math.max(1, item.qty - 1))}>-</button>
      <div style={{ width: 24, textAlign: "center" }}>{item.qty}</div>
      <button onClick={() => onChangeQty(item.id, item.qty + 1)}>+</button>

      <div style={{ width: 80, textAlign: "right" }}>
        £{(item.price * item.qty).toFixed(2)}
      </div>

      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

function OrderSummary({ subtotal }) {
  const shipping = subtotal >= 80 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>Order Summary</h3>
      <Row label="Subtotal" value={subtotal} />
      <Row label="Shipping" value={shipping} />
      <Row label="Tax (20%)" value={tax} />
      <hr />
      <Row label="Total" value={total} strong />
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontWeight: strong ? 800 : 500 }}>{label}</span>
      <span style={{ fontWeight: strong ? 800 : 600 }}>£{value.toFixed(2)}</span>
    </div>
  );
}

export default function App() {
  // Parent owns the cart (single source of truth)
  const [items, setItems] = useState([
    { id: "1", name: "Protein Test Kit", price: 49.99, qty: 1 },
    { id: "2", name: "Vitamin D Panel", price: 29.5, qty: 2 },
    { id: "3", name: "Ring Subscription (Month)", price: 19.0, qty: 1 },
  ]);

  // Callback prop target: child calls this, parent updates state
  function changeQty(id, nextQty) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: nextQty } : it))
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  // Derived value stays correct because it comes from the parent state
  // Do not pay attention to useMemo for now, functionality is same without it
  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [items]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 6 }}>Checkout Example (Props + Callback)</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Parent owns the cart. Child rows update it via callback props. Summary always matches.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Your Cart</h3>

          {items.length === 0 ? (
            <p style={{ color: "#666" }}>Cart is empty.</p>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}                 // props down
                onChangeQty={changeQty}     // callback prop
                onRemove={removeItem}       // callback prop
              />
            ))
          )}
        </div>

        <OrderSummary subtotal={subtotal} />
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
        Teaching line: <strong>Data goes down</strong> (items), <strong>events go up</strong> (callbacks).
      </p>
    </div>
  );
}