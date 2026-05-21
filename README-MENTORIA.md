# 🎓 Mentoría Angular: Routing, Guards y ViewChild

---

## 🎯 MENÚ DE PRESENTACIÓN

> **👉 ¿VAS A DAR LA CLASE? [ABRE EL MENÚ DE TEMAS AQUÍ →](MENU-TEMAS-PRESENTACION.md)**

Este menú visual contiene:
- ✅ Todos los temas organizados por bloques con tiempos
- ✅ Lista de qué archivos mostrar en cada tema
- ✅ Demos específicas del navegador para cada concepto
- ✅ Hoja de ruta completa de 4 horas
- ✅ Tips para el instructor

---

## 📋 Descripción

Este proyecto contiene una **aplicación Angular completa** diseñada específicamente para enseñar los conceptos fundamentales de Angular moderna a través de ejemplos prácticos y código real.

## 🎯 Objetivos de Aprendizaje

Al finalizar esta mentoría, los estudiantes serán capaces de:

✅ Configurar y usar el sistema de routing de Angular  
✅ Crear enlaces de navegación sin recargas con RouterLink  
✅ Implementar guards para proteger rutas sensibles  
✅ Aplicar lazy loading para optimizar performance  
✅ Manipular elementos del DOM con ViewChild/ViewChildren  
✅ Entender content projection con ContentChild/ContentChildren  
✅ Conocer la nueva sintaxis de Signals (Angular 17+)  

---

## 📚 Recursos Incluidos

### 0. **MENU-TEMAS-PRESENTACION.md** 🎯
**Menú visual para presentaciones** con:
- Hoja de ruta completa de 4 horas con tiempos
- Todos los 33 temas organizados en bloques
- Lista de archivos a mostrar en cada tema
- Demos específicas del navegador
- Tips para el instructor
- Resumen visual de conceptos

**Mejor para:** Tener abierto durante la presentación, mostrar al inicio de la clase

---

### 1. **GUIA-MENTORIA-ANGULAR.md** 📖
**Guía completa y detallada** con:
- Explicación profunda de cada concepto
- Analogías del mundo real
- Código del proyecto con comentarios
- Secciones: ¿Qué es? ¿Para qué? ¿Dónde? ¿Cuándo? ¿Por qué?
- Pruebas prácticas paso a paso

**Mejor para:** Estudiar en profundidad, referencia durante la clase

### 2. **REFERENCIA-RAPIDA.md** ⚡
**Cheatsheet de consulta rápida** con:
- Snippets de código listos para copiar
- Tablas comparativas
- Sintaxis de decoradores vs signals
- Errores comunes a evitar
- Comandos CLI útiles

**Mejor para:** Consulta rápida mientras codeas, tener impreso a mano

### 3. **EJERCICIOS-PRACTICOS.md** 📝
**9 ejercicios prácticos** organizados en 3 niveles:
- **Básico:** Guard premium, scroll suave, contador de clicks
- **Intermedio:** Validación de formularios, breadcrumbs, tabs
- **Avanzado:** Blog completo, sistema de permisos, carousel

Cada ejercicio incluye:
- Objetivos claros
- Tiempo estimado
- Código base
- Pistas
- Solución oculta

**Mejor para:** Práctica hands-on después de la teoría

### 4. **Código Demo en Vivo** 💻
El proyecto incluye ejemplos funcionando:
- `/` - Home con navegación
- `/login` - Login simulado
- `/cursos` - Rutas protegidas con guard
- `/demo` - ViewChild/ViewChildren con decoradores
- `/demo2` - ViewChild/ViewChildren con signals

---

## 🚀 Cómo Usar Este Material

### Para Profesores/Mentores

#### Antes de la Clase (30 min)
1. ✅ Clonar/descargar este proyecto
2. ✅ Ejecutar `npm install` y `ng serve`
3. ✅ Revisar `GUIA-MENTORIA-ANGULAR.md`
4. ✅ Probar todas las demos en el navegador
5. ✅ Preparar ejemplos adicionales si deseas

#### Durante la Clase (2.5 horas)

**Estructura sugerida:**

```
⏰ 00:00 - 00:10  Introducción y objetivos
├─ Presentación de conceptos
└─ Mostrar estructura del proyecto

⏰ 00:10 - 00:40  BLOQUE 1: Routing y RouterLink
├─ Abrir app.routes.ts y explicar
├─ Mostrar router-outlet en app.ts
├─ Navegar en el navegador (DevTools Network)
└─ Demostrar RouterLink en acción

⏰ 00:40 - 01:05  BLOQUE 2: Guards y Lazy Loading
├─ Abrir auth.guard.ts
├─ Probar sin login (redirige)
├─ Hacer login y probar con acceso
├─ Mostrar lazy loading en DevTools Network
└─ Ver chunks descargándose dinámicamente

⏰ 01:05 - 01:10  ☕ BREAK

⏰ 01:10 - 01:40  BLOQUE 3: ViewChild y ViewChildren
├─ Abrir demo.ts
├─ Explicar @ViewChild conceptualmente
├─ Probar botón "Enfocar" en /demo
├─ Explicar @ViewChildren
├─ Probar botón "Resaltar Todas"
└─ Ver logs en consola

⏰ 01:40 - 02:05  BLOQUE 4: ContentChild/ContentChildren
├─ Dibujar diagrama ViewChild vs ContentChild
├─ Abrir demo-wrapper.ts (padre)
├─ Abrir demo.ts (hijo con ng-content)
├─ Probar botones de ContentChild
└─ Explicar casos de uso (Angular Material)

⏰ 02:05 - 02:10  ☕ BREAK

⏰ 02:10 - 02:20  BONUS: Signals (Angular 17+)
├─ Abrir demo2.ts
├─ Comparar con demo.ts lado a lado
├─ Probar en /demo2
└─ Explicar cuándo usar cada sintaxis

⏰ 02:20 - 02:45  Ejercicios Prácticos
├─ Asignar Ejercicio 1, 2 o 3
├─ Estudiantes trabajan (20 min)
├─ Revisar solución de 1 ejercicio
└─ Responder dudas

⏰ 02:45 - 03:00  Q&A y Cierre
├─ Preguntas abiertas
├─ Compartir recursos adicionales
└─ Asignar ejercicios de tarea
```

#### Recursos de Apoyo Durante la Clase

**Para proyectar en pantalla:**
- Diagramas de flujo de routing
- Tabla comparativa ViewChild vs ContentChild
- Cheatsheet de sintaxis

**Para compartir con estudiantes:**
- Link al proyecto GitHub
- PDF de REFERENCIA-RAPIDA.md
- Lista de ejercicios

### Para Estudiantes

#### Durante la Clase
1. Enfócate en **entender conceptos**, no en memorizar sintaxis
2. Sigue al profesor mientras navega por el código
3. Haz preguntas cuando algo no tenga sentido
4. Toma notas de los "¿Por qué?" y "¿Cuándo usar?"

#### Después de la Clase
1. **Día 1:** Revisar `GUIA-MENTORIA-ANGULAR.md` completa
2. **Día 2-3:** Hacer ejercicios básicos (1, 2, 3)
3. **Día 4-5:** Hacer ejercicios intermedios (4, 5, 6)
4. **Día 6-7:** Intentar ejercicio avanzado (7, 8 o 9)
5. **Semana 2:** Crear tu propio proyecto aplicando todo lo aprendido

#### Recursos Recomendados
- [Angular Docs](https://angular.dev) - Documentación oficial
- [Angular University](https://www.youtube.com/@AngularUniversity) - Videos avanzados
- [StackOverflow](https://stackoverflow.com/questions/tagged/angular) - Comunidad

---

## 💻 Setup del Proyecto

### Prerrequisitos

- Node.js 18.19.0 o superior
- npm 10.2.3 o superior
- Angular CLI 18.x

### Instalación

```bash
# 1. Clonar el repositorio (o descargar ZIP)
git clone <repository-url>
cd demo-angular-live

# 2. Instalar dependencias
npm install

# 3. Servir la aplicación
ng serve

# 4. Abrir en el navegador
http://localhost:4200
```

### Problemas Comunes

**Error: "Port 4200 is already in use"**
```bash
# Solución: Usar otro puerto
ng serve --port 4300
```

**Error: "Module not found"**
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

---

## 📂 Estructura del Proyecto

```
demo-angular-live/
├── src/app/
│   ├── app.ts                    ← Componente raíz
│   ├── app.routes.ts             ← Configuración de rutas 🗺️
│   │
│   ├── guards/
│   │   └── auth.guard.ts         ← Guard de autenticación 🛡️
│   │
│   ├── home/
│   │   └── home.ts               ← Componente Home
│   │
│   ├── login/
│   │   └── login.ts              ← Componente Login
│   │
│   ├── cursos/
│   │   ├── cursos.routes.ts      ← Rutas hijas de cursos
│   │   ├── cursos-list/          ← Lista de cursos
│   │   └── curso-detalle/        ← Detalle de curso
│   │
│   ├── demo/
│   │   ├── demo.ts               ← Demo con decoradores (@ViewChild)
│   │   ├── demo-wrapper.ts       ← Wrapper para ContentChild
│   │   ├── demo2.ts              ← Demo con signals (viewChild)
│   │   └── demo2-wrapper.ts      ← Wrapper signals
│   │
├── GUIA-MENTORIA-ANGULAR.md      ← 📖 Guía completa
├── REFERENCIA-RAPIDA.md          ← ⚡ Cheatsheet
├── EJERCICIOS-PRACTICOS.md       ← 📝 Ejercicios
└── README-MENTORIA.md            ← 📋 Este archivo
```

---

## 🎯 Rutas Disponibles

| Ruta | Componente | Guard | Lazy | Descripción |
|------|-----------|-------|------|-------------|
| `/` | Home | ❌ | ❌ | Página de inicio |
| `/login` | Login | ❌ | ❌ | Login simulado |
| `/cursos` | CursosList | ✅ authGuard | ✅ | Lista de cursos (protegido) |
| `/cursos/:id` | CursoDetalle | ✅ authGuard | ✅ | Detalle de curso |
| `/demo` | Demo | ❌ | ✅ | ViewChild con decoradores |
| `/demo2` | Demo2 | ❌ | ✅ | ViewChild con signals |

### Cómo Probar los Guards

**Sin login:**
1. Ir a http://localhost:4200/cursos
2. **Resultado:** Redirige a `/login`

**Con login:**
1. Ir a http://localhost:4200/login
2. Click en cualquier rol (Estudiante, Instructor, Admin)
3. Ir a http://localhost:4200/cursos
4. **Resultado:** Permite acceso

---

## 🔍 Demos Interactivas

### Demo 1: ViewChild - Enfocar Input
**Ruta:** `/demo`
1. Ver sección "ViewChild - Enfocar un input"
2. Click en botón "🎯 Enfocar"
3. **Resultado:** Input recibe focus automáticamente

### Demo 2: ViewChildren - Resaltar Cajas
**Ruta:** `/demo`
1. Ver sección "ViewChildren - Resaltar todas las cajas"
2. Click en botón "✨ Resaltar Todas"
3. **Resultado:** Las 3 cajas se vuelven amarillas

### Demo 3: ContentChild
**Ruta:** `/demo`
1. Scroll a sección "ContentChild"
2. Click en "📊 Mostrar info del ContentChild"
3. **Resultado:** Detecta componente proyectado

### Demo 4: Signals (Angular 17+)
**Ruta:** `/demo2`
1. Mismas funcionalidades que `/demo`
2. Implementado con signals en lugar de decoradores

### Demo 5: Lazy Loading
**Instrucciones:**
1. Abrir DevTools → Network → Filtrar por "JS"
2. Ir a Home (clear network)
3. Click en "Demo"
4. **Resultado:** Ver chunk de lazy loading descargándose

---

## 📊 Conceptos Cubiertos

### ✅ Nivel Básico
- [x] Routing básico
- [x] Router Outlet
- [x] RouterLink
- [x] Guards (canActivate)
- [x] Navegación programática

### ✅ Nivel Intermedio
- [x] Lazy Loading (loadComponent)
- [x] Lazy Loading (loadChildren)
- [x] ViewChild
- [x] ViewChildren
- [x] QueryList

### ✅ Nivel Avanzado
- [x] ContentChild
- [x] ContentChildren
- [x] ng-content (content projection)
- [x] Signals (viewChild, viewChildren)
- [x] Rutas hijas

---

## ❓ FAQ - Preguntas Frecuentes

### ¿Puedo usar este proyecto en producción?
**No.** Este proyecto es únicamente para fines educativos. El sistema de autenticación es simulado (usa localStorage sin encriptación).

### ¿Funciona con Angular 16?
Sí, pero tendrías que remover las demos de signals (`demo2.ts` y `demo2-wrapper.ts`) ya que signals son Angular 17+.

### ¿Puedo agregar mis propios ejercicios?
¡Absolutamente! El proyecto está diseñado para ser extensible. Agrega componentes, guards, o rutas según necesites.

### ¿Dónde están las soluciones de los ejercicios?
Cada ejercicio tiene una solución oculta en `EJERCICIOS-PRACTICOS.md` dentro de un `<details>`. Click en "Ver solución" para expandir.

### ¿Qué pasa si quiero usar módulos en lugar de standalone?
Este proyecto usa **standalone components** (Angular moderna). Si necesitas la versión con módulos, tendrías que refactorizar. Standalone es el futuro recomendado.

### ¿Puedo compartir este material?
Sí, este material es libre para uso educativo. Si lo compartes, por favor mantén los créditos y links originales.

---

## 🛠️ Extensiones Recomendadas (VS Code)

```json
{
  "recommendations": [
    "angular.ng-template",
    "johnpapa.angular2",
    "cyrilletuzi.angular-schematics",
    "nrwl.angular-console",
    "esbenp.prettier-vscode"
  ]
}
```

---

## 📝 Notas para el Instructor

### Tips de Enseñanza

✅ **Usa analogías del mundo real** - Netflix, Facebook, guardias de seguridad  
✅ **Muestra ANTES de explicar** - Demuestra en el navegador primero  
✅ **Pregunta constantemente** - "¿Tiene sentido?" "¿Dudas?"  
✅ **Usa logs en consola** - Console.log ayuda a visualizar el flujo  
✅ **Compara con vanilla JS** - Muestra por qué Angular es mejor  

❌ **Evita leer código** - Explica el "por qué", no solo el "qué"  
❌ **No asumas conocimiento** - Verifica que todos siguen el ritmo  
❌ **No saltes entre archivos sin explicar** - Siempre di dónde estás  

### Errores Comunes de Estudiantes

1. **Usar href en lugar de routerLink**
   - Síntoma: Página se recarga
   - Solución: Mostrar en Network tab la diferencia

2. **ViewChild undefined en ngOnInit**
   - Síntoma: Error "Cannot read property of undefined"
   - Solución: Explicar lifecycle hooks y cuándo está disponible

3. **Olvidar el guard en rutas sensibles**
   - Síntoma: Piensan que ocultando el botón es suficiente
   - Solución: Demostrar escribiendo la URL directamente

4. **No entender la diferencia ViewChild vs ContentChild**
   - Síntoma: Confusión sobre cuándo usar cada uno
   - Solución: Usar diagrama visual con cajas

---

## 🎉 Próximos Pasos

Después de dominar estos conceptos, los siguientes temas recomendados son:

1. **Reactive Forms** - Formularios robustos con validación
2. **HTTP Client** - Consumo de APIs REST
3. **RxJS Operators** - Programación reactiva
4. **State Management** - NgRx o Signals avanzados
5. **Testing** - Unit tests con Jasmine/Karma
6. **Performance** - OnPush, trackBy, optimizaciones

---

## 📞 Soporte y Contacto

**¿Encontraste un error en el material?**
Abre un issue en GitHub con el detalle.

**¿Tienes sugerencias de mejora?**
Pull requests son bienvenidos. Por favor mantén el estilo y propósito educativo.

**¿Necesitas ayuda con un concepto?**
- Lee primero `GUIA-MENTORIA-ANGULAR.md`
- Revisa `REFERENCIA-RAPIDA.md`
- Busca en [StackOverflow Angular](https://stackoverflow.com/questions/tagged/angular)
- Consulta [Angular Docs](https://angular.dev)

---

## 📜 Licencia

Este proyecto es de código abierto para fines educativos.

---

## 🙏 Agradecimientos

Este material fue creado para ayudar a desarrolladores a aprender Angular de forma práctica y efectiva. Esperamos que sea útil para tu viaje de aprendizaje.

---

**🚀 ¡Que disfrutes enseñando/aprendiendo Angular! 🚀**

---

## Changelog

**v1.0.0** (2026-04-16)
- Material inicial completo
- 8 conceptos fundamentales cubiertos
- 3 guías detalladas
- 9 ejercicios prácticos
- Demos interactivas funcionando
- Proyecto completo en Angular 18

---

**📌 Última actualización:** Abril 2026  
**📌 Angular Version:** 18.x  
**📌 Status:** ✅ Producción
