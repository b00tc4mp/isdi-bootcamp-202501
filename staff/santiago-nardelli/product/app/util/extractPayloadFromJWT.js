export const extactPayloadFromJWT = (token) => {
  if (!token) throw new Error("Token is required");

  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload;
}

// export extractPayloadFromJWT = token => {
//     const fromIndex = token.indexOf('.') + 1
//     const toIndex = token.lastIndexOf('.')
//     const payloadB64 = token.slice(fromIndex, toIndex)
//     const payloadJSON = atob(payloadB64)
//     const payload = JSON.parse(payloadJSON)

//     return payload
// }
// The second implementation is more efficient as it avoids unnecessary operations.
// You can remove the first implementation to avoid redundancy and potential confusion.