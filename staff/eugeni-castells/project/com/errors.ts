class OwnershipError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class LocationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class CredentialsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class DuplicityError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class SystemError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export {
  OwnershipError,
  NotFoundError,
  CredentialsError,
  SystemError,
  DuplicityError,
  ValidationError,
  AuthorizationError,
  LocationError,
};

const errors = {
  OwnershipError,
  NotFoundError,
  CredentialsError,
  SystemError,
  DuplicityError,
  ValidationError,
  AuthorizationError,
  LocationError,
};

export default errors;
