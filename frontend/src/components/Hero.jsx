function Hero({ clientsCount, barbersCount, appointmentsCount }) {
  return (
    <header className="hero">
      <div>
        <span className="eyebrow">Barbershop Control</span>
        <h1>Agendamentos no centro da operacao da barbearia.</h1>
        <p>
          Abra a pagina e marque horarios primeiro. Clientes, barbeiros e servicos
          ficam como apoio para manter a agenda sempre pronta para uso.
        </p>
      </div>
      <div className="hero-card">
        <div>
          <strong>{clientsCount}</strong>
          <span>clientes</span>
        </div>
        <div>
          <strong>{barbersCount}</strong>
          <span>barbeiros</span>
        </div>
        <div>
          <strong>{appointmentsCount}</strong>
          <span>agendamentos ativos</span>
        </div>
      </div>
    </header>
  );
}

export default Hero;
