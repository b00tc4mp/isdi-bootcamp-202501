const uuid = () => {
    return (Date.now() + Math.random()).toString(36).replace('.', '');
}

export { uuid }