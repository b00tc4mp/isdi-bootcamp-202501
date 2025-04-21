const constant = {
  EMPTY_OR_BLANK_REGEX: /^\s*$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  URL_REGEX:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  OBJECT_ID_REGEX: /^[a-f0-9]{24}$/i,
  PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[^a-zA-Z\s])\S{8,20}$/,
  NAME_REGEX: /^(?!.* {2,})[A-Za-zÀ-ÿ ]{2,20}$/,
  USERNAME_REGEX: /^(?!.* {2,})[A-Za-zÀ-ÿ0-9 ]{2,20}$/,
  PERCENTAGE_STRING_REGEX: /^100%$|^\d{1,2}%$/,
  MAX_DISTANCE: 50,
};

export default constant;
