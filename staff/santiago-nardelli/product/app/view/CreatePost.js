class CreatePost extends Section {
  constructor() {
    super();

    const form = new Form();
    form.container.style.display = "flex";
    form.container.style.flexDirection = "column";
    form.container.style.alignItems = "center";
    form.container.style.justifyContent = "center";
    form.addSubmitListener(
      function (e) {
        e.preventDefault();

        try {
          //Obtener los valores del formulario
          const image = form.getValues();
          const title = form.getValues();

          //Crear en logic un metodo que se llame createPost
          logic.createPost(image, title);

          form.clear();

          this.createPostClickListener();
        } catch (error) {
          console.error(error);

          alert(error.message);
        }
      }.bind(this)
    );
    this.add(form);

    const imageInput = new Input();
    imageInput.container.type = "url";
    imageInput.container.name = "image";
    imageInput.container.placeholder = "Image";
    form.add(imageInput);

    const titleInput = new Input();
    titleInput.container.type = "text";
    titleInput.container.name = "title";
    titleInput.container.placeholder = "Title";
    form.add(titleInput);

    const submitButton = new Button();
    submitButton.container.type = "submit";
    submitButton.container.textContent = "Create";
    form.add(submitButton);

    const cancelButton = new Link();
    cancelButton.container.href = "#";
    cancelButton.container.textContent = "Cancel";
    cancelButton.addClickListener(
      function () {
        form.clear();

        this.cancelClickListener();
      }.bind(this)
    );
    form.add(cancelButton);
  }

  //creo este metodo para poder acceder al contenedor desde la instancia de la clase, sino no podria
  addCreatePostSubmitListener(listener) {
    this.createPostSubmitListener = listener;
  }
  /*
  Propósito: Este método permite agregar un listener externo para el evento de submit de creación de post.
Parámetro: Recibe un parámetro listener, que es una función que se ejecutará cuando se envíe el formulario de creación de post.
Asignación: Asigna el listener proporcionado a la propiedad this.createPostSubmitListener de la instancia de la clase.
Uso Interno: Dentro del constructor, cuando se envía el formulario (form.addSubmitListener), se llama a this.createPostSubmitListener() si está definido. Esto permite que la lógica de lo que debe suceder cuando se crea un post se defina externamente y se ejecute en el momento adecuado
*/

  //creo este metodo para poder acceder al contenedor desde la instancia de la clase, sino no podria
  addCancelClickListener(listener) {
    this.cancelClickListener = listener;
  }
  /*
  Propósito: Este método permite agregar un listener externo para el evento de click de cancelación.
Parámetro: Recibe un parámetro listener, que es una función que se ejecutará cuando se haga clic en el botón de cancelación.
Asignación: Asigna el listener proporcionado a la propiedad this.cancelClickListener de la instancia de la clase.
Uso Interno: Dentro del constructor, cuando se hace clic en el botón de cancelación (cancelButton.addClickListener), se llama a this.cancelClickListener() si está definido. Esto permite que la lógica de lo que debe suceder cuando se cancela la creación de un post se defina externamente y se ejecute en el momento adecuado. */
}
/*Métodos addCreatePostSubmitListener y addCancelClickListener:

1-Estos métodos permiten agregar listeners externos para los eventos de submit de creación de post y click de cancelación, respectivamente.
this.createPostSubmitListener = listener; y this.cancelClickListener = listener; asignan los listeners proporcionados a las propiedades de la instancia de la clase, permitiendo que los métodos internos (createPostSubmitListener y cancelClickListener) llamen a estos listeners cuando sea necesario.

2-¿Por Qué Son Necesarios?

Flexibilidad y Reutilización: Los métodos addCreatePostSubmitListener y addCancelClickListener permiten que otros componentes o partes de tu aplicación puedan definir qué debe suceder cuando se envía el formulario o se cancela la creación del post. Esto hace que tu código sea más modular y reutilizable.

Separación de Responsabilidades: Al definir estos listeners externamente, separas la lógica de presentación (cómo se ve y se comporta el formulario) de la lógica de negocio (qué sucede cuando se crea o se cancela un post). Esto sigue el principio de separación de responsabilidades, haciendo que tu código sea más fácil de mantener y entender.

Manejo de Eventos: Asignar los listeners a propiedades de la instancia (this.createPostSubmitListener y this.cancelClickListener) permite que los métodos internos puedan llamar a estos listeners cuando sea necesario, asegurando que los eventos se manejen correctamente.
Estos métodos y la forma en que los has implementado son esenciales para crear una aplicación bien estructurada y fácil de mantener.
*/
