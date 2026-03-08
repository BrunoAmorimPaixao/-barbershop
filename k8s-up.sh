#!/usr/bin/env bash
set -euo pipefail

if ! command -v minikube >/dev/null 2>&1; then
  echo "minikube nao encontrado."
  exit 1
fi

if ! command -v kubectl >/dev/null 2>&1; then
  echo "kubectl nao encontrado."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker nao encontrado."
  exit 1
fi

if ! command -v mvn >/dev/null 2>&1; then
  echo "mvn nao encontrado."
  exit 1
fi

echo "Subindo minikube (se necessario)..."
minikube start

echo "Usando docker daemon do minikube..."
eval "$(minikube -p minikube docker-env)"

echo "Build do backend..."
(
  cd backend
  mvn -DskipTests clean package
)
docker build -t barbershop-backend:local ./backend

echo "Build do frontend..."
docker build -t barbershop-frontend:local ./frontend

echo "Aplicando manifests..."
kubectl apply -f k8s/

echo "Status dos pods..."
kubectl get pods -n barbershop

echo
echo "Para abrir o frontend:"
echo "minikube service frontend -n barbershop"
echo
echo "Para monitorar com k9s:"
echo "k9s"
