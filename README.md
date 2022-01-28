# NodeApp

Para iniciar la aplicación:

```sh
npm install
```

En produción:

```sh
npm start
```

En desarrollo:

```sh
npm run dev
```

## Inicilizar la BD

Para inicializar la BD al estado inicial, se puede usar el comando:

```sh
nodemon initDB.js
```

* ATENCION * Esto borrará todos los datos de la BD y cargará el estado inicial.

## Métodos del API

El API se accede en /api/

Lista de anuncios:

- /api/anuncios


Lista de tags:

- /api/tags

Filtros:

# ¡¡¡AVISO A NAVEGANTES!!!, cada anuncio contiene estos campos: nombre, venta, precio, tags y foto; y están EN CASTELLANO, si realizas las búsquedas con los campos en ingles (ej: /api/anuncios/?name=bici) no conseguirás encontrar nada.
- http://localhost:3000/api/anuncios/?nombre='Smith'&age=30

Paginación:
- http://localhost:3000/api/anuncios/?skip=4&limit=2

Eligiendo que campos quiero:
- http://localhost:3000/api/anuncios/?select=nombre -_id

Ordenación:
- http://localhost:3000/api/anuncios/?sort=nombre



Crear un anuncio:

- POST /api/agentes

