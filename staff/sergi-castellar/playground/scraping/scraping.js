import { JSDOM } from 'jsdom'
import { extract } from '@extractus/article-extractor'
import { write, writeFileSync } from 'fs'

const input = 'http://www.clubdelbarman-abecat.com/es/listado-cocteles/'

let scraped

try {
    scraped = await extract(input)
} catch (err) {
    console.error(err)
}
let htmlContent = scraped.content

const dom = new JSDOM(htmlContent);
const document = dom.window.document;

let cocktails = [];

document.querySelectorAll('h2').forEach((cocktailElement) => {
    let name = cocktailElement.textContent.trim();

    let imgSrcContentElement = cocktailElement.nextElementSibling
    let imgSrc = imgSrcContentElement.querySelector('img') ? cocktailElement.nextElementSibling.querySelector('img').src : '';

    let ingredients = [];
    let dressings = [];
    let observations = [];

    let ingredientsContentElement = imgSrcContentElement.nextElementSibling
    let ingredientsP = imgSrcContentElement.nextElementSibling.textContent

    let dressingsContentElement = ingredientsContentElement.nextElementSibling
    let dressingsP = ingredientsContentElement.nextElementSibling.textContent

    let observationsContentElement = dressingsContentElement.nextElementSibling
    let observationsP = dressingsContentElement.nextElementSibling.textContent

    //console.log('P elements :>> ', `${ingredientsP}\n${dressingsP}\n${observationsP}`);

    const ingredientsSplit = ingredientsP.split('\n')
    const dressingsSplit = dressingsP.split('\n')
    const observationsSplit = observationsP.split('\n')

    for (let i = 1; i < ingredientsSplit.length; i++) {
        let element = ingredientsSplit[i]
        ingredients.push(element)
    }

    for (let i = 1; i < dressingsSplit.length; i++) {
        let element = dressingsSplit[i]
        dressings.push(element)
    }

    for (let i = 1; i < observationsSplit.length; i++) {
        let element = observationsSplit[i]
        observations.push(element)
    }

    cocktails.push({
        name,
        imgSrc,
        ingredients,
        dressings,
        observations,
    });
});

console.log(cocktails.length);

// const json = JSON.stringify(cocktails, null, 4)
// writeFileSync('./data.json', json)
