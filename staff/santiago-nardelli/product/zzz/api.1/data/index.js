import { DataManagger } from './DataManagger.js'

export const data = {
    users: new DataManagger('users'),
    posts: new DataManagger('posts')
}