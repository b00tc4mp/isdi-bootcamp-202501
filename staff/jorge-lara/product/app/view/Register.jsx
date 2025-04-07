import { logic } from '../logic/index';
import { errors } from 'com'
import { useContext } from '../context';

const { SystemError, ValidationError } = errors;

export function Register({ onNavigateToLogin, onUserRegistered }) {
    const { alert } = useContext();

    const handleRegisterSubmit = event => {
        event.preventDefault();

        try {
            const { target: form } = event;

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password }
            } = form;

            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset();

                    onUserRegistered();
                })
                .catch(error => {
                    console.error(error);

                    if (error instanceof SystemError)
                        alert('⛔️ ' + error.message);
                    else
                        alert('⚠️ ' + error.message);
                })
        } catch (error) {
            console.error(error);

            if (error instanceof ValidationError)
                alert('❗️ ' + error.message);
            else
                alert('⛔️ ' + error.message);
        }
    }

    return <div className='flex flex-col items-center justify-center text-center min-h-screen w-full'>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="text" id="name" placeholder="Name" />
            </div>

            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="email" id="email" placeholder="Email address" />
            </div>

            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="text" id="username" placeholder="Username" />
            </div>

            <div className='flex flex-col w-full mb-[1rem] border border-white'>
                <input type="password" id="password" placeholder="Password" />
            </div>

            <div>
                <button className='w-50 cursor-pointer' type="submit">Register</button>
            </div>
        </form>
        <div className='text-base mt-[20px]'>
            <span>
                Already have an account?
                <a className='ml-[12px]' onClick={onNavigateToLogin}>Login</a>
            </span>
        </div>

    </div>
}