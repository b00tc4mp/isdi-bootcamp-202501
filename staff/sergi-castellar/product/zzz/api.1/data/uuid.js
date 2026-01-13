export const uuid = (starting) => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const ending = (Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')).toString();
    starting = starting.toString();
    const id = starting + ending;
    return id;
}