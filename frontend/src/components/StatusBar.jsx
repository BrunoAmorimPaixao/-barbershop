function StatusBar({ loading, status, onRefresh, auth, onLogout }) {
  return (
    <section className="status-row">
      <div className="status-actions">
        <button className="refresh" onClick={onRefresh} disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar dados"}
        </button>
        <div className="auth-chip">
          <span>{auth?.displayName}</span>
          <button className="ghost-button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>
      {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}
    </section>
  );
}

export default StatusBar;
