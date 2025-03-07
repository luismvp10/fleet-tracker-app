
# Guía para levantar el proyecto usando Docker

## 1. Construir la Imagen de Docker
Asegúrate de que el `Dockerfile` esté en la raíz del proyecto. Luego, en la terminal, navega a la carpeta del proyecto y ejecuta:

```bash
docker build -t nombre-del-proyecto .
```

Esto construirá la imagen de Docker para el proyecto y la etiquetará con el nombre `nombre-del-proyecto`.

## 2. Levantar el Contenedor
Una vez construida la imagen, ejecuta el siguiente comando para iniciar el contenedor:

```bash
docker run -p 3000:3000 nombre-del-proyecto
```

Esto levantará el proyecto y lo hará disponible en `http://localhost:3000`.

## 3. Otros Comandos Útiles
- **Ver los contenedores activos**:
  ```bash
  docker ps
  ```

- **Detener un contenedor**:
  ```bash
  docker stop <ID_DEL_CONTENEDOR>
  ```

- **Eliminar un contenedor**:
  ```bash
  docker rm <ID_DEL_CONTENEDOR>
  ```

- **Eliminar una imagen**:
  ```bash
  docker rmi nombre-del-proyecto
  ```


# Guía para levantar el proyecto sin Docker

## 1. Instalar las Dependencias
Antes de ejecutar el proyecto, asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Si no los tienes, puedes descargarlos desde [aquí](https://nodejs.org/).

Una vez tengas Node.js y npm instalados, navega a la carpeta de tu proyecto y ejecuta el siguiente comando para instalar las dependencias definidas en el archivo `package.json`:

```bash
npm install
```

## 2. Levantar el Proyecto en Modo de Desarrollo
Una vez que las dependencias estén instaladas, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará el servidor y podrás acceder a la aplicación en tu navegador en la siguiente URL:

```
http://localhost:3000
```

## 3. Comandos Adicionales
- **Ejecutar los Tests**: Para correr los tests con Jest:

  ```bash
  npm test
  ```

- **Verificar la cobertura de los Tests**:

  ```bash
  npm run test:coverage
  ```

- **Construir la aplicación para producción**:

  ```bash
  npm run build
  ```

- **Iniciar la aplicación en producción**:

  ```bash
  npm run start
  ```

## 4. Acceder a la Aplicación
Después de ejecutar `npm run dev`, podrás ver la aplicación corriendo en tu navegador en la dirección `http://localhost:3000`.
