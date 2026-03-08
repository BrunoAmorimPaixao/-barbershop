# Barbershop

Sistema de gerenciamento de barbearia com `backend Spring Boot` e `frontend React`, persistência em `PostgreSQL` e integração opcional com `Google Calendar`.

## Funcionalidades

- cadastro de clientes
- cadastro de barbeiros
- cadastro de servicos
- agendamento com cliente, barbeiro, servico, data e observacoes
- sincronizacao opcional do agendamento com Google Calendar

## Requisitos

- Java 21
- Maven 3.9+
- Docker e Docker Compose para subir o PostgreSQL localmente
- Node.js 20+ para o frontend React

## Subir o banco

1. Copie `.env.example` para `.env`.
2. Suba o PostgreSQL:

```bash
docker compose up -d
```

O banco sera criado com os valores definidos no `.env`.

## Rodar o backend

Com o banco no ar:

```bash
./start-backend.sh
```

API:

- `http://localhost:8080`

Esse script ja sobe o backend apontando para `localhost:5433`, que evita conflito com um PostgreSQL local existente na `5432`.

## Rodar o frontend React

1. Entre em `frontend/`
2. Copie `.env.example` para `.env`
3. Instale as dependencias
4. Inicie o servidor de desenvolvimento

```bash
cd frontend
cp .env.example .env
bash ./npm-local.sh install
cd ..
./start-frontend.sh
```

Frontend:

- `http://localhost:5173`

Observacao importante:

- o projeto agora pode usar um `Node 20` local em `.tools/node-v20.19.0`
- os scripts `frontend/npm-local.sh` e `frontend/node-local.sh` executam o frontend com essa versao

## Subir tudo localmente

1. Banco:

```bash
POSTGRES_PORT=5433 docker-compose up -d
```

2. Backend:

```bash
./start-backend.sh
```

3. Frontend:

```bash
./start-frontend.sh
```

## Subir tudo com um comando

```bash
./start-all.sh
```

Para parar tudo:

```bash
./stop-all.sh
```

## Rodar no Kubernetes local com Minikube + k9s

### Requisitos

- minikube
- kubectl
- docker
- k9s
- Maven 3.9+

### Deploy com um comando

```bash
./k8s-up.sh
```

Esse script:

- sobe o minikube
- builda as imagens `barbershop-backend:local` e `barbershop-frontend:local`
- aplica os manifests em `k8s/`

### Abrir aplicacao

```bash
minikube service frontend -n barbershop
```

### Monitorar no k9s

```bash
k9s
```

Dentro do `k9s`, use:

- `:ns barbershop`
- `pods`, `svc`, `deploy`

### Remover resources

```bash
./k8s-down.sh
```

## Configurar Google Calendar

Por padrao, a integracao fica desabilitada e o sistema grava um identificador ficticio no agendamento.

Para ativar:

1. Crie um projeto no Google Cloud.
2. Ative a API do Google Calendar.
3. Gere uma credencial de `Service Account`.
4. Baixe o JSON da credencial.
5. Coloque o arquivo na raiz do projeto com o nome `google-calendar-service-account.json` ou ajuste `APP_GOOGLE_CALENDAR_CREDENTIALS_LOCATION`.
6. Compartilhe a agenda de destino com o e-mail da service account.
7. Ative no `.env`:

```env
APP_GOOGLE_CALENDAR_ENABLED=true
APP_GOOGLE_CALENDAR_ID=primary
APP_GOOGLE_CALENDAR_CREDENTIALS_LOCATION=file:./google-calendar-service-account.json
```

## Variaveis principais

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_GOOGLE_CALENDAR_ENABLED`
- `APP_GOOGLE_CALENDAR_ID`
- `APP_GOOGLE_CALENDAR_CREDENTIALS_LOCATION`
- `APP_CORS_ALLOWED_ORIGIN`

## Estrutura

- `src/main/java`: backend Spring Boot
- `frontend`: frontend React separado do backend
