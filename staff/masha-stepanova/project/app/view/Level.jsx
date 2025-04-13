export function Level(level) {
    console.log(level, level.id, level.name)

    //TODO averiguar por que level llega como objeto con propiedad level

    return <>
        <h1>Hello {level.level.name}</h1>
    </>
}