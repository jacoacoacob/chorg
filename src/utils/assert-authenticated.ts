import { useAuth } from "@/stores/auth.store";

function assertAuthenticated() {
  const auth = useAuth();

  if (!auth.user) {
    throw new Error("Unauthenticated");
  }

  return auth.user;
}

export { assertAuthenticated };
