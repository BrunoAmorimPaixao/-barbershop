#!/usr/bin/env bash
set -euo pipefail

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

cd "$WORKDIR"

curl -fsSLo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
K8S_VERSION="$(curl -fsSL https://dl.k8s.io/release/stable.txt)"
curl -fsSLo kubectl "https://dl.k8s.io/release/${K8S_VERSION}/bin/linux/amd64/kubectl"
curl -fsSLo k9s.tar.gz https://github.com/derailed/k9s/releases/latest/download/k9s_Linux_amd64.tar.gz
tar -xzf k9s.tar.gz k9s

sudo install -m 0755 minikube /usr/local/bin/minikube
sudo install -m 0755 kubectl /usr/local/bin/kubectl
sudo install -m 0755 k9s /usr/local/bin/k9s

minikube version --short
kubectl version --client --output=yaml | sed -n '1,20p'
k9s version
