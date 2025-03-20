import { data } from "../data"
import { validate } from "./validate"

import errors, { SystemError } from "../errors.js"

export const loginUser = (username, password) => {
  validate.username(username, "username")
  validate.password(password, "password")

  return fetch("http://localhost:8080/users/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password })
  })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((response) => {
      if (response.status === 200)
        return response.json()
          .catch((error) => { throw new SystemError(error.message) })
          .then((body) => {
            const { id } = body

            data.userId = id; //se guarda en session storage en forma de json
          })
      return response.json()
          .catch(error => { throw new SystemError(error.message) })
          .then(body => {
            const { error, message } = body
            
            const constructor = errors[error]

            throw new constructor(message)
          })
    })
}
