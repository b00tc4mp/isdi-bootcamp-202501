//ELEMENTOS INMUTABLES
const title = React.createElement('h1', { children: 'Hello, Calculator! 🧮' });

const number1Label = React.createElement('label', { children: 'Number 1' });
const number1Input = React.createElement('input', { type: 'number', name: 'number1' });

const number2Label = React.createElement('label', { children: 'Number 2' });
const number2Input = React.createElement('input', { type: 'number', name: 'number2' });

let resultParagraph = React.createElement('p', { children: 'Result: ' });

const submitButton = React.createElement('button', { type: 'submit', children: '=' });

const form = React.createElement('form', {
    children: [
        number1Label,
        number1Input,
        number2Label,
        number2Input,
        submitButton
    ],

    onSubmit(event) {
        event.preventDefault();

        const domForm = event.target;
        const domNumber1Input = domForm.querySelector('input[name=number1]')
        const domNumber2Input = domForm.querySelector('input[name=number2]')

        const number1 = Number(domNumber1Input.value)
        const number2 = Number(domNumber2Input.value)

        const result = number1 + number2

        resultParagraph = React.createElement('p', { children: `Result: ${result}` })

        root.render([title, form, resultParagraph])
    }
});

const rootElement = document.querySelector('div#root');
const root = ReactDOM.createRoot(rootElement);
root.render([title, form, resultParagraph]);
