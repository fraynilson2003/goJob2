# ADMIN

## Eliminar user logico delete( "/admin/user/delete )
```
ruta del admin para eliminar

body
{
    id: id (id del user a inactivar)
}
```

## Reactivar user logico put( "/admin/user/update )
```
ruta del admin para activar user

body
{
    id: id (id del user a inactivar)
    ... todas las propiedades que quiero modificar
}
(mirar modelos para evitar fallos en las propiedades)
```


