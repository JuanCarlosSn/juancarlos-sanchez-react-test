export const authenticateUser = (
  username: string,
  password: string
): boolean => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (user: { username: string; password: string }) =>
      user.username === username && user.password === password
  );
  return user !== undefined;
};
