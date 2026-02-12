const BASE_URL = "https://69401730993d68afba6af174.mockapi.io";
export async function login(nationalId, password) {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();

  console.log("Entered:", nationalId, password);
  console.log("Users from API:", users);

  const user = users.find((u) => {
    console.log("Checking user:", u);
    return (
      String(u.nationalId) === String(nationalId) &&
      String(u.password) === String(password)
    );
  });

  console.log("Matched user:", user);

  if (!user) {
    throw new Error("خطأ في البيانات");
  }

  return {
    token: "fake-token",
    user,
  };
}
