# 🎤 DIÁLOGO COMPLETO - Clase de Mentoría Angular

## 📋 GUIÓN PARA EL INSTRUCTOR

Este documento contiene el **diálogo palabra por palabra** para conducir la mentoría de Angular. Incluye preguntas a los alumnos, analogías, y momentos específicos para mostrar código.

---

## 🎬 INTRODUCCIÓN (10 min)

### Bienvenida

**TÚ:**
> "¡Bienvenidos! Hoy vamos a hacer algo diferente. No voy a mostrar diapositivas ni teoría abstracta. Vamos a abrir código REAL de una aplicación Angular que ya funciona, y vamos a navegar juntos por los archivos mientras les explico cada concepto."

**TÚ:**
> "Todo lo que van a ver hoy es código que YA está corriendo. Lo único que haré es explicarles qué hace cada parte, para qué sirve, y cuándo usarlo. Y vamos a usar muchas analogías del mundo real para que sea súper fácil de entender."

---

**TÚ:**
> "Antes de empezar, pregunta rápida: **¿Han usado Facebook, Instagram, o Twitter?**"

**[Espera respuestas - todos dirán que sí]**

**TÚ:**
> "Perfecto. Cuando hacen clic en 'Perfil', luego en 'Fotos', luego en 'Inicio'... ¿se recarga toda la página cada vez?"

**ALUMNO:** 
> "No"

**TÚ:**
> "Exacto. Eso es una **Single Page Application (SPA)**. Una sola página HTML que cambia de contenido dinámicamente. Eso es lo que Angular hace mejor que nadie, y hoy aprenderemos cómo."

---

### Qué Vamos a Cubrir

**TÚ:**
> "Hoy cubriremos 8 conceptos fundamentales. No necesitan memorizar nombres raros ahora, pero escriban esto en sus notas:"

**[Muestra en pantalla o escribe en pizarra]:**

```
📚 CONCEPTOS DE HOY:

BLOQUE 1: NAVEGACIÓN
1. 🗺️ Routing      → Configurar rutas en la app
2. 🔗 RouterLink   → Links que no recargan la página

BLOQUE 2: SEGURIDAD Y PERFORMANCE
3. 🛡️ Guards        → Proteger rutas (login required)
4. ⚡ Lazy Loading → Cargar código bajo demanda

BLOQUE 3: MANIPULACIÓN DEL DOM
5. 🔍 ViewChild     → Acceder a UN elemento del template
6. 📦 ViewChildren  → Acceder a MÚLTIPLES elementos
7. 🎁 ContentChild  → Acceder a UN hijo proyectado
8. 🎁 ContentChildren → Acceder a MÚLTIPLES hijos proyectados
```

**TÚ:**
> "No se preocupen si algunos nombres suenan raros. En 2 horas, todos estos conceptos van a tener sentido total."

---

## 🎬 PARTE 1: ROUTING (15 min)

### Paso 1: Explicación Conceptual

**TÚ:**
> "Empecemos con lo primero: **Routing**. Voy a responder 5 preguntas para cada concepto: ¿Qué es? ¿Para qué? ¿Dónde? ¿Cuándo? ¿Por qué?"

---

**TÚ:**
> "Primera pregunta: **¿Qué es Routing?**"
>
> "Routing es el sistema que mapea URLs a componentes. Piénsenlo así:"
> - `/home` → muestra el componente Home
> - `/login` → muestra el componente Login
> - `/cursos` → muestra el componente Cursos
>
> "Angular detecta el cambio de URL y cambia el componente que se muestra. Simple."

---

**TÚ:**
> "Segunda pregunta: **¿Para qué sirve?**"
>
> "Sirve para crear Single Page Applications con múltiples vistas sin recargar el navegador."

**[ANALOGÍA]**

**TÚ:**
> "Imaginen su casa. Tienen varias habitaciones: sala, cocina, cuarto. Cuando se mueven de una a otra, **¿la casa se reconstruye?**"

**ALUMNO:** 
> "No"

**TÚ:**
> "Exacto. Solo cambian de habitación. Eso es Routing en Angular. La 'casa' es tu app, las 'habitaciones' son los componentes. Cambias de vista sin reconstruir todo."

---

### Paso 2: Mostrar el Código

**TÚ:**
> "Tercera pregunta: **¿Dónde se usa?** Vamos a verlo AHORA mismo en código real."

**[ACCIÓN: Abre VS Code → Navega a `src/app/app.routes.ts`]**

**TÚ (mientras muestra el código):**
> "Este es el archivo maestro de rutas: `app.routes.ts`. Miren qué simple es:"

```typescript
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'cursos', loadChildren: ... }
];
```

**TÚ:**
> "¿Ven? Es un array de objetos. Cada objeto dice:"
> - `path: ''` → si la URL es `/` (la raíz del sitio)
> - `component: Home` → muestra el componente Home
>
> "Así de simple. Angular hace todo el trabajo pesado por nosotros."

---

**TÚ:**
> "Y ahora, ¿dónde se MUESTRA ese componente? Déjenme mostrarles el componente principal."

**[ACCIÓN: Abre `src/app/app.ts`]**

**TÚ:**
> "Miren este archivo. Este es el componente principal de toda la app. Busquen conmigo esta línea mágica en el template:"

```html
<router-outlet></router-outlet>
```

**TÚ:**
> "**Ese** es el contenedor mágico. Angular pone los componentes AHÍ según la ruta activa."

**[Dibuja o muestra diagrama]:**

```
┌────────────────────────────┐
│   NAVBAR (Siempre visible) │
├────────────────────────────┤
│                            │
│   <router-outlet>          │ ← Aquí cambia el contenido
│   (Home / Login / Cursos)  │
│                            │
└────────────────────────────┘
```

**TÚ:**
> "Es como un marco de fotos que cambia la foto según la URL. El marco (navbar) siempre está, pero la foto (componente) cambia."

---

### Paso 3: Cuándo y Por Qué Usarlo

**TÚ:**
> "Cuarta pregunta: **¿Cuándo usarlo?**"
>
> "Úsenlo **siempre** que su app tenga más de una vista. Por ejemplo:"

**[Enumera]:**
```
✅ App con dashboard + perfil + configuración
✅ E-commerce (productos, carrito, checkout)
✅ Blog (home, post, about, contact)
✅ Sistema administrativo (usuarios, reportes, settings)
```

**TÚ:**
> "Si su app tiene 'secciones', necesitan Routing. Punto."

---

**TÚ:**
> "Quinta pregunta: **¿Por qué usarlo?** Tres razones principales:"

**[Escribe o muestra]:**
```
1. 🚀 VELOCIDAD
   - No recarga toda la página
   - Solo cambia lo necesario
   
2. 🎯 UX MEJOR
   - Transiciones suaves
   - Botón "Atrás" funciona
   
3. ♻️ CÓDIGO ORGANIZADO
   - Un componente por vista
   - Fácil de mantener
```

---

### Paso 4: Prueba EN VIVO

**TÚ:**
> "Ahora viene la prueba de fuego. Vamos al navegador."

**[ACCIÓN: Abre navegador → http://localhost:4200]**

**TÚ:**
> "Abran conmigo las DevTools. Click derecho → Inspeccionar → Network tab."

**[ACCIÓN: Abre DevTools → Network]**

**TÚ:**
> "Listo. Ahora vean: voy a hacer clic en Home, Login, Cursos, Home otra vez."

**[ACCIÓN: Navega entre rutas haciendo clic en el navbar]**

**TÚ:**
> "¿Ven el Network tab? **Cero peticiones HTTP**. La página NO se recargó. Solo cambió el contenido. Eso es Routing en acción."

**TÚ:**
> "Si hubiera usado `<a href>` en lugar de `routerLink`, verían la página completa descargándose cada vez. Pero con Routing, es instantáneo."

---

## 🎬 PARTE 2: ROUTERLINK (10 min)

**TÚ:**
> "Perfecto. Ya saben qué es Routing. Ahora, ¿cómo hacemos que el usuario navegue entre rutas? Con **RouterLink**."

---

### ¿Qué es RouterLink?

**TÚ:**
> "**¿Qué es RouterLink?**"
>
> "RouterLink es una directiva que convierte links normales en navegación SPA."
>
> "En HTML normal usarían `<a href="/login">`. Pero eso recargaría la página completa."
>
> "Con RouterLink: `<a routerLink="/login">`. Angular intercepta el click y cambia la ruta SIN recargar."

---

### Analogía

**TÚ:**
> "**¿Para qué sirve?** Para crear navegación sin recargas."

**[ANALOGÍA]:**

**TÚ:**
> "Imaginen que están viendo Netflix. Hacen clic en 'Mi Lista', luego en 'Inicio', luego en 'Buscar'."
> 
> "¿Se recarga Netflix cada vez?"

**ALUMNO:** 
> "No"

**TÚ:**
> "Exacto. Solo cambia la vista. Eso es RouterLink trabajando (bueno, Netflix usa React pero el concepto es el mismo)."

---

### Mostrar el Código

**TÚ:**
> "**¿Dónde se usa?** Vamos al código."

**[ACCIÓN: Vuelve a `src/app/app.ts`]**

**TÚ:**
> "Miren el navbar que ya tienen. Aquí tengo varios links:"

```html
<a routerLink="/">Home</a>
<a routerLink="/login">Login</a>
<a routerLink="/cursos">Cursos</a>
<a routerLink="/demo">Demo</a>
```

**TÚ:**
> "¿Ven? No es `href`, es `routerLink`. Ese pequeño cambio hace toda la diferencia."

---

**[ACCIÓN: Abre `src/app/home/home.ts`]**

**TÚ:**
> "Y también lo usan en botones. Miren este componente Home:"

```html
<a routerLink="/login" style="...">Ir a Login</a>
<a routerLink="/cursos" style="...">Ver Cursos</a>
```

**TÚ:**
> "Pueden estilizarlo como quieran: botón, link, card, lo que sea. El `routerLink` funciona igual."

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Regla simple:"

**[Muestra]:**
```
✅ Navegación INTERNA (dentro de tu app)  → routerLink
❌ Navegación EXTERNA (otro sitio web)    → href

Ejemplos:
routerLink="/perfil"               ✅
routerLink="/productos"            ✅
href="https://google.com"          ✅
href="/perfil"                     ❌ (usa routerLink!)
```

---

### Por Qué Usarlo

**TÚ:**
> "**¿Por qué usarlo?** Porque `href` recarga la página completa. Pierden todo el estado de la app."

**[Comparación]:**
```
CON <a href="/login">:
- ❌ Recarga completa
- ❌ Pierdes estado
- ❌ Flash blanco
- ❌ Lento

CON <a routerLink="/login">:
- ✅ Solo cambia contenido
- ✅ Mantiene estado
- ✅ Transición suave
- ✅ Rápido
```

---

**TÚ:**
> "Vamos a probarlo. Al navegador."

**[ACCIÓN: Va al navegador]**

**TÚ:**
> "Voy a navegar por toda la app. Home, Login, Cursos, Demo. Fíjense que la transición es instantánea y suave."

**[ACCIÓN: Navega haciendo clic en varios links]**

**TÚ:**
> "Eso es RouterLink. Simple pero poderoso."

---

## 🎬 PARTE 3: GUARDS (20 min)

**TÚ:**
> "Ok, siguiente nivel: **Guards**. Este concepto es CRÍTICO para seguridad."

---

### ¿Qué es un Guard?

**TÚ:**
> "**¿Qué es un Guard?**"
>
> "Un Guard es una función que decide si un usuario puede acceder a una ruta. Devuelve:"
> - `true` → ✅ Usuario puede acceder
> - `false` → ❌ Usuario bloqueado (redirige)

---

### Analogía PERFECTA

**[ANALOGÍA]:**

**TÚ:**
> "Imaginen un **club nocturno**. Hay un guardia en la puerta que verifica tu ID antes de dejarte entrar."
>
> "¿Tienes 18 años? → **Adelante** ✅"
> "¿Menor de edad? → **Fuera** ❌"
>
> "Eso es exactamente un Guard en Angular. Es un guardia de seguridad para tus rutas."

---

### Para Qué Sirve - Ejemplo Real

**TÚ:**
> "**¿Para qué sirve?** Para proteger rutas sensibles."

**TÚ:**
> "¿Alguna vez han intentado acceder al perfil de Facebook sin estar logueados?"

**ALUMNO:** 
> "Te manda al login"

**TÚ:**
> "¡Exacto! Eso es un Guard. Facebook verifica: '¿Tienes sesión activa?' No → Redirige a login."

---

### Mostrar el Código del Guard

**TÚ:**
> "**¿Dónde se implementa?** Vamos a ver el Guard que ya tenemos."

**[ACCIÓN: Abre `src/app/guards/auth.guard.ts`]**

**TÚ:**
> "Miren qué simple es un Guard:"

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  
  if (token) { 
    return true;  // ✅ Tienes token, adelante
  } else {
    console.log('Acceso denegado. Redirigiendo a login...');
    router.navigate(['/login']);
    return false; // ❌ Sin token, al login
  }
};
```

**TÚ (explicando línea por línea):**
> "¿Qué hace este código?"
> 
> "**Línea 1:** Busca un token en localStorage. Este token simula que el usuario está logueado."
>
> "**Línea 2:** Si HAY token → devuelve `true`. El usuario puede pasar."
>
> "**Línea 3:** Si NO HAY token → redirige al login y devuelve `false`. Bloqueado."
>
> "¡Son solo 10 líneas! Pero protegen toda una sección de tu app."

---

### Cómo se Aplica el Guard

**TÚ:**
> "Ahora, ¿cómo se APLICA un Guard? Vamos al archivo de rutas."

**[ACCIÓN: Vuelve a `src/app/app.routes.ts`]**

**TÚ:**
> "Miren esta ruta de cursos:"

```typescript
{ 
  path: 'cursos',
  loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES),
  canActivate: [authGuard] // 👈 AQUÍ
}
```

**TÚ:**
> "¿Ven esa línea? `canActivate: [authGuard]`. Eso le dice a Angular:"
>
> "'Antes de mostrar `/cursos`, ejecuta el `authGuard`. Si devuelve `true`, adelante. Si devuelve `false`, bloquea.'"

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Úsenlo siempre que tengan rutas que no todos puedan ver."

```
✅ Rutas que requieren login      → authGuard
✅ Rutas que requieren rol admin  → roleGuard
✅ Rutas premium                  → premiumGuard
❌ Página de inicio pública       → Sin guard
❌ Página "Acerca de"             → Sin guard
```

---

### Por Qué Usarlo - Historia Real

**TÚ:**
> "**¿Por qué usarlo?** Déjenme contarles una historia real."

**[PAUSA para efecto]**

**TÚ:**
> "Una startup creó una app Angular sin Guards. Los usuarios normales podían escribir `/admin` en la barra de direcciones y acceder al panel de administración."
>
> "¿El resultado? Un usuario 'curioso' eliminó 500 registros de la base de datos casi por accidente."

**[PAUSA]**

**TÚ:**
> "**Sin Guards, tu app es insegura.** Siempre protejan sus rutas sensibles. No confíen en que 'el usuario no va a adivinar la URL'. Siempre habrá alguien que lo intente."

---

### Prueba EN VIVO

**TÚ:**
> "Ahora la prueba práctica. Vamos al navegador."

**[ACCIÓN: Va al navegador]**

**TÚ:**
> "Primero, voy a intentar acceder a `/cursos` **sin** estar logueado. Miren bien..."

**[ACCIÓN: Escribe en la barra de direcciones: http://localhost:4200/cursos]**

**TÚ:**
> "¿Qué pasó? Me redirigió al `/login`. El Guard bloqueó el acceso."

**[ACCIÓN: Abre la consola del navegador]**

**TÚ:**
> "Miren la consola: 'Acceso denegado. Redirigiendo a login...'. Ese es el log que pusimos en el Guard."

---

**TÚ:**
> "Ahora voy a hacer login para obtener el token."

**[ACCIÓN: Va a /login y hace clic en "Estudiante"]**

**TÚ:**
> "Listo, ahora tengo un token en localStorage. Voy a intentar acceder a `/cursos` de nuevo..."

**[ACCIÓN: Navega a /cursos]**

**TÚ:**
> "¡BAM! Ahora **sí** me dejó entrar. El Guard verificó el token y dio paso."

**TÚ:**
> "Eso es un Guard en acción. Control de acceso puro."

---

## ☕ BREAK (5 min)

**TÚ:**
> "Perfecto, llevamos una hora. Hagamos un break de 5 minutos. Vayan al baño, estiren las piernas. Cuando volvamos, vemos Lazy Loading y luego entramos a ViewChild que es la parte más técnica."

---

## 🎬 PARTE 4: LAZY LOADING (15 min)

**[DESPUÉS DEL BREAK]**

**TÚ:**
> "Ok, sigamos. Último concepto antes de entrar a manipulación del DOM: **Lazy Loading**. Este es para optimización de performance."

---

### ¿Qué es Lazy Loading?

**TÚ:**
> "**¿Qué es Lazy Loading?**"
>
> "Lazy Loading es cargar código solo cuando se necesita, no todo al inicio."

---

### Analogía BRUTAL

**[ANALOGÍA]:**

**TÚ:**
> "Imaginen que van a **Netflix**. Cuando abren la app, ¿se descargan TODAS las películas y series al dispositivo?"

**ALUMNO:** 
> "No, obvio que no"

**TÚ:**
> "Exacto. Solo se descarga:"
> - "La info de las portadas (al inicio)"
> - "El video completo (cuando seleccionas una película)"
>
> "Eso es Lazy Loading. Cargar recursos bajo demanda, no todo de golpe."

---

### Para Qué Sirve

**TÚ:**
> "**¿Para qué sirve?** Para mejorar el tiempo de carga inicial de tu app."

**[Comparación]:**
```
SIN LAZY LOADING:
- Bundle inicial: 5 MB
- Tiempo de carga: 8 segundos
- Incluye código que quizá nunca uses

CON LAZY LOADING:
- Bundle inicial: 500 KB
- Tiempo de carga: 1 segundo
- Solo descarga lo que usas
```

**TÚ:**
> "¿Qué es mejor? Obvio la opción con Lazy Loading."

---

### Mostrar el Código

**TÚ:**
> "**¿Dónde se usa?** Se usa en las rutas. Vamos a ver dos ejemplos."

**[ACCIÓN: Abre `src/app/app.routes.ts`]**

**TÚ:**
> "Miren estas dos rutas:"

```typescript
// Lazy con loadChildren (módulo completo)
{ 
  path: 'cursos',
  loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES)
},

// Lazy con loadComponent (un solo componente)
{ 
  path: 'demo',
  loadComponent: () => import('./demo/demo-wrapper').then(m => m.DemoWrapperComponent)
}
```

**TÚ:**
> "¿Ven la diferencia con las rutas normales?"
>
> "En lugar de `component: Home` (carga inmediata), usan `loadComponent` o `loadChildren`."
>
> "Ese `import()` dinámico le dice a Angular: 'No cargues este código ahora. Cárgalo solo cuando el usuario vaya a esta ruta'."

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Usen Lazy Loading para:"

```
✅ Secciones grandes opcionales
   - Panel de administración (solo admins)
   - Blog con 20 artículos
   - Módulo de reportes

✅ Funcionalidades opcionales
   - Config avanzada
   - Herramientas de debug

❌ NO lo usen en:
   - Página de inicio (Home)
   - Login (debe ser rápido)
   - Componentes SIEMPRE usados
```

---

### Por Qué Usarlo

**TÚ:**
> "**¿Por qué usarlo?** Tres beneficios principales:"

```
1. ⚡ CARGA INICIAL MÁS RÁPIDA
   - Menos JavaScript para parsear
   - App 'arranca' inmediatamente

2. 📊 MENOS ANCHO DE BANDA
   - Usuario solo descarga lo que usa
   - Importante en móviles

3. 🎯 MEJOR PERFORMANCE
   - Menos memoria consumida
   - Scores de Lighthouse mejoran
```

---

### Prueba EN VIVO (LA MÁS COOL)

**TÚ:**
> "Ahora la demo MÁS COOL de la clase. Vamos al navegador con DevTools."

**[ACCIÓN: Abre navegador + DevTools]**

**TÚ:**
> "Abran conmigo: DevTools → Network tab. Y activen el filtro 'JS' para ver solo archivos JavaScript."

**[ACCIÓN: Configura DevTools → Network → JS filter]**

**TÚ:**
> "Ahora, voy a hacer clic en 'Demo' que usa Lazy Loading. Observen MUY bien el Network tab..."

**[ACCIÓN: Hace clic en /demo]**

**TÚ:**
> "¡MIREN! ¿Vieron ese archivo que se descargó? Un chunk nuevo con nombre tipo `demo-wrapper-ABC123.js`."
>
> "Ese archivo NO estaba en el bundle inicial. Se descargó **justo ahora** cuando navegué a `/demo`."

**[ACCIÓN: Señala el archivo en Network tab]**

**TÚ:**
> "Eso es Lazy Loading en acción visual. Acabamos de ver código descargarse bajo demanda en tiempo real."

---

**TÚ:**
> "Ahora navego a otra ruta lazy loaded: `/cursos`."

**[ACCIÓN: Navega a /cursos]**

**TÚ:**
> "¿Vieron? Otro chunk se descargó. Magia pura."

**TÚ:**
> "Imaginen si su app tiene 50 secciones. Con Lazy Loading, solo cargas las 2-3 que el usuario realmente usa. Enorme diferencia en performance."

---

## ☕ BREAK (5 min)

**TÚ:**
> "Ok, otro break de 5 minutos. Cuando volvamos, entramos a la parte más técnica: ViewChild, ViewChildren, y toda la familia de manipulación del DOM."

---

## 🎬 PARTE 5: VIEWCHILD (20 min)

**[DESPUÉS DEL BREAK]**

**TÚ:**
> "Perfecto, sigamos. Ahora viene la parte donde van a manipular el DOM directamente: **ViewChild**."

---

### ¿Qué es ViewChild?

**TÚ:**
> "**¿Qué es ViewChild?**"
>
> "ViewChild es una forma de obtener una referencia a un elemento del template desde TypeScript."

**TÚ:**
> "En JavaScript vanilla harían:"

```javascript
const input = document.getElementById('myInput');
input.focus();
```

**TÚ:**
> "Con Angular ViewChild:"

```typescript
@ViewChild('myInput') myInput!: ElementRef;
this.myInput.nativeElement.focus();
```

**TÚ:**
> "Ambos hacen lo mismo: obtener el elemento. Pero ViewChild es type-safe y reactivo."

---

### Analogía

**[ANALOGÍA]:**

**TÚ:**
> "Es como **ponerle una etiqueta con nombre** a un elemento:"
> - "Template: 'Este input se llama searchInput'"
> - "TypeScript: 'Dame el elemento llamado searchInput'"
> - "Angular: 'Aquí está ✅'"

---

### Para Qué Sirve

**TÚ:**
> "**¿Para qué sirve?** Para manipular elementos HTML directamente desde TypeScript."

```
✅ Enfocar un input automáticamente
✅ Hacer scroll a una sección
✅ Obtener dimensiones de un elemento
✅ Reproducir/pausar un video
✅ Dibujar en un canvas
```

---

### Mostrar el Código - Paso a Paso

**TÚ:**
> "**¿Dónde se usa?** Vamos al código real. Tengo un componente demo completo."

**[ACCIÓN: Abre `src/app/demo/demo.ts`]**

**TÚ:**
> "Este componente tiene un ejemplo perfecto. Primero vean el template HTML:"

```html
<input 
  #myInput   👈 Esto es una "template reference variable"
  type="text" 
  placeholder="Haz clic en el botón..."
>
<button (click)="enfocar()">
  🎯 Enfocar
</button>
```

**TÚ:**
> "Ese `#myInput` le pone un 'nombre' al elemento. Como ponerle una etiqueta."

---

**TÚ:**
> "Ahora vean cómo lo capturamos en TypeScript:"

```typescript
export class DemoComponent implements AfterViewInit {
  @ViewChild('myInput') myInput!: ElementRef;
  
  ngAfterViewInit() {
    console.log('✅ ViewChild listo:', this.myInput);
  }
  
  enfocar() {
    this.myInput.nativeElement.focus();
    console.log('🎯 Input enfocado');
  }
}
```

**TÚ (explicando paso a paso):**
> "**Paso 1:** `@ViewChild('myInput')` → Busca el elemento con esa referencia"
>
> "**Paso 2:** `myInput!: ElementRef` → Guarda la referencia. El `!` le dice a TypeScript 'confía, va a existir'"
>
> "**Paso 3:** `ngAfterViewInit()` → Este es un lifecycle hook que se ejecuta cuando el template está listo"
>
> "**Paso 4:** `enfocar()` → Método que enfoca el input cuando haces click en el botón"

---

### Lifecycle Importante

**TÚ:**
> "Algo MUY importante: el timing."

```typescript
ngAfterViewInit() {
  // ✅ AQUÍ el ViewChild ya está disponible
  console.log(this.myInput); // Funciona
}

ngOnInit() {
  // ❌ AQUÍ el ViewChild es undefined
  console.log(this.myInput); // undefined
}
```

**TÚ:**
> "Regla: Usa ViewChild en `ngAfterViewInit` o después, nunca en `ngOnInit`."

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Cuando necesites interactuar con elementos del DOM que están en TU propio template."

```
✅ Tu componente tiene un input y quieres enfocarlo
✅ Tu componente tiene un canvas y quieres dibujar
✅ Tu componente tiene un video y quieres controlarlo

❌ Quieres manipular elementos de OTRO componente
❌ El elemento está fuera de tu componente
```

---

### Por Qué Usarlo

**TÚ:**
> "**¿Por qué usarlo?** Porque es mejor que `document.querySelector()`."

```
❌ document.getElementById('myInput')
- No es type-safe
- Propenso a errores
- No reactivo

✅ @ViewChild('myInput')
- Type-safe
- Angular maneja el lifecycle
- Warnings claras si falla
```

---

### Prueba EN VIVO

**TÚ:**
> "Ahora vamos a probarlo EN VIVO. Al navegador."

**[ACCIÓN: Navega a http://localhost:4200/demo]**

**TÚ:**
> "Aquí está el componente. Ven el input y el botón 'Enfocar'. Voy a hacer click..."

**[ACCIÓN: Hace clic en el botón "🎯 Enfocar"]**

**TÚ:**
> "¿Vieron? El input recibió el focus automáticamente. El cursor está adentro, listo para escribir."

**[ACCIÓN: Abre la consola del navegador]**

**TÚ:**
> "Miren la consola: '🎯 Input enfocado'. Ese es el log del método `enfocar()`."

**TÚ:**
> "Eso es ViewChild. Simple pero poderoso."

---

## 🎬 PARTE 6: VIEWCHILDREN (15 min)

**TÚ:**
> "Perfecto. Ahora, ¿qué pasa si quieren manipular **múltiples elementos** a la vez? Ahí entra **ViewChildren**."

---

### ¿Qué es ViewChildren?

**TÚ:**
> "**¿Qué es ViewChildren?**"
>
> "ViewChildren es como ViewChild, pero para obtener una lista de elementos en lugar de uno solo."
>
> "Simple:"
> - "ViewChild → Busca UNA aguja en el pajar"
> - "ViewChildren → Busca TODAS las agujas en el pajar"

---

### Para Qué Sirve

**TÚ:**
> "**¿Para qué sirve?** Para aplicar operaciones a múltiples elementos al mismo tiempo."

```
✅ Resaltar todas las cards de productos
✅ Animar varios elementos en conjunto
✅ Validar múltiples campos de formulario
✅ Hacer focus en el primer campo vacío
```

---

### Mostrar el Código

**TÚ:**
> "**¿Dónde se usa?** Sigamos en el mismo archivo demo."

**[ACCIÓN: Sigue en `src/app/demo/demo.ts` - scroll down]**

**TÚ:**
> "Miren el template, hay 3 cajas:"

```html
<div #caja *ngFor="let num of [1,2,3]" 
     style="padding: 20px; border: 2px solid #ddd;">
  Caja {{ num }}
</div>
<button (click)="resaltar()">
  ✨ Resaltar Todas
</button>
```

**TÚ:**
> "Ven que las 3 cajas tienen el **mismo** `#caja`. No es un error, así funciona ViewChildren. El mismo nombre en múltiples elementos."

---

**TÚ:**
> "Y en TypeScript:"

```typescript
@ViewChildren('caja') cajas!: QueryList<ElementRef>;

resaltar() {
  this.cajas.forEach(caja => {
    caja.nativeElement.style.background = 'yellow';
    caja.nativeElement.style.transform = 'scale(1.1)';
  });
  console.log('✨ Resaltadas', this.cajas.length, 'cajas');
}
```

**TÚ (explicando):**
> "**Paso 1:** `@ViewChildren('caja')` → Busca TODOS los elementos con esa referencia"
>
> "**Paso 2:** `cajas!: QueryList<ElementRef>` → Es un QueryList, no un array normal, pero se comporta similar"
>
> "**Paso 3:** `forEach()` → Iteramos sobre todas las cajas"
>
> "**Paso 4:** Cambiamos el estilo de cada una: fondo amarillo y un poco más grandes"

---

### QueryList

**TÚ:**
> "QueryList tiene métodos útiles:"

```typescript
this.cajas.length       // Cantidad de elementos
this.cajas.first        // Primer elemento
this.cajas.last         // Último elemento
this.cajas.forEach(...)  // Iterar sobre todos
```

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Cuando necesites manipular múltiples elementos del mismo tipo."

```
✅ Lista de items generada con *ngFor
✅ Grupo de checkboxes para "seleccionar todos"
✅ Grid de imágenes para aplicar filtros
✅ Tabs para cerrar todos excepto uno
```

---

### Por Qué Usarlo

**TÚ:**
> "**¿Por qué usarlo?** Porque es mucho más limpio que `querySelectorAll()`."

```
❌ document.querySelectorAll('.box')
- Devuelve NodeList (no array real)
- No es reactivo
- Se rompe si los selectores cambian

✅ @ViewChildren('box')
- Devuelve QueryList (reactivo)
- Se actualiza automáticamente
- Type-safe
```

---

### Prueba EN VIVO

**TÚ:**
> "Prueba en vivo. Sigamos en el navegador."

**[ACCIÓN: Ya está en /demo]**

**TÚ:**
> "Aquí están las 3 cajas. Son simples boxes con borde gris. Ahora, click en 'Resaltar Todas'..."

**[ACCIÓN: Hace clic en "✨ Resaltar Todas"]**

**TÚ:**
> "¡BAM! Las 3 se pusieron amarillas y crecieron un poco. ViewChildren las manipuló **todas a la vez** con una sola operación."

**[ACCIÓN: Abre consola]**

**TÚ:**
> "Consola: '✨ Resaltadas 3 cajas'. Confirmado."

**TÚ:**
> "Eso es ViewChildren. Súper útil para operaciones en lote."

---

## 🎬 PARTE 7: CONTENTCHILD (15 min)

**TÚ:**
> "Ok, último bloque técnico: **ContentChild y ContentChildren**. Estos son los más confusos al principio, así que voy con una explicación súper clara."

---

### La Gran Pregunta

**TÚ:**
> "Primero, la gran pregunta que todos se hacen: **¿Cuál es la diferencia entre ViewChild y ContentChild?**"

**[ACCIÓN: Dibuja o muestra diagrama en pantalla]**

```
COMPONENTE PADRE:
<app-card>
  <p #proyectado>Este texto viene del PADRE</p>  👈 ContentChild
</app-card>

COMPONENTE HIJO (CardComponent):
template: `
  <div>
    <h2 #interno>Título</h2>  👈 ViewChild
    <ng-content></ng-content>  👈 Aquí se proyecta el contenido
  </div>
`
```

**TÚ:**
> "**Regla de oro:**"
> - "**ViewChild** → elementos en TU propio template"
> - "**ContentChild** → elementos que te pasan desde AFUERA (contenido proyectado)"

---

### Analogía PERFECTA

**[ANALOGÍA]:**

**TÚ:**
> "Imaginen una **caja de regalo:**"
> - "La **caja** es el componente hijo"
> - "El **regalo adentro** es el contenido proyectado"
> 
> "**ViewChild** accede a la caja en sí (la estructura, el template propio)"
>
> "**ContentChild** accede al regalo (lo que te pusieron adentro desde el padre)"

---

### Para Qué Sirve

**TÚ:**
> "**¿Para qué sirve?** Content Projection es para crear componentes reutilizables como librerías."

**[EJEMPLOS]:**

**TÚ:**
> "Angular Material usa ContentChild TODO el tiempo:"
> - "`<mat-tab-group>` → cada `<mat-tab>` es contenido proyectado"
> - "`<mat-dialog>` → el contenido del diálogo viene del padre"
> - "`<mat-card>` → título, contenido, acciones se proyectan"

**TÚ:**
> "Básicamente, cuando creas componentes 'contenedores' flexibles que no saben qué van a recibir exactamente."

---

### Mostrar el Código

**TÚ:**
> "**¿Dónde se usa?** Vamos al código."

**[ACCIÓN: Sigue en `demo.ts` - scroll down a sección ContentChild]**

**TÚ:**
> "Miren, el componente demo tiene `<ng-content>` para recibir proyección:"

```html
<div>
  <strong>Contenido proyectado:</strong>
  <ng-content select="[single]"></ng-content>  👈 Slot para contenido
</div>
```

**TÚ:**
> "Y en TypeScript captura ese contenido:"

```typescript
@ContentChild(CursoDetalleComponent) singleCurso!: CursoDetalleComponent;

infoSingle() {
  if (this.singleCurso) {
    this.singleInfo = `✅ ContentChild detectado: ${this.singleCurso.cursoId}`;
  } else {
    this.singleInfo = '❌ No hay ContentChild proyectado';
  }
}
```

---

**TÚ:**
> "Y el padre (demo-wrapper) proyecta el contenido:"

**[ACCIÓN: Abre `src/app/demo/demo-wrapper.ts`]**

```html
<app-demo>
  <app-curso-detalle single [cursoId]="1"></app-curso-detalle>  👈 Esto se proyecta
</app-demo>
```

**TÚ:**
> "El padre pasa un componente hijo al demo. El componente demo lo recibe vía ContentChild."

---

### Cuándo Usarlo

**TÚ:**
> "**¿Cuándo usarlo?** Cuando crees componentes de librería que necesitan ser flexibles."

```
✅ Componente "Card" que acepta cualquier contenido
✅ Componente "Modal" con contenido dinámico
✅ Componente "Tabs" con tabs configurables
✅ Librerías de UI

❌ Aplicaciones normales día a día (usa ViewChild)
❌ Features internos de tu app
```

---

### Por Qué Usarlo

**TÚ:**
> "**¿Por qué usarlo?** Porque hace tus componentes súper reutilizables."

```
❌ Sin Content Projection:
- Componentes rígidos
- 20 @Input diferentes para todo
- No flexible

✅ Con Content Projection:
- Componentes flexibles
- El padre controla el contenido
- Máxima reutilización
```

---

### Prueba EN VIVO

**TÚ:**
> "Demo en el navegador."

**[ACCIÓN: Ya en /demo]**

**TÚ:**
> "Scroll down a la sección 'ContentChild'. Hay un botón 'Mostrar info del ContentChild'. Click..."

**[ACCIÓN: Hace clic en el botón]**

**TÚ:**
> "Dice: '✅ ContentChild detectado: CursoDetalleComponent con ID: 1'."
>
> "Eso significa que el componente demo DETECTÓ el componente que le proyectaron desde el wrapper."

**TÚ:**
> "ContentChildren funciona igual, pero para múltiples componentes proyectados. Mismo concepto, cantidad diferente."

---

## 🎬 PARTE 8: BONUS SIGNALS (10 min)

**TÚ:**
> "Ok, bonus final antes de los ejercicios: **Signals**. Esta es la nueva forma de hacer ViewChild en Angular moderno."

---

### Comparación Directa

**TÚ:**
> "Angular 17 introdujo 'Signal Queries'. Es lo mismo pero con sintaxis más simple."

**[ACCIÓN: Muestra comparación lado a lado en pantalla o código]**

```typescript
// ❌ FORMA ANTIGUA (decoradores)
export class DemoComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
}

// ✅ FORMA NUEVA (signals)
export class Demo2Component {
  input = viewChild<ElementRef>('input');
  
  constructor() {
    effect(() => {
      this.input()?.nativeElement.focus();
    });
  }
}
```

**TÚ:**
> "Diferencias clave:"
> "1. No necesitas el decorador `@ViewChild`"
> "2. No necesitas `ngAfterViewInit`"
> "3. Usas `effect()` que es reactivo"
> "4. La referencia es un signal, por eso llamas `this.input()` con paréntesis"

---

### Cuándo Usar Cada Sintaxis

**TÚ:**
> "¿Cuál usar?"

```
✅ Proyecto NUEVO (Angular 17+)    → Signals
✅ Proyecto LEGACY (≤ Angular 16)  → Decoradores
✅ Aprendiendo ahora               → Aprende AMBAS
```

**TÚ:**
> "En el mundo real van a encontrar proyectos viejos con decoradores. Por eso es importante conocer ambas formas."

---

### Demo Rápida

**TÚ:**
> "Tenemos un componente demo2 con Signals. Vamos a verlo rápido."

**[ACCIÓN: Navega a /demo2]**

**TÚ:**
> "Este es idéntico al demo1, pero usa signals. Funciona exactamente igual."

**[ACCIÓN: Prueba un botón]**

**TÚ:**
> "¿Ven? Mismo resultado, sintaxis diferente. Más moderna, más simple."

---

## 🎬 PARTE 9: EJERCICIOS PRÁCTICOS (20 min)

**TÚ:**
> "Perfecto. Han visto MUCHO código hoy. Ahora es momento de que ustedes practiquen."

**TÚ:**
> "Voy a darles 3 ejercicios. Escojan el que más les interese. Tienen 20 minutos para intentarlo."

---

**[ACCIÓN: Muestra en pantalla los ejercicios]**

```
📝 EJERCICIO 1: Guard Personalizado (15 min)
- Crear un guard "premiumGuard"
- Verificar si hay isPremium = true en localStorage
- Si NO es premium, redirigir a /login
- Aplicar el guard a la ruta /demo

💡 Pista: Copiar la estructura de auth.guard.ts

---

📝 EJERCICIO 2: ViewChild para Scroll (20 min)
- En home, agregar un <div #top> al inicio
- Agregar botón al final: "Volver arriba"
- Usar ViewChild para capturar #top
- Hacer scroll suave con scrollIntoView()

💡 Pista: elemento.nativeElement.scrollIntoView({behavior: 'smooth'})

---

📝 EJERCICIO 3: Contador de Clicks (25 min)
- En demo, agregar variable clickCounts = [0, 0, 0]
- Al hacer click en UNA caja, incrementar SU contador
- Mostrar el contador en cada caja
- Usar ViewChildren para agregar event listeners

💡 Pista: ViewChildren + forEach + addEventListener
```

---

**TÚ:**
> "¿Tienen dudas sobre alguno? Pregúntenme ahora antes de empezar."

**[Espera y resuelve dudas]**

**TÚ:**
> "Ok, 20 minutos en el reloj. Empiecen con el que quieran. Estoy aquí circulando si necesitan ayuda. ¡Adelante!"

---

**[20 MINUTOS DE TRABAJO]**

**[El profesor circula ayudando individualmente]**

---

**[DESPUÉS DE 20 MINUTOS]**

**TÚ:**
> "Ok, tiempo. ¿Quién quiere compartir su solución? ¿Alguien completó algún ejercicio?"

**[Espera voluntarios]**

**TÚ:**
> "Perfecto, [nombre del alumno], muéstranos tu solución."

**[El alumno comparte pantalla o muestra código]**

**TÚ:**
> "Excelente trabajo. ¿Alguien lo hizo diferente? ¿Alguien tuvo problemas?"

**[Discusión grupal de 5 min]**

---

## 🎬 CIERRE Y Q&A (15 min)

**TÚ:**
> "Excelente sesión. Recapitulemos todo lo que **HICIMOS** hoy:"

**[ACCIÓN: Muestra resumen en pantalla]**

```
✅ LO QUE CUBRIMOS HOY:

1. ✅ Routing - Configurar rutas y navegación SPA
2. ✅ RouterLink - Links sin recargas
3. ✅ Guards - Protección con authGuard
4. ✅ Lazy Loading - Carga dinámica (vimos en DevTools)
5. ✅ ViewChild - Manipular un elemento
6. ✅ ViewChildren - Manipular múltiples elementos
7. ✅ ContentChild - Contenido proyectado
8. ✅ Signals - La nueva sintaxis de Angular 17+
9. ✅ Ejercicios prácticos ✨
```

---

**TÚ:**
> "Tres puntos clave para llevar a casa:"

```
1️⃣ Siempre prefiere Angular sobre manipulación directa del DOM
   ❌ document.querySelector()
   ✅ @ViewChild / viewChild()

2️⃣ SIEMPRE protege rutas sensibles con Guards
   ❌ Rutas sin protección = vulnerabilidad
   ✅ Guards = seguridad

3️⃣ Usa Lazy Loading para optimizar performance
   ❌ Todo en el bundle = app lenta
   ✅ Lazy Loading = carga progresiva
```

---

**TÚ:**
> "Ok, ahora es su momento. ¿Preguntas?"

**[SESIÓN DE PREGUNTAS]**

---

### Preguntas Frecuentes Esperadas

**ALUMNO:**
> "¿ViewChild funciona con directives?"

**TÚ:**
> "Sí, totalmente. Puedes hacer `@ViewChild(MiDirective)` para obtener instancias de directivas personalizadas."

---

**ALUMNO:**
> "¿Puedo tener múltiples Guards en una ruta?"

**TÚ:**
> "Sí, es un array: `canActivate: [authGuard, premiumGuard, roleGuard]`. Se ejecutan en orden. Si uno devuelve false, se bloquea y no se ejecutan los siguientes."

---

**ALUMNO:**
> "¿ContentChild solo funciona con ng-content?"

**TÚ:**
> "Exacto. ContentChild es específicamente para contenido proyectado vía `<ng-content>`. Si no hay proyección de contenido, no tiene sentido usarlo."

---

**ALUMNO:**
> "¿Los Guards pueden ser asíncronos?"

**TÚ:**
> "Sí, excelente pregunta. Pueden devolver `Observable<boolean>` o `Promise<boolean>`. Perfecto para verificar permisos consultando una API antes de permitir acceso."

---

**ALUMNO:**
> "¿Signals reemplazan completamente a los decoradores?"

**TÚ:**
> "No completamente todavía, pero es la dirección futura. Angular está migrando hacia signals. Los decoradores seguirán funcionando pero signals son el camino recomendado para proyectos nuevos."

---

### Recursos para Estudiar

**TÚ:**
> "En el proyecto tienen varios archivos de referencia:"

```
📂 Guías disponibles:
├─ GUIA-MENTORIA-ANGULAR.md      → Explicación completa
├─ REFERENCIA-RAPIDA.md          → Cheatsheet para imprimir
├─ EJERCICIOS-PRACTICOS.md       → 9 ejercicios con soluciones
└─ README-MENTORIA.md            → Manual completo del proyecto
```

**TÚ:**
> "También pueden explorar:"
> - "📂 `demo/` → Código fuente de los ejemplos con decoradores"
> - "📂 `demo2/` → Mismo código pero con signals"
> - "📂 `guards/` → Implementación del authGuard"
> - "📂 `cursos/` → Ejemplo con lazy loading y rutas hijas"

---

### Tarea Opcional

**TÚ:**
> "Para los que quieran seguir practicando en casa, les recomiendo:"

```
📝 TAREA:
1. Completar los 3 ejercicios básicos (si no terminaron)
2. Leer la GUIA-MENTORIA-ANGULAR.md completa
3. Intentar el Ejercicio 7 avanzado (blog completo)
4. Crear tu propio proyecto aplicando estos conceptos

Próxima sesión (si hay): Reactive Forms y HTTP Client
```

---

**TÚ:**
> "Y eso es todo por hoy. ¿Alguna pregunta final antes de terminar?"

**[Responde últimas preguntas]**

**TÚ:**
> "Perfecto. Muchas gracias por su atención y participación. Nos vemos en la próxima sesión. ¡A practicar!"

**TÚ:**
> "Recuerden: la única forma de aprender Angular es **escribiendo código**. Lean la teoría, pero sobre todo, practiquen. Hagan los ejercicios, experimenten, rompan cosas, arreglen cosas. Así se aprende de verdad."

**TÚ:**
> "¡Éxito en su camino con Angular! 🚀"

---

## 📊 NOTAS FINALES PARA EL INSTRUCTOR

### Timing Real Estimado

```
00:00 - 00:10  Introducción y bienvenida
00:10 - 00:25  Routing (15 min)
00:25 - 00:35  RouterLink (10 min)
00:35 - 00:55  Guards (20 min)
00:55 - 01:00  BREAK ☕

01:00 - 01:15  Lazy Loading (15 min)
01:15 - 01:20  BREAK ☕

01:20 - 01:40  ViewChild (20 min)
01:40 - 01:55  ViewChildren (15 min)
01:55 - 02:10  ContentChild/ContentChildren (15 min)
02:10 - 02:20  Bonus: Signals (10 min)
02:20 - 02:40  Ejercicios prácticos (20 min)
02:40 - 02:55  Q&A (15 min)
02:55 - 03:00  Cierre

Total: ~3 horas (ajustar según grupo)
```

### Tips Críticos

✅ **Navega entre archivos EN VIVO** - No solo muestres código estático  
✅ **Usa DevTools SIEMPRE** - Especialmente para lazy loading  
✅ **Console.logs abundantes** - Hace el código visible  
✅ **Pregunta constantemente** - "¿Tiene sentido?" "¿Dudas?"  
✅ **Usa analogías** - Netflix, guardias, cajas de regalo  
✅ **Pausas estratégicas** - Después de conceptos complejos  

❌ **No leas código sin explicar** - Explica el "por qué"  
❌ **No asumas comprensión** - Verifica frecuentemente  
❌ **No saltes entre archivos sin avisar** - Siempre di dónde estás  
❌ **No ignores preguntas** - Todas son válidas  

### Adaptaciones Según el Grupo

**Si el grupo es Junior:**
- Más tiempo en cada concepto (+5 min por concepto)
- Más analogías y ejemplos visuales
- Ejercicios más guiados
- Omitir signals, enfocarse en decoradores

**Si el grupo es Senior:**
- Menos tiempo en conceptos básicos
- Más enfoque en signals y patterns avanzados
- Ejercicios más complejos
- Discusión de casos de uso reales

**Si el grupo es Mixto:**
- Usar el timing estándar
- Hacer pausas para preguntas
- Ofrecer ejercicios de diferentes niveles
- Permitir que seniors ayuden a juniors

---

**🎉 ¡ÉXITO EN TU MENTORÍA! 🎉**

**Versión:** 1.0.0  
**Última actualización:** Abril 2026  
**Duración:** 2.5-3 horas  
**Conceptos:** 8 fundamentales + Signals  
**Ejercicios:** 3 prácticos en clase + 6 para casa
