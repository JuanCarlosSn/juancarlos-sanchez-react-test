# Prueba técnica

## Correr el proyecto en producción

1. Clona el repositorio
2. Instala y actualiza

```bash
npm install
```

3. Construir el build:

```bash
npm run build
```

4. En caso de tener problema de rutas y que el servidor no esté configurado para manejar rutas de react, anexa un archivo llamado .htaccess con el siguiente código dentro de la carpeta build:

```bash
<IfModule mod_rewrite.c>

  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]

</IfModule>
```
5. Copiar la carpeta build generada en producción


## Para iniciar sesión el usuario es:

```bash
user1@prueba.com
```

## Y la contraseña:

```bash
Password1!
```