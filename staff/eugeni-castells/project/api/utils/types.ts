export type FirebaseStructuredError = {
  error: {
    code: number;
    message: string;
    errors: { message: string; domain: string; reason: string }[];
  };
};

export type FirebaseUploadedImage = {
  url: string;
  path: string;
};
