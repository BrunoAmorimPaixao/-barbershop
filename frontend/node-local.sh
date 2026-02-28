#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_DIR="$ROOT_DIR/.tools/node-v20.19.0/bin"

if [ ! -x "$NODE_DIR/node" ]; then
  echo "Node local nao encontrado em $NODE_DIR"
  echo "Instale ou copie o Node 20 para .tools/node-v20.19.0 primeiro."
  exit 1
fi

PATH="$NODE_DIR:$PATH" node "$@"
