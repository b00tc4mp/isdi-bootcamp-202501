class OwnershipError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OwnershipError";
  }
}
class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
class LocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocationError";
  }
}
class CredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CredentialsError";
  }
}

class DuplicityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicityError";
  }
}
class SystemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SystemError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

class OverlapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OverlapError";
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
  OverlapError,
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
  OverlapError,
};

export default errors;
