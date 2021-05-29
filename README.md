# TodoList - Aspectos técnicos

Versión de Angular empleada ==> 11.2.10

Versión de Node empleada ==> 14.15.1

-----------------------------------------------------------------------------------
El proyecto dispone de 5 componentes, 1 modelo y 1 servicio:

  •	Componentes:

   o	ToolBar ==> Almacena todo el código relacionado con la barra de navegación.

   o	Index ==> Almacena todo el código relacionado con la lista de todas las actividades pendientes, que pueden ser ordenadas por título, fecha, prioridad y por estados.

   o	Form ==> Almacena todo el código relacionado con el formulario para crear una actividad, incluyendo título, fecha y prioridad.

   o	Form-edit-dialog ==> Almacena todo el código relacionado con el formulario para editar cualquier actividad pendiente en el componente Index.

   o	History ==> Almacena todo el código relacionado con la lista de las actividades completadas, que pueden ser ordenadas por título y fecha.

----------------------------------------------------------------------------
  
  •	Modelo:

   o	Almacena todo el código relacionado con las diferentes variables que representan a una actividad (título, descripción, estado…).

  ----------------------------------------------------------------------------
  
  •	Servicio:

   o	Almacena todo el código relacionado con la base de datos, para almacenar toda la información de las diferentes.

----------------------------------------------------------------------------

## Base de datos
Como base de datos, he usado Google Firebase para almacenar toda la información necesaria para la creación de una actividad, 
por lo que he tenido que instalar la librería @angular/fire en mi proyecto.


## Angular Material
Con respecto a la librería de Angular Material, he usado los siguientes componentes:

1.	MatToolbarModule ==> Para la barra de navegación.
2.	MatIconModule ==> Para los iconos de la barra de navegación.
3.	MatButtonModule ==> Para los botones de todas las páginas de la app.
4.	MatInputModule ==> Para los inputs de los formularios.
5.	MatFormFieldModule ==> Para el estilo de los inputs de los formularios.
