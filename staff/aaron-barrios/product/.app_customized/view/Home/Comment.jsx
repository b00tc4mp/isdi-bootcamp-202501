const { useState } = React

import logic from '../../logic/index.js'

function Comment({ comment }) {
    const [view, setView] = useState('')

    return < section >
        <article >
            <span style={{ display: "flex", alignItems: "center" }}>
                <img className="comPic" src="https://st3.depositphotos.com/1106647/35463/v/450/depositphotos_354630324-stock-illustration-cute-happy-avocado-character-funny.jpg" />

                <h3>Aguacate</h3>

                <time>3d</time>
            </span>

            <span >
                <p>Agua- cate </p>
                <button type="button">❤️</button>
            </span>
        </article>

        <article>
            <span style={{ display: "flex", alignItems: "center" }}>
                <img className="comPic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhuoV9tsVQPBTvYvcTew6LJOYu8cVcWsPcw&s" />

                <h3>Banana</h3>

                <time>5d</time>
            </span>

            <span >
                <p>Ba- nana </p>
                <button type="button">❤️</button>
            </span>
        </article>

        <div className='field'>
            <label htmlFor="comment">Wanna comment?</label>
            <input type="text" id="comment" />
        </div>
    </section >
}


export default Comment