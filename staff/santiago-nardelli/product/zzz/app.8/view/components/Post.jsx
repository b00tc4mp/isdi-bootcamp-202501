import { useState } from "react";
import logic from "../../logic/logic.js";

function Post({ post, onToggleLikeClick, onDeleteClick, onModifyClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newImage, setNewImage] = useState(post.image);

  const handleToggleLikeClick = () => {
    try {
      logic.toggleLikePost(post.id);

      onToggleLikeClick();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleDeleteClick = () => {
    if (confirm("Delete post?"))
      try {
        logic.deletePost(post.id);

        onDeleteClick();
      } catch (error) {
        console.error(error);

        alert(error.message);
      }
  };

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    try {
      logic.modifyPost(post.id, newImage, newTitle);
      setIsEditing(false);
      onModifyClick();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleCancelClick = () => {
    try {
      setIsEditing(false);
      setNewImage(post.image);
      setNewTitle(post.title);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  console.debug("Post -> render");

  return (
    <article className="post-card">
      <h3 className="post-author">{post.author.name}</h3>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="post-image-input"
          />
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="post-title-input"
          />
        </>
      ) : (
        <>
          <img src={post.image} alt={post.title} className="post-image" />
          <p className="post-title">{post.title}</p>
        </>
      )}
      <div className="post-footer">
        <time className="post-date">
          {new Date(post.createdAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
        <div className="post-actions">
          <button
            onClick={handleToggleLikeClick}
            className={`like-button ${post.liked ? "liked" : ""}`}
          >
            {post.liked ? "♥️" : "🤍"} ({post.likesCount})
          </button>
          {post.own && (
            <>
              {isEditing ? (
                <>
                  <button onClick={handleSaveClick} className="save-button">
                    💾
                  </button>
                  <button onClick={handleCancelClick} className="cancel-button">
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleModifyClick} className="modify-button">
                    ✏️
                  </button>
                  <button onClick={handleDeleteClick} className="delete-button">
                    🗑️
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default Post;

//==== DESCRIPTION OF MY CODE ====

/*

  Este componente es un componente funcional que recibe como props un post, una funcion para modificar el post, otra para eliminarlo y otra para modificarlo(todas estas vienen desde mis compo Posts que lo que haces es el refresco de la vista para imprimir las variantes de interaccion ).


   En el return de mi componente Post, tengo un article que contiene la informacion del post, como el nombre del autor, la imagen, el titulo, la fecha de creacion y los botones de like, modificar y eliminar.



   ESTADOS:

   1-estado de isEditing que es un booleano que me permite saber si estoy editando un post o no.

   2-estado de title que es un string que me permite cambiar el titulo de un post.

    3-estado de image que es un string que me permite cambiar la imagen de un post.





      Hanadle metodo para modificar post 

  1-handleToggleLikeClick metodo para dar like a un post

  2-handleDeleteClick metodo para eliminar un post

  3-handleModifyClick metodo para modificar un post

  4-handleSaveClick metodo para guardar un post

  5-handleCancelClick metodo para cancelar la modificacion de un post

  6-handleEditTitleChange metodo para cambiar el titulo de un post

  7-handleEditImageChange metodo para cambiar la imagen de un post

  8-handleEditSaveClick metodo para guardar la modificacion de un post

  
  */
