export default function BiasResult({ result }) {
  if (!result) return null;

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd" }}>
      <h3>Bias Detection Result</h3>
      <p>
        <strong>Has Bias:</strong> {result.bias.has_bias ? "Yes" : "No"}
      </p>
      <p>
        <strong>Bias Score:</strong> {result.bias.bias_score}
      </p>

      {result.bias.flagged_terms.length > 0 && (
        <ul>
          {result.bias.flagged_terms.map((item) => (
            <li key={item.term}>
              <strong>{item.term}</strong>: {item.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
