const formatedDate = (date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}