#INSTALACIÓN DEL PROYECTO

Descargar el proyecto de github (git clone o download)

Instalar NodeJs y NPM (ver https://www.ecodeup.com/como-instalar-node-js-y-su-gestor-de-paquetes-npm-en-windows/ )

Instalar Xampp y ejecutar MySQL.

Tomar el archivo database.sql que está en la raíz del proyecto e importarlo en el MySQL.

En la carpeta raíz del proyecto ejecutar el siguiente comando npm install

Para arrancar el proyecto, ejecutamos en la raíz del mismo el siguiente comando node src/server

Si aparece el siguiente mensaje: Server on port 3000 database is connected, significa que ya podremos ejecutar peticiones al servidor ya que está activo en localhost.


#EJECUTAR PETICIONES EN POSTMAN

##Para la tabla Usuario:

###Para registrar un nuevo usuario:
URL: http://localhost:3000/createuser
Tipo: POST
Información en el header: Content-Type: application/json
Datos en el body: {
	“id_usuario”: 123,
	“nombre”: “Nombre”,
	“direccion”: “Dirección”,
	“correo”: “email”,
	“contrasena”: “12345”,
	“telefono”: 45558
}

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send

###Para realizar el login de Usuario:

URL: http://localhost:3000/login
Tipo: GET
Información en el header: Content-Type: application/json
Datos en el body: {
	“id_usuario”: 123,
	“contrasena”: “12345”
}

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send
Esto nos dará un token, el cual necesitaremos para las peticiones de más adelante.

###Para obtener la lista de todos los usuarios

URL: http://localhost:3000/allusers
Tipo: GET
Damos click en Send

###Para obtener a un usuario específico

URL: http://localhost:3000/allusers/1
Dónde 1 sería el id del usuario a buscar.
Tipo: GET
Damos click en Send

##Para la tabla Producto:

Para obtener la lista de todos los productos:

URL: http://localhost:3000/allproducts
Tipo: GET
Damos click en Send

###Para agregar un producto:

URL: http://localhost:3000/addproduct
Tipo: POST
Información en el header: Content-Type: application/json
Autorization: Bearer token (Donde el token será el valor generado en la petición de login explicada anteriormente).
El usuario debe ser Administrador para poder realizar esta petición.
Datos en el body: {
	“name”: “Nombre producto”,
	“price”: 12313
}

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send

###Para editar un producto:

URL: http://localhost:3000/editproduct/123
Dónde 123 será el id del producto a editar
Tipo: POST
Información en el header: Content-Type: application/json
Autorization: Bearer token (Donde el token será el valor generado en la petición de login explicada anteriormente).
El usuario debe ser Administrador para poder realizar esta petición.
Datos en el body: {
	“name”: “Nombre producto”,
	“price”: 12313
}

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send

###Para eliminar un producto:

URL: http://localhost:3000/deleteproduct/123
Dónde 123 será el id del producto a eliminar
Tipo: POST
Información en el header: Content-Type: application/json
Autorization: Bearer token (Donde el token será el valor generado en la petición de login explicada anteriormente).
El usuario debe ser Administrador para poder realizar esta petición.

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send

##Para la tabla Pedido:

###Para crear un pedido:

URL: http://localhost:3000/create-order
Tipo: POST
Información en el header: Content-Type: application/json
Datos en el body: {
	“forma_de_pago”: “debito”,
	“direccion”: “Calle 123”,
	“productos”:[
	        {
                “id_producto”: 123,
                “cantidad”: 12
            },
            {
                    “id_producto”: 234,
                    “cantidad”: 5
            }
        ]
    }

En el atributo forma de pago, solo es válido colocar los siguientes valores, debito, credito, efectivo.

PD: los datos ingresados en el body anterior son datos de ejemplo, el usuario puede ingresar los datos que sean necesarios según el tipo de dato de cada atributo del JSON

Damos click en Send

###Para editar un pedido:

URL: http://localhost:3000/editorder/1234/Cancelado
Donde 1234 es el id de la orden y Cancelado, es el nuevo estado a editar.
Tipo: POST
Información en el header: Content-Type: application/json
Autorization: Bearer token (Donde el token será el valor generado en la petición de login explicada anteriormente).
El usuario debe ser Administrador para poder realizar esta petición.
Damos click en Send

###Para eliminar un pedido:

URL: http://localhost:3000/deleteorder/1234
Donde 1234 es el id de la orden.
Tipo: POST
Información en el header: Content-Type: application/json
Autorization: Bearer token (Donde el token será el valor generado en la petición de login explicada anteriormente).
El usuario debe ser Administrador para poder realizar esta petición.
Damos click en Send