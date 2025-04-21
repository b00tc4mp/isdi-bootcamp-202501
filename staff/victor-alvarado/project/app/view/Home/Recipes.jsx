import { useState, useEffect } from "react";
import { Recipe } from './Recipe';
import { logic } from '../../logic';
import { useContext } from '../../context';

export function Recipes({ targetUserId }) {
    const { alert } = useContext();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Verifica que targetUserId tenga el formato correcto
    const validateUserId = (userId) => {
        return typeof userId === 'string' && userId.length === 24;
    };

    const loadRecipes = () => {
        if (loading) return;

        setLoading(true);

        // Asegúrate de que targetUserId sea válido antes de enviarlo al backend
        if (targetUserId && !validateUserId(targetUserId)) {
            alert('Invalid userId');
            setLoading(false);
            return;
        }

        const fetchRecipes = targetUserId ? logic.getUserRecipe(targetUserId) : logic.getRecipe();

        fetchRecipes
            .then(recipes => {
                setRecipes(recipes);  // Simplemente asignamos las recetas sin ningún filtro
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadRecipes();
    }, [targetUserId]);

    const handleRecipeLikeToggled = () => loadRecipes();
    const handleRecipeDeleted = () => loadRecipes();
    const handleRecipesDescriptionEdited = () => loadRecipes();

    return (
        <section>
            {/* Elimina el componente RecipeSearch */}

            {recipes.length === 0 && !loading ? (
                <p>No recipes found.</p>
            ) : (
                recipes.map(recipe => (
                    <Recipe
                        key={recipe.id}
                        recipe={recipe}
                        onRecipeLikeToggled={handleRecipeLikeToggled}
                        onRecipeDeleted={handleRecipeDeleted}
                        onRecipeDescriptionEdited={handleRecipesDescriptionEdited}
                    />
                ))
            )}
        </section>
    );
}
