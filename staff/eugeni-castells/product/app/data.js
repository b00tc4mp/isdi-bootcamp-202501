var data = {
  uuid: function () {
    return (Math.random() * 10 ** 15).toString(36);
  },
  users: [],
  userId: null,
  loginFormData: {
    username: "",
    password: "",
  },
  registerFormData: {
    name: "",
    email: "",
    username: "",
    password: "",
  },
};
