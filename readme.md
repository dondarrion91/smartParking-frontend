# SmartParking Frontend

## Instrucciones para correr el proyecto

### Instalar Nodejs y npm

-   https://tutobasico.com/instalar-nodejs-y-npm/

### Clonar repositorio

1.  Crear una carpeta vacia en tu computadora
2.  Abrir una terminal en esa carpeta creada
3.  Clonar repositorio `git clone git@github.com:dondarrion91/smartParking-frontend.git`

### Instalar dependencias de desarrollo

1. Abrir una terminal en carpeta raiz del proyecto
2. Ejecutar comando `npm install`

### Ejecutar entorno de desarrollo

1. Abrir una terminal en carpeta raiz del proyecto
2. Ejecutar comando `npm run dev`

### Configuración de prettier

1. Instalar extensión de visual studio code prettier https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
2. En visual studio code presionas Ctrl+Shift+P para abrir los comandos del editor.
3. Escribir setting.json y seleccionar Preferences: Open Settings (JSON)
4. Agregar en settings.json el siguiente bloque de codigo:

```
"[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

5. Probar modificar algun archivo y comprobar si se formatea el codigo.
