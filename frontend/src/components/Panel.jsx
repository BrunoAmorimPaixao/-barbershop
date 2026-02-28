function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel-heading">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

export default Panel;
