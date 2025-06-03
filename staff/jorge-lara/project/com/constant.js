export const constant = {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    URL_REGEX: /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/,
    USERNAME_REGEX: /^[a-zA-Z0-9]+$/,
    ISO_DATE_REGEX: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d+)?(Z|([+-]\d{2}:\d{2}))?)?$/
}