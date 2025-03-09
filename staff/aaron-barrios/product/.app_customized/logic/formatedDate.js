const logic = {
    formatedDate(date) {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    }
}

export default logic