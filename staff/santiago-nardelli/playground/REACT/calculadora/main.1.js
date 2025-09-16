const rootElement = document.querySelector('div#root');
const root = ReactDOM.createRoot(rootElement);
const title = React.createElement('h1', {children: 'Calculadora'});
const number1Label = React.createElement('label', {children: 'Número 1'});
const number1Input = React.createElement('input', {type: 'number', name: 'number1'});
const number2Label = React.createElement('label', {children: 'Número 2'});
const number2Input = React.createElement('input', {type: 'number', name: 'number2'});
const operationLabel = React.createElement('label', {children: 'Operación'});
const operationInput = React.createElement('input', {type: 'text', name: 'operation'});
const submitButton = React.createElement('button', {type: 'submit', children: '='});
const form = React.createElement('form', {

    children: [
        number1Label,
        number1Input,
        number2Label,
        number2Input,
        operationLabel,
        operationInput,
        submitButton,
    ],
    onSubmit(event) {
        event.preventDefault();
        const domForm = event.target;
        //Numero 1
        const domNumber1 = domForm.querySelector('input[name=number1]');
        //Numero 2
        const domNumber2 = domForm.querySelector('input[name=number2]');
        //Operacion value
        const domOperation = domForm.querySelector('input[name=operation]');
        
        //Captura de valores
        const number1 = Number(domNumber1.value);
        const number2 = Number(domNumber2.value);
        const operation = domOperation.value;
        

       
        let resultValue;
        switch (operation) {
            case '+':
                resultValue = number1 + number2;
                break;
            case '-':
                resultValue = number1 - number2;
                break;
            case '*':
                resultValue = number1 * number2;
                break;
            case '/':
                resultValue = number1 / number2;
                break;
            default:
                resultValue = 'Operación no válida';
        }
            console.info(resultValue);
            const result = React.createElement('p', {children: 'Resultado: ' + resultValue});

            root.render([title, form, result]);

    }
});

root.render([title, form]);


