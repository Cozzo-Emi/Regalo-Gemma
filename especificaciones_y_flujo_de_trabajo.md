# Documento de Especificaciones y Flujo de Trabajo: Regalos Gemma Sofía

## 1. Visión General del Proyecto
Aplicación web responsiva para la gestión y reserva en tiempo real de regalos de cumpleaños/baby shower para **Gemma Sofía**. La aplicación permitirá a los invitados ver los regalos disponibles, acceder al enlace de compra y reservar uno ingresando su nombre. Una vez reservado, el registro se bloquea permanentemente para evitar duplicados.

---

## 2. Definición del Stack Tecnológico
* **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+ / React + Vite)
* **Base de Datos & Tiempo Real:** Firebase Realtime Database
* **Hosting / Despliegue:** Netlify
* **Diseño Responsivo:** Layout adaptativo (Tabla en pantallas de escritorio / Cards en móviles)

---

## 3. Identidad Visual y Estilos

### Paleta de Colores
* **Fondo Principal:** `#FFF8F8` (Blanco hueso / Rosa crema suave)
* **Superficies (Cards/Tablas):** `#FFFFFF` (Blanco puro con sombras suaves)
* **Color Primario (Botones y destacados):** `#F472B6` (Rosa pastel cálido)
* **Color Secundario / Estado Reservado:** `#A7F3D0` (Verde menta suave) / `#9CA3AF` (Gris bloqueado)
* **Texto Principal:** `#1F2937` (Gris oscuro de alta legibilidad)

### Tipografía
* **Títulos y Encabezados:** *Quicksand* / *Fredoka* (Google Fonts)
* **Cuerpo y Formulario:** *Plus Jakarta Sans* / *Inter*

---

## 4. Estructura de Datos (Firebase Realtime Database)

```json
{
  "regalos": {
    "regalo_id_1": {
      "producto": "Cuna de madera",
      "precio": "$150.000",
      "link": "https://tienda.com/producto/123",
      "reservado": true,
      "regala_nombre": "Tía Marcela"
    },
    "regalo_id_2": {
      "producto": "Cochecito para bebé",
      "precio": "$220.000",
      "link": "https://tienda.com/producto/456",
      "reservado": false,
      "regala_nombre": ""
    }
  }
}
```

---

## 5. Arquitectura de Interfaz y Funcionalidades

### Vista de Invitados
1. **Encabezado:** Título con la estética definida para Gemma Sofía.
2. **Listado de Regalos:**
   * **Escritorio:** Tabla interactiva con columnas: *Producto/Dibujo*, *Precio*, *Link*, *Regala (Nombre)*.
   * **Móvil:** Tarjetas individuales con la misma información de forma vertical.
3. **Acciones:**
   * **Link de Compra:** Botón que abre el enlace del producto en una nueva pestaña (`target="_blank"`).
   * **Casilla de Selección/Reserva:**
     * Si está libre: Muestra campo de texto para ingresar nombre y botón de confirmación.
     * Si está reservado: Muestra el nombre de quien lo regala y deshabilita cualquier edición.
4. **Modal/Cartel de Confirmación:** Pop-up tras guardar la reserva ("¡Muchas gracias por tu regalo para Gemma Sofía!").

### Vista/Sección de Administración (Creador)
* Formulario directo en la misma aplicación para ingresar nuevos ítems:
  * Nombre del Producto / Imagen
  * Precio
  * URL / Link de la tienda

---

## 6. Checklist de Tareas para Ejecución

- [ ] **Fase 1: Configuración Inicial**
  - [ ] Crear el proyecto en la consola de Firebase.
  - [ ] Obtener las credenciales de conexión (`firebaseConfig`).
  - [ ] Crear la estructura de la base de datos en Firebase Realtime Database.

- [ ] **Fase 2: Estructura del Código Frontend**
  - [ ] Crear el archivo base `index.html` con la importación de Tailwind CSS y Google Fonts.
  - [ ] Configurar los estilos base con la paleta de colores.
  - [ ] Implementar el cliente JS de Firebase.

- [ ] **Fase 3: Interfaz y Lógica**
  - [ ] Diseñar el layout responsivo (Tabla / Cards).
  - [ ] Conectar la lectura en tiempo real con Firebase (`onValue`).
  - [ ] Desarrollar la lógica de reserva de regalos con bloqueo inmediato.
  - [ ] Implementar el cartel modal de confirmación.
  - [ ] Crear el formulario de alta de regalos (Sección Administrador).

- [ ] **Fase 4: Despliegue en Netlify**
  - [ ] Configurar el archivo de compilación/despliegue (`_redirects` o `netlify.toml` si aplica).
  - [ ] Subir el repositorio a GitHub o hacer deploy directo desde la CLI de Netlify.
  - [ ] Validar funcionamiento en dispositivos móviles y escritorio.