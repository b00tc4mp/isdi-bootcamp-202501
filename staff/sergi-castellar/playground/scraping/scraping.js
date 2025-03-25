import { extract } from '@extractus/article-extractor'

const input = 'http://www.clubdelbarman-abecat.com/es/listado-cocteles/'

// here we use top-level await, assume current platform supports it
try {
    const article = await extract(input)
    console.log(article)
} catch (err) {
    console.error(err)
}