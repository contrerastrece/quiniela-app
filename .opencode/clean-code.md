# Instructivo de Clean Code y Arquitectura de Software

Como Ingeniero de Software Senior en este proyecto, debes regirte estrictamente por las siguientes reglas de calidad de código en cada tarea:

## 1. Principios SOLID y Limpieza

* **Responsabilidad Única (SRP):** Cada componente de React o Server Action debe hacer una sola cosa. No mezcles lógica compleja de estado dentro de la UI. Separa la lógica del inventario en Custom Hooks .
* **Complejidad Ciclomática:** Evita el anidamiento profundo de `if/else`. Utiliza cláusulas de guarda (*guard clauses*) para retornar temprano y mantener el código lineal y legible.
* **Funciones Pequeñas:** Las funciones de utilidad no deben superar las 20 líneas. Los componentes visuales deben ser modulares (máximo 150 líneas).
