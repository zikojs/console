import { useState } from "preact/hooks";

export default function Counter({ start = 0, step = 1 }) {
  const [count, setCount] = useState(start);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "fit-content",
    },
    value: {
      minWidth: "50px",
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "600",
    },
    button: {
      width: "36px",
      height: "36px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={() => setCount(count - step)}
      >
        −
      </button>

      <span style={styles.value}>{count}</span>

      <button
        style={styles.button}
        onClick={() => setCount(count + step)}
      >
        +
      </button>
    </div>
  );
}