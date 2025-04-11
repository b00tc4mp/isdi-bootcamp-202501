export const constant = {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    USERNAME_REGEX: /^[a-zA-Z0-9]+$/,
    NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    NUMBER_REGEX: /^(0|[1-9][0-9]*)$/,
    TAG_REGEX: /^[a-zA-Z]+$/,
}