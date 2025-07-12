import { BACKEND_URL } from "./constants";
import { getSession } from "./session";
import { signOut } from "@/features/auth/api/auth";
export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 401) {
    await signOut();
    window.location.href = "/auth/signin";
    throw new Error("Session expired. Please log in again.");
  }

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("Failed to fetch the data from GraphQL");
  }

  return result.data;
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 401) {
    await signOut();
    window.location.href = "/auth/signin";
    throw new Error("Session expired. Please log in again.");
  }

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("Failed to fetch the data from GraphQL");
  }

  return result.data;
};
