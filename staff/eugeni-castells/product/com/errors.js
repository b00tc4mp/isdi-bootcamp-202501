class OwnershipError extends Error {
  constructor(message) {
    super(message);
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

class CredentialsError extends Error {
  constructor(message) {
    super(message);
  }
}

class DuplicityError extends Error {
  constructor(message) {
    super(message);
  }
}
class SystemError extends Error {
  constructor(message) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(message) {
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
};

const errors = {
  OwnershipError,
  NotFoundError,
  CredentialsError,
  SystemError,
  DuplicityError,
  ValidationError,
};

export default errors;
