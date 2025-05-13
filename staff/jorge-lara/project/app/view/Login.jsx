import { useContext } from "..//context";
import { logic } from "../logic";

export function Login({ onUserLoggedIn, onNavigateToRegister }) {
    const { alert } = useContext()
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

                    alert(error.message);
                })
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <div className='flex flex-col items-center justify-center text-center min-h-screen w-full px-4 space-y-8'>
        <h1 className="text-white text-3xl">Fitrack</h1>
        <img src="assets/logo.svg" className="w-32 h-32 md:w-40 md:h-40"></img>

        <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Login</h1>

            <form className="flex flex-col space-y-4" onSubmit={handleLoginSubmit}>
                <div>
                    <input type="text" id="email" placeholder="Email" required />
                </div>
                <div>
                    <input type="password" id="password" placeholder="Password" required />
                </div>
                <div>
                    <button className="w-full py-3 rounded-2xl font-semibold bg-orange-500 hover:bg-orange-600 cursor-pointer" type="submit">Login</button>
                </div>
            </form>
        </div>
        <div className='text-white text-base mt-[7px]'>
            <span>
                Don't have an account?
                <a className='font-bold ml-[12px] cursor-pointer' onClick={onNavigateToRegister}>Register</a>
            </span>
        </div>

    </div>
}