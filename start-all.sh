#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT_DIR/.run"
BACKEND_LOG="$LOG_DIR/backend.log"
FRONTEND_LOG="$LOG_DIR/frontend.log"
BACKEND_PID_FILE="$LOG_DIR/backend.pid"
FRONTEND_PID_FILE="$LOG_DIR/frontend.pid"

mkdir -p "$LOG_DIR"

cd "$ROOT_DIR"

echo "Subindo PostgreSQL do projeto na porta 5433..."
POSTGRES_PORT=5433 docker-compose up -d

if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  echo "Instalando dependencias do frontend..."
  (
    cd "$ROOT_DIR/frontend"
    bash ./npm-local.sh install
  )
fi

echo "Iniciando backend..."
nohup "$ROOT_DIR/start-backend.sh" >"$BACKEND_LOG" 2>&1 &
echo $! >"$BACKEND_PID_FILE"

echo "Iniciando frontend..."
nohup "$ROOT_DIR/start-frontend.sh" >"$FRONTEND_LOG" 2>&1 &
echo $! >"$FRONTEND_PID_FILE"

echo "Aplicacao iniciada."
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo "Logs backend:  $BACKEND_LOG"
echo "Logs frontend: $FRONTEND_LOG"
