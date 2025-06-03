const formatDate = (
    date: Date | string
) =>
    new Date(date).toLocaleDateString("default", { day: "numeric", month: "short", year: "numeric" })

export default formatDate