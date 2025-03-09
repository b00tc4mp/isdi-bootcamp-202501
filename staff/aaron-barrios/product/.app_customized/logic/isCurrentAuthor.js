const logic = {
    isCurrentAuthor(author) {
        const { userId } = data

        if (author === userId)
            return true
        else
            return false
    },

    formatedDate(date) {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    }
}

export default logic