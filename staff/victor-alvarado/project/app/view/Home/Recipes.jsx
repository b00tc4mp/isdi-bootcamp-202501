import { useState, useEffect } from "react";

import { Recipe } from './Recipe'

import { logic } from '../../logic'
import { useContext } from '../../context';

export function Recipes({ targetUserId }) {
    const { alert } = useContext()
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        console.debug('Recipes -> useEffect')

        loadRecipes()
    }, [targetUserId])

    const loadRecipes = () => {
        try {
            (targetUserId ? logic.getUserRecipe(targetUserId) : logic.getRecipe())
                .then(recipes => setRecipes(recipes))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRecipeLikeToggled = () => loadRecipes()

    const handleRecipeDeleted = () => loadRecipes()

    const handleRecipesDescriptionEdited = () => loadRecipes()

    console.debug('Recipes -> render')

    return <section>
        {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe} onRecipeLikeToggled={handleRecipeLikeToggled} onRecipeDeleted={handleRecipeDeleted} onRecipeDescriptionEdited={handleRecipesDescriptionEdited} />)}
    </section>
}