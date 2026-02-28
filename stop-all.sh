#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$ROOT_DIR/.run"

stop_from_pid_file() {
  local pid_file="$1"
  local name="$2"

  if [ -f "$pid_file" ]; then
    local pid
    pid="$(cat "$pid_file")"
    if kill -0 "$pid" 2>/dev/null; then
      echo "Parando $name (PID $pid)..."
      kill "$pid"
    fi
    rm -f "$pid_file"
  fi
}

stop_from_pid_file "$LOG_DIR/backend.pid" "backend"
stop_from_pid_file "$LOG_DIR/frontend.pid" "frontend"

echo "Parando PostgreSQL do projeto..."
POSTGRES_PORT=5433 docker-compose down
