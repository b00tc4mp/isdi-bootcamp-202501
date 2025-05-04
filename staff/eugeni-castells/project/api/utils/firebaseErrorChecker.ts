export function isFirebaseError(error: any): boolean {
  try {
    if (
      error &&
      typeof error === "object" &&
      error.response &&
      typeof error.response.data === "string"
    ) {
      const parsed = JSON.parse(error.response.data);

      return (
        parsed &&
        typeof parsed === "object" &&
        parsed.error &&
        typeof parsed.error.code === "number" &&
        typeof parsed.error.message === "string"
      );
    }

    return false;
  } catch {
    return false;
  }
}
