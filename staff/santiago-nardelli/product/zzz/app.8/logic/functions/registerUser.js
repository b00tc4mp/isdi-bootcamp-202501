function registerUser(name, email, password) {
    this.validate.text(name, "name");
    this.validate.maxLength(name, 20, "name");
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    //meotodo de data para buscar un usuario
    const found = data.users.findOne(
      (user) => user.email === email || user.name === name
    );

    if (found) throw new DuplicityError("user already exists");

    const user = {
      name: name,
      email: email,
      password: password,
      createdAt: new Date(),
      status: "active",
      role: "user",
      modifiedAt: null,
    };
    //metodo de data para insertar un usuario
    data.users.insertOne(user);
  }