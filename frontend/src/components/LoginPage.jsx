import Field from "./Field";

function LoginPage({ form, onChange, onSubmit, status, loading }) {
  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="login-copy">
          <span className="eyebrow">Barbershop Access</span>
          <h1>Entre para acessar a agenda da barbearia.</h1>
          <p>
            O login leva direto para a tela de agendamento, que agora e a pagina
            principal da operacao.
          </p>
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          <Field
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />
          <Field
            label="Senha"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {status.message ? <div className={`status ${status.type}`}>{status.message}</div> : null}
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
