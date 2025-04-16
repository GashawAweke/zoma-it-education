class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 400
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 401
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 404
  }
}

class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = 403
  }
}

export { CustomAPIError, BadRequestError, UnauthenticatedError, NotFoundError, ForbiddenError }
