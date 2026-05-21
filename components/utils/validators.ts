export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email is required";
  if (!email.includes("@")) return "Please enter a valid email address";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Email format is invalid";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (typeof password !== "string") return "Password must be a string";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (password.length > 64) return "Password is too long";
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return "Password must contain uppercase, lowercase letters and numbers";
  }
  return null;
};
