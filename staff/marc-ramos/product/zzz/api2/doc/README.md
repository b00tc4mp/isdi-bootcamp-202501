# API doc

## Metodos HTML:

## GET
```sh
GET: Obtener datos, recuperar información del servidor.
EJEMPLO: 
api.get('/users', (req, res) => {
    res.json({ message: 'Lista de usuarios' });
});
```

## POST 
```sh
POST: Crear datos, enviar datos al servidor y crear un nuevo recurso.
EJEMPLO:
api.post('/users', (req, res) => {
    const { name, age } = req.body;
    res.json({ message: 'Usuario creado', user: { name, age } });
});
````

## PUT
```sh
PUT: Actualizar datos, se usa para actualizar un recurso existente.
EJEMPLO:
api.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    res.json({ message: Usuario con ID ${id} actualizado, user: { name, age } });
});
````

## PATCH
```sh
PATCH: Actualizar parcialmente, se usa para actualizar solo algunos campos de un recurso.
EJEMPLO:
api.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    res.json({ message: Usuario con ID ${id} actualizado parcialmente, updates });
});
````

## DELETE
```sh
DELETE: Eliminar datos, se usa para eliminar un recurso
EJEMPLO:
api.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: Usuario con ID ${id} eliminado });
}); 
```