import { logic } from "../logic/index";
import { errors } from "com";
import { useContext } from "../context";

const { SystemError, ValidationError } = errors

export function Register({ onUserRegistered, onNavigateToLogin }) {
    const { alert } = useContext()

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

                    alert('user has been created')
                })
                .catch(error => {
                    console.error(error);

                    alert(error.message)
                })
        } catch (error) {
            console.error(error);

            alert(error.message)
        }
    }


    return <div className="flex flex-col items-center justify-center text-center min-h-screen w-full px-4 space-y-8">
        <h1 className="text-white text-3xl">Fitrack</h1>
        <img src="assets/logo.svg" className="w-32 h-32 md:w-40 md:h-40"></img>

        <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Register</h1>

            <form className='flex flex-col space-y-4' onSubmit={handleRegisterSubmit}>
                <div>
                    <input type="Email" id="email" placeholder="Email" required />
                </div>

                <div>
                    <input type="text" id="username" placeholder="Username" required />
                </div>

                <div>
                    <input type="password" id="password" placeholder="Password" required />
                </div>

                <div>
                    <button className="w-full py-3 rounded-2xl font-semibold bg-orange-500 hover:bg-orange-600 cursor-pointer">Register</button>
                </div>
            </form>
        </div>
        <div className='text-white text-base mt-[7px]'>
            <span>
                Already have an account?
                <a className='font-bold ml-[12px] cursor-pointer' onClick={onNavigateToLogin}>Login</a>
            </span>
        </div>
    </div>
}