import { logic } from "../logic/index";

export function Register({ onUserRegistered }) {

    const handleRegisterSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const {
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form;

            logic.registerUser(email, username, password)
                .then(() => {
                    form.reset();

                    onUserRegistered();
                })
                .catch(error => {
                    console.error(error);

                    //TODO alert context
                })
        } catch (error) {
            console.error(error);

            //TODO alert context
        }
    }


    return <div>
        <h1>Register</h1>
        <form className='flex flex-col' onSubmit={handleRegisterSubmit}>
            <div>
                <input type="email" id="email" placeholder="email" />
            </div>

            <div>
                <input type="text" id="username" placeholder="Username" />
            </div>

            <div>
                <input type="password" id="password" placeholder="Password" />
            </div>

            <div>
                <button>Register</button>
            </div>
        </form>
    </div>
}