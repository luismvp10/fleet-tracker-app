
# **Fleet Monitoring System - Documentation**

## **1. Descripción General**
El **Fleet Monitoring System** es una aplicación web desarrollada con **React, Next.js y Tailwind CSS**, diseñada para el **monitoreo y gestión de flotas de vehículos en tiempo real**. Ofrece estadísticas detalladas, visualización en mapas interactivos y herramientas avanzadas de filtrado para mejorar la eficiencia operativa.

---

## **2. Arquitectura y Tecnologías**

### **2.1 Patrones Arquitectónicos**
- **Cliente-Servidor**: Comunicación entre frontend y APIs simuladas.
- **Arquitectura de Componentes**: Organización modular con **React**.
- **Estructura de Páginas de Next.js**: Uso del **App Router** para navegación y renderizado eficiente.

### **2.2 Tecnologías Principales**
- **Frontend**: React, Next.js, Tailwind CSS
- **Gestión de Estado**: Zustand, React Context API
- **Visualización de Datos**: Recharts (gráficos), Leaflet (mapas interactivos)
- **UI Components**: shadcn/ui
- **Autenticación Simulada**: localStorage

### **2.3 Capas del Sistema**
1. **Capa de Presentación**: UI, layouts y páginas.
2. **Capa de Lógica de Negocio**: Hooks personalizados, gestión de estado.
3. **Capa de Datos**: API simulada, almacenamiento en localStorage.

### **2.4 Flujo de Datos**
```
Usuario → Interfaz → Acciones → Store (Zustand) → API Mock → Actualización de UI
```

---

## **3. Casos de Uso**

### **3.1 Gestión de Usuarios**

#### **UC-101: Inicio de Sesión**
**Actor**: Administrador, Supervisor, Operador  
**Descripción**: Permite a los usuarios autenticarse en el sistema.  
**Flujo Principal**:
1. El usuario accede a la página de inicio.
2. Introduce su correo y contraseña.
3. El sistema valida las credenciales.
4. Si son correctas, se redirige al dashboard.
5. Si son incorrectas, se muestra un mensaje de error.

#### **UC-102: Cierre de Sesión**
**Actor**: Usuario autenticado  
**Descripción**: Permite cerrar la sesión del usuario.  
**Flujo Principal**:
1. El usuario hace clic en "Cerrar sesión".
2. El sistema invalida la sesión y redirige a la página de inicio.

### **3.2 Monitoreo de Flota**

#### **UC-201: Visualización del Dashboard**
**Actor**: Usuario autenticado  
**Descripción**: Permite ver métricas y estadísticas de la flota.  
**Flujo Principal**:
1. El usuario accede al dashboard.
2. El sistema carga y muestra datos clave en gráficos y tarjetas.

#### **UC-202: Exportación de Datos**
**Actor**: Usuario autenticado  
**Descripción**: Permite exportar información en formato CSV.  
**Flujo Principal**:
1. El usuario hace clic en "Exportar CSV".
2. El sistema genera el archivo y lo descarga automáticamente.

#### **UC-203: Monitoreo en Mapa**
**Actor**: Usuario autenticado  
**Descripción**: Muestra la ubicación de los vehículos en un mapa interactivo.  
**Flujo Principal**:
1. El usuario accede a la sección "Monitor".
2. Se cargan los vehículos en el mapa.
3. El usuario selecciona un vehículo y se resalta su ubicación.

#### **UC-204: Filtrado de Vehículos**
**Actor**: Usuario autenticado  
**Descripción**: Permite buscar y filtrar vehículos.  
**Flujo Principal**:
1. El usuario introduce un término de búsqueda.
2. El sistema filtra y muestra los vehículos coincidentes.

#### **UC-205: Paginación de Vehículos**
**Actor**: Usuario autenticado  
**Descripción**: Permite navegar entre páginas de vehículos.  
**Flujo Principal**:
1. El usuario hace clic en una página.
2. El sistema actualiza la lista de vehículos mostrados.

### **3.3 Gestión de Preferencias**

#### **UC-301: Cambio de Tema**
**Actor**: Usuario autenticado  
**Descripción**: Permite alternar entre tema claro y oscuro.  
**Flujo Principal**:
1. El usuario activa el botón de cambio de tema.
2. El sistema aplica y guarda la preferencia en localStorage.

### **3.4 Actualización de Datos**

#### **UC-401: Actualización Manual**
**Actor**: Usuario autenticado  
**Descripción**: Permite refrescar los datos de la interfaz manualmente.  
**Flujo Principal**:
1. El usuario hace clic en "Actualizar".
2. El sistema recarga los datos y actualiza la vista.

#### **UC-402: Regeneración de Datos de Gráficos**
**Actor**: Usuario autenticado  
**Descripción**: Simula la actualización de datos en los gráficos.  
**Flujo Principal**:
1. El usuario selecciona "Actualizar Datos".
2. El sistema regenera los datos y los muestra en los gráficos.

---

## **4. Pruebas y Cobertura**
Ejecute:
```
npm run test:coverage
```
