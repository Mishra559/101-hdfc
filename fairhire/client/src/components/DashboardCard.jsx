export default function DashboardCard({ label, value }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "0.75rem", minWidth: 140 }}>
      <div style={{ fontSize: 12, color: "#555" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
