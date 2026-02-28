import { useEffect, useState } from "react";
import EntityForm from "./components/EntityForm";
import Field from "./components/Field";
import Hero from "./components/Hero";
import LoginPage from "./components/LoginPage";
import Panel from "./components/Panel";
import SelectField from "./components/SelectField";
import StatusBar from "./components/StatusBar";
import Table from "./components/Table";
import { authStorageKey, initialLoginForm } from "./constants/auth";
import {
  initialAppointment,
  initialBarber,
  initialClient,
  initialService,
  serviceTypes
} from "./constants/forms";
import { fetchJson, login, postJson } from "./lib/api";
import { formatDate, formatMoney, toApiDateTime } from "./lib/formatters";

function App() {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [clients, setClients] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [clientForm, setClientForm] = useState(initialClient);
  const [barberForm, setBarberForm] = useState(initialBarber);
  const [serviceForm, setServiceForm] = useState(initialService);
  const [appointmentForm, setAppointmentForm] = useState(initialAppointment);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      loadDashboard();
    } else {
      setLoading(false);
    }
  }, [auth]);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [clientsData, barbersData, servicesData, appointmentsData] = await Promise.all([
        fetchJson("/clients"),
        fetchJson("/barbers"),
        fetchJson("/services"),
        fetchJson("/appointments")
      ]);

      setClients(clientsData);
      setBarbers(barbersData);
      setServices(servicesData);
      setAppointments(appointmentsData);
      setStatus({ type: "success", message: "Dados atualizados." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(loginForm);
      setAuth(response);
      localStorage.setItem(authStorageKey, JSON.stringify(response));
      setStatus({ type: "success", message: "Login realizado com sucesso." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setAuth(null);
    localStorage.removeItem(authStorageKey);
    setStatus({ type: "idle", message: "" });
  }

  async function handleSubmit(path, payload, reset) {
    try {
      await postJson(path, payload);
      reset();
      await loadDashboard();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  if (!auth) {
    return (
      <LoginPage
        form={loginForm}
        onChange={setLoginForm}
        onSubmit={handleLogin}
        status={status}
        loading={loading}
      />
    );
  }

  return (
    <div className="shell">
      <Hero
        clientsCount={clients.length}
        barbersCount={barbers.length}
        appointmentsCount={appointments.length}
      />

      <StatusBar
        loading={loading}
        status={status}
        onRefresh={loadDashboard}
        auth={auth}
        onLogout={handleLogout}
      />

      <main className="dashboard">
        <Panel
          title="Agendamentos"
          subtitle="Area principal da operacao diaria da barbearia"
          className="panel-appointment"
        >
          <form
            className="entity-form entity-form-appointment"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(
                "/appointments",
                {
                  ...appointmentForm,
                  clientName: appointmentForm.clientName,
                  barberId: Number(appointmentForm.barberId),
                  serviceId: Number(appointmentForm.serviceId),
                  appointmentDateTime: toApiDateTime(appointmentForm.appointmentDateTime)
                },
                () => setAppointmentForm(initialAppointment)
              );
            }}
          >
            <Field
              label="Nome do cliente"
              name="clientName"
              type="text"
              value={appointmentForm.clientName}
              onChange={setAppointmentForm}
            />
            <SelectField
              label="Barbeiro"
              name="barberId"
              value={appointmentForm.barberId}
              options={barbers.map((item) => ({ value: item.id, label: item.name }))}
              onChange={setAppointmentForm}
            />
            <SelectField
              label="Servico"
              name="serviceId"
              value={appointmentForm.serviceId}
              options={services.map((item) => ({ value: item.id, label: item.name }))}
              onChange={setAppointmentForm}
            />
            <Field
              label="Data e hora"
              name="appointmentDateTime"
              type="datetime-local"
              value={appointmentForm.appointmentDateTime}
              onChange={setAppointmentForm}
            />
            <Field
              label="Observacoes"
              name="notes"
              type="textarea"
              value={appointmentForm.notes}
              onChange={setAppointmentForm}
            />
            <button type="submit">Agendar horario</button>
          </form>

          <Table
            columns={["Cliente", "Barbeiro", "Servico", "Horario", "Google"]}
            rows={appointments.map((item) => [
              item.clientName,
              item.barberName,
              item.serviceName,
              formatDate(item.appointmentDateTime),
              item.googleCalendarEventId || "-"
            ])}
            emptyLabel="Nenhum agendamento cadastrado."
          />
        </Panel>

        <Panel title="Clientes" subtitle="Base de atendimento da barbearia">
          <EntityForm
            fields={[
              { name: "name", label: "Nome", type: "text" },
              { name: "email", label: "E-mail", type: "email" },
              { name: "phone", label: "Telefone", type: "text" }
            ]}
            values={clientForm}
            onChange={setClientForm}
            buttonLabel="Cadastrar cliente"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit("/clients", clientForm, () => setClientForm(initialClient));
            }}
          />
          <Table
            columns={["Nome", "E-mail", "Telefone"]}
            rows={clients.map((item) => [item.name, item.email, item.phone])}
            emptyLabel="Nenhum cliente cadastrado."
          />
        </Panel>

        <Panel title="Barbeiros" subtitle="Equipe e especialidades">
          <EntityForm
            fields={[
              { name: "name", label: "Nome", type: "text" },
              { name: "specialty", label: "Especialidade", type: "textarea" }
            ]}
            values={barberForm}
            onChange={setBarberForm}
            buttonLabel="Cadastrar barbeiro"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit("/barbers", barberForm, () => setBarberForm(initialBarber));
            }}
          />
          <Table
            columns={["Nome", "Especialidade"]}
            rows={barbers.map((item) => [item.name, item.specialty || "-"])}
            emptyLabel="Nenhum barbeiro cadastrado."
          />
        </Panel>

        <Panel title="Servicos" subtitle="Catalogo de atendimento">
          <EntityForm
            fields={[
              { name: "name", label: "Nome", type: "text" },
              { name: "type", label: "Tipo", type: "select", options: serviceTypes },
              { name: "price", label: "Preco", type: "number", step: "0.01" },
              { name: "durationMinutes", label: "Duracao", type: "number" }
            ]}
            values={serviceForm}
            onChange={setServiceForm}
            buttonLabel="Cadastrar servico"
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(
                "/services",
                {
                  ...serviceForm,
                  price: Number(serviceForm.price),
                  durationMinutes: Number(serviceForm.durationMinutes)
                },
                () => setServiceForm(initialService)
              );
            }}
          />
          <Table
            columns={["Nome", "Tipo", "Preco", "Duracao"]}
            rows={services.map((item) => [
              item.name,
              item.type,
              formatMoney(item.price),
              `${item.durationMinutes} min`
            ])}
            emptyLabel="Nenhum servico cadastrado."
          />
        </Panel>
      </main>
    </div>
  );
}

function readStoredAuth() {
  const stored = localStorage.getItem(authStorageKey);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.removeItem(authStorageKey);
    return null;
  }
}

export default App;
