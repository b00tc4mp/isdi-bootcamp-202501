var logic = {
  helpers: {
    validateEmptyFormField: function (formData) {
      var notEmptyForm = true;
      for (var property in formData) {
        if (formData[property] === "") {
          notEmptyForm = false;
          break;
        }
      }

      if (!notEmptyForm) {
        throw new Error("There's an empty field");
      }
    },
    validateIsString: function (formData) {
      var allString = true;

      for (var field in formData) {
        if (typeof field !== "string") {
          allString = false;
        }
      }

      if (!allString) {
        throw new Error("Not all fields are string");
      }
    },
  },

  registerUser: function (userInfo) {
    var notRepitedUser = true;

    for (var i = 0; i < data.users.length && notRepitedUser === true; i++) {
      if (userInfo.username === data.users[i].username) {
        notRepitedUser = false;
      }
    }

    if (notRepitedUser) {
      data.users[data.users.length] = userInfo;
      localStorage.setItem("users", JSON.stringify(data.users));
    } else throw new Error("Username already exists");
  },
};
