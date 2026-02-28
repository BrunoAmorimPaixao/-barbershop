const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function fetchJson(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error("Falha ao carregar dados do backend.");
  }
  return response.json();
}

export async function postJson(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const fallbackMessage = "Falha ao salvar dados.";
    try {
      const error = await response.json();
      throw new Error(
        error.details && error.details.length > 0
          ? `${error.message}: ${error.details.join(", ")}`
          : error.message || fallbackMessage
      );
    } catch (parsingError) {
      if (parsingError instanceof Error) {
        throw parsingError;
      }
      throw new Error(fallbackMessage);
    }
  }

  return response.json();
}

export async function login(credentials) {
  return postJson("/auth/login", credentials);
}
