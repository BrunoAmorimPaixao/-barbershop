#!/usr/bin/env bash

set -a

if [ -f .env ]; then
  # Carrega as variaveis usadas pelo Docker e pelo Spring Boot.
  . ./.env
fi

set +a

mvn spring-boot:run
