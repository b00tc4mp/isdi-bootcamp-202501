
export function jsonBodyParser(req) {
    return req.json().catch(() => {
        throw new Error('Invalid JSON body');
    });
}
