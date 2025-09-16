function loginUser(email, password) {
    this.validate.email(email, "email");
    this.validate.password(password, "password");

    //metodo de data para buscar un usuario ya logueado
    const found = data.users.findOne((user) => user.email === email);

    if (!found || found.password !== password)
      throw new CredentialsError("invalid credentials");

    data.userId = found.id;
  }