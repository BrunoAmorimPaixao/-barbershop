#!/usr/bin/env bash
set -euo pipefail

kubectl delete namespace barbershop --ignore-not-found=true
