export class ValidationError extends Error {
	constructor(message, errors = []) {
		super(message)
		this.name = 'ValidationError'
		this.errors = errors
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message)
		this.name = 'NotFoundError'
	}
}

export class InternalServerError extends Error {
	constructor(message) {
		super(message)
		this.name = 'InternalServerError'
	}
}

export class UnauthorizedError extends Error {
	constructor(message) {
		super(message)
		this.name = 'UnauthorizedError'
	}
}

export class DatabaseError extends Error {
	constructor(message) {
		super(message)
		this.name = 'DatabaseError'
	}
}
