interface User {
  _id: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthError {
  error: string;
}

export const register = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: AuthResponse | AuthError = await response.json();

  if (!response.ok) throw new Error((data as AuthError).error);

  const authData = data as AuthResponse;
  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", JSON.stringify(authData.user));

  return authData;
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: AuthResponse | AuthError = await response.json();

  if (!response.ok) throw new Error((data as AuthError).error);

  const authData = data as AuthResponse;
  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", JSON.stringify(authData.user));

  return authData;
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
