import { useContext } from '../context';
import { logic } from '../logic/index';

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
    const { alert } = useContext();

    const handleLoginSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const { username: { value: username },
                password: { value: password }
            } = form;

            logic.loginUser(username, password)
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

    return <div className='flex flex-col align-center justify-center text-center min-h-screen w-full'>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="text" id="username" placeholder="Username" />
            </div>
            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="password" id="password" placeholder="Password" />
            </div>
            <div>
                <button className='w-50 cursor-pointer' type="submit">Login</button>
            </div>
        </form>
        <div className='text-base mt-[20px]'>
            <span>
                Don't have an account?
                <a className='ml-[12px]' onClick={onNavigateToRegister}>Sign Up</a>
            </span>
        </div>
    </div>
}