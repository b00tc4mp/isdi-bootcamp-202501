import { useState } from "react";
import { useNavigate } from 'react-router';

import { logic } from '../../logic';
import { useContext } from '../../context';

export function Recipe({ recipe, onRecipeLikeToggled, onRecipeDeleted, onRecipeDescriptionEdited }) {
    const { alert, confirm } = useContext();
    const [view, setView] = useState('');

    const navigate = useNavigate();

    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikeRecipe(recipe.id)
                .then(() => onRecipeLikeToggled())
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const handleDeleteClick = () => {
        confirm('Delete recipe?')
            .then(accepted => {
                if (accepted) {
                    try {
                        logic.deleteRecipe(recipe.id)
                            .then(() => onRecipeDeleted())
                            .catch(error => {
                                console.error(error);
                                alert(error.message);
                            });
                    } catch (error) {
                        console.error(error);
                        alert(error.message);
                    }
                }
            });
    };

    const handleEditDescriptionClick = () => setView('edit-description');
    const handleEditDescriptionCancelClick = () => setView('');

    const handleEditDescriptionSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;
            const { description: { value: description } } = form;

            logic.updateRecipeDescription(recipe.id, description)
                .then(() => {
                    onRecipeDescriptionEdited();
                    setView('');
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleUsernameClick = () => navigate(`/${recipe.author.username}`, {
        state: { userId: recipe.author.id }
    });

    return (
        <article className="Post">
            <h3 className="px-[var(--padding-x)] cursor-pointer" onClick={handleUsernameClick}>
                {recipe.author.username}
            </h3>

            <div className="flex justify-center my-4">
                <img
                    className="max-w-xs w-full h-48 object-cover rounded-lg"
                    src={recipe.image}
                    alt="Recipe image"
                />
            </div>

            {view === '' && (
                <p className="px-[var(--padding-x)]">{recipe.description}</p>
            )}

            {view === 'edit-description' && (
                <form onSubmit={handleEditDescriptionSubmit} className="px-[var(--padding-x)] space-y-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        defaultValue={recipe.description}
                        className="w-full border p-1"
                    />

                    <div className="flex gap-2">
                        <button type="button" className="secondary" onClick={handleEditDescriptionCancelClick}>
                            Cancel
                        </button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            )}

            <div className="px-[var(--padding-x)] flex justify-between items-center mt-2 text-sm">
                <time>{new Date(recipe.createdAt).toISOString()}</time>

                <button onClick={handleToggleLikeClick}>
                    {`${recipe.liked ? '♥️' : '🤍'} (${recipe.likesCount})`}
                </button>

                {recipe.own && (
                    <>
                        <button onClick={handleEditDescriptionClick} title="Edit description">
                            📝
                        </button>

                        <button onClick={handleDeleteClick} title="Delete recipe">
                            🗑️
                        </button>
                    </>
                )}
            </div>
        </article>
    );
}
