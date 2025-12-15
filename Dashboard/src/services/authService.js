const BASE_URL = "https://69401730993d68afba6af174.mockapi.io";

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  const user = users.find(
    (u) =>
      u.email === email.trim() &&
      u.password === password.trim()
  );

  if (!user) {
    throw new Error("الإيميل أو كلمة المرور غير صحيحة");
  }

  return {
    token: "fake-token",
    user,
  };
}
