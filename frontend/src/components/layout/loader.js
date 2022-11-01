export default function Loader() {
  return (
    <div className="min-vh-50 gap-2 bg-body d-flex justify-content-center align-items-center">
      {["primary", "success", "danger", "warning", "info"].map((x, i) => (
        <div className={`spinner-border text-${x}`} role="status" key={i}>
          <span className="visually-hidden">Loading...</span>
        </div>
      ))}
    </div>
  );
}
