import { logic } from "../logic";

export function Login({ onUserLoggedIn }) {

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const { email: { value: email },
                password: { value: password }
            } = form;

            logic.loginUser(email, password)
                .then(() => {
                    form.reset();

                    onUserLoggedIn();
                })
                .catch(error => {
                    console.error(error);

                    //TODO alert context
                })
        } catch (error) {
            console.error(error);
        }
    }

    return <div className='flex flex-col'>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
            <div className='flex flex-col '>
                <input type="text" id="email" placeholder="Email" />
            </div>
            <div className='flex flex-col'>
                <input type="password" id="password" placeholder="Password" />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
}