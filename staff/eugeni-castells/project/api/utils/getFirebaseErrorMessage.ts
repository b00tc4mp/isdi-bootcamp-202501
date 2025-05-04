export function getFirebaseErrorMessage(error: any): string {
  try {
    const parsed = JSON.parse(error.response.data);
    return parsed?.error?.message ?? "Unknown Firebase error";
  } catch {
    return "Unknown Firebase error";
  }
}
