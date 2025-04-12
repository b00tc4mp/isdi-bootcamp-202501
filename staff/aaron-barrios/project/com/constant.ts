export const constant = {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    ALIAS_REGEX: /^[a-zA-Z0-9]+$/,
    NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    OBJECT_ID_REGEX: /^[a-f0-9]{24}$/i,
    TOKEN_REGEX: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
}