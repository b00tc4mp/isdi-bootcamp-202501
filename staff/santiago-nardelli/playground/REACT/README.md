# REACT Cheat Sheet 

![REACT LOGO](https://imgs.search.brave.com/-wRYfmc8MFTE9dYoFBioZSxfu45QaJyuKfJ3h68gZGM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtMy82/MDAvUmVhY3QuanNf/bG9nby01MTIucG5n)

## React DOM

El React DOM es una biblioteca que permite a React interactuar con el DOM (Document Object Model) del navegador. Es una parte fundamental de React que nos permite renderizar y actualizar elementos en la página web.

El Virtual DOM de React es un sistema de abstracción que actúa como una capa intermedia entre el código JavaScript y el DOM del navegador, manteniendo una representación en memoria de la estructura de la interfaz de usuario. Este sistema optimiza el rendimiento de las aplicaciones web al minimizar las actualizaciones del DOM real mediante un proceso de diferenciación inteligente que identifica y aplica solo los cambios necesarios.

### Características principales:

#### Arquitectura en Capas
- Mantiene una copia virtual del DOM en memoria
- Actúa como intermediario entre el código React y el DOM real
- Gestiona un ciclo de vida de actualización eficiente

#### Optimizaciones de Rendimiento
- Actualizaciones parciales del DOM real
- Detección inteligente de cambios
- Batching de múltiples actualizaciones
- Reutilización de elementos sin cambios

#### Gestión de Estado
- Mantiene dos copias del árbol DOM
- Implementa un sistema de diferenciación eficiente
- Gestiona el ciclo de vida de componentes
- Optimiza la liberación de memoria

#### Características Técnicas
- Inmutabilidad de objetos
- Sistema de keys para identificación
- Algoritmo de diferenciación optimizado
- Gestión eficiente de eventos

#### Limitaciones
- Mayor consumo de memoria
- Complejidad adicional en el código
- Requiere gestión de estado
- Puede ser complejo en aplicaciones grandes



## HOOKS


#### useState 

* El hook useState se puede considerar como un array de dos elementos: el estado actual y la función para actualizarlo. 

* El hook useState es una herramienta fundamental en React que nos permite agregar estado a nuestros componentes funcionales. Es la forma moderna de manejar datos que pueden cambiar en nuestra aplicación, como:

* Valores numéricos (contadores, puntajes)
* Textos (formularios, mensajes)
* Booleanos (flags, switches)
* Arrays u objetos (listas, configuraciones)

#### useEffect


* El hook useEffect es una herramienta fundamental en React que nos permite manejar efectos secundarios (side effects) en nuestros componentes funcionales. Un efecto secundario es cualquier operación que afecta algo fuera del componente mismo, como:

* Actualizar el título de la página
* Realizar peticiones HTTP
* Configurar temporizadores o intervalos
* Escuchar eventos del DOM
* Manipular el localStorage


#### Conceptos Clave y Recomendaciones
* Cuándo usar useEffect:
Al necesitar actualizar el DOM directamente
Para configurar y limpiar eventos
Al hacer peticiones HTTP
Para configurar temporizadores o intervalos
Para interactuar con APIs del navegador
* Dependencias:
[] vacío: ejecuta una vez al montar
[dep1, dep2]: ejecuta cuando cambian las dependencias
Sin array: ejecuta en cada renderizado (evitar)
* Limpieza:
Siempre limpiar intervalos y timeouts
Cancelar peticiones HTTP pendientes
Remover listeners de eventos
Desuscribirse de WebSockets
* Buenas Prácticas:
Mantener los efectos pequeños y enfocados
Incluir todas las dependencias necesarias
Usar tipos TypeScript para mejor seguridad
Implementar limpieza cuando sea necesario