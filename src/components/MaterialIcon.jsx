export default function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()}>
      {children}
    </span>
  );
}
