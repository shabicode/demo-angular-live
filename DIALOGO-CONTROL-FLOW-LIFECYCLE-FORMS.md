# 🎤 DIÁLOGO - Control Flow, Lifecycle Hooks y Formularios Angular

## 📋 GUIÓN PARA EL INSTRUCTOR

Este documento contiene el **diálogo** para explicar Control Flow (@if, @for, @switch, @let), Lifecycle Hooks y Formularios en Angular. Formato de instructor monólogo con código en vivo.

---

## 🎬 BLOQUE 1: CONTROL FLOW CON BLOQUES (30 min)

### Introducción al Control Flow Moderno

**TÚ:**
> "Vamos a hablar de Control Flow en Angular 17+. Esto cambió completamente. Antes usábamos `*ngIf`, `*ngFor`, `*ngSwitch`. Ahora usamos `@if`, `@for`, `@switch`. Es más simple, más legible, más parecido a JavaScript normal."

**💡 TIP:** Menciona que la sintaxis antigua todavía funciona, pero la nueva es mejor.

**❓ POR QUÉ USARLO:** Código más limpio, mejor performance, sintaxis más familiar.

**⏰ CUÁNDO USARLO:** Siempre que necesites mostrar/ocultar elementos o iterar listas.

---

### @if - Renderizado Condicional

**TÚ:**
> "Empecemos con `@if`. Mostrar u ocultar cosas según una condición. Abrimos el código."

**[Muestra `control-flow-example.html` líneas del primer @if]**

```html
@if (isLoggedIn) {
  <div>¡Bienvenido!</div>
}
```

**TÚ:**
> "Eso es todo. Si `isLoggedIn` es `true`, se muestra el div. Si es `false`, no existe en el DOM. Desaparece completamente."

**TÚ:**
> "Ahora, `@if` con `@else`:"

```html
@if (isPremium) {
  <div>⭐ Usuario Premium</div>
} @else {
  <div>Usuario Básico</div>
}
```

**TÚ:**
> "Una u otra. Nunca las dos al mismo tiempo. Lógica simple."

**TÚ:**
> "Y con múltiples condiciones:"

```html
@if (loading) {
  <div>Cargando...</div>
} @else if (error) {
  <div>Error</div>
} @else {
  <div>Datos cargados</div>
}
```

**💡 TIP:** Siempre incluye un `@else` para casos inesperados.

**❓ POR QUÉ USARLO:** Control total de qué se muestra en la UI según el estado.

**⏰ CUÁNDO USARLO:** Login/logout, roles de usuario, estados de carga, mostrar/ocultar secciones.

---

### @for - Iteración sobre Listas

**TÚ:**
> "Ahora `@for`. Recorrer arrays y mostrar cada elemento. Pero aquí viene algo IMPORTANTE: el `track` es **obligatorio**."

**[Muestra el código del @for con productos]**

```html
@for (product of products; track product.id) {
  <div class="product-card">
    <h4>{{ product.name }}</h4>
    <p>${{ product.price }}</p>
  </div>
}
```

**TÚ:**
> "Vean ese `track product.id`. Angular necesita saber QUÉ identifica únicamente a cada elemento. Puede ser el `id`, puede ser `$index` si no hay id. Pero es obligatorio."

**TÚ:**
> "¿Por qué? Para optimización. Si elimino un producto, Angular solo elimina ESE card, no recrea todos. Performance."

**💡 TIP:** Siempre usa un `id` único para track, no `$index` a menos que sea absolutamente necesario.

**❓ POR QUÉ USARLO:** Mostrar listas dinámicas eficientemente.

**⏰ CUÁNDO USARLO:** Productos, usuarios, comentarios, cualquier lista que venga del servidor.

---

### Variables Contextuales en @for

**TÚ:**
> "Dentro de `@for` tenemos variables especiales. Miren:"

```html
@for (item of items; track item.id; let i = $index; let isFirst = $first; let isLast = $last) {
  <div>
    Elemento {{ i }} 
    @if (isFirst) { - PRIMERO }
    @if (isLast) { - ÚLTIMO }
  </div>
}
```

**TÚ:**
> "Tenemos `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`. Útiles para aplicar estilos especiales o lógica."

**💡 TIP:** Usa `$first` y `$last` para estilos especiales en bordes o separadores.

---

### @empty - Lista Vacía

**TÚ:**
> "Nuevo en Angular 17: `@empty`. Qué mostrar cuando la lista está vacía."

```html
@for (item of products; track item.id) {
  <div>{{ item.name }}</div>
} @empty {
  <div>📭 No hay productos disponibles</div>
}
```

**TÚ:**
> "Antes teníamos que hacer un `@if` externo. Ahora está integrado. Más limpio."

**💡 TIP:** Siempre incluye un `@empty` para mejor UX.

**❓ POR QUÉ USARLO:** Feedback al usuario cuando no hay datos.

**⏰ CUÁNDO USARLO:** Cualquier lista que pueda estar vacía (búsquedas, filtros, listas nuevas).

---

### @switch - Selección Múltiple

**TÚ:**
> "Ahora `@switch`. Cuando tienes múltiples casos posibles. Miren el ejemplo del estado de pedido:"

**[Muestra el @switch con orderStatus]**

```html
@switch (orderStatus) {
  @case ('pending') {
    <div>⏳ Pedido Pendiente</div>
  }
  @case ('processing') {
    <div>⚙️ Procesando</div>
  }
  @case ('shipped') {
    <div>🚚 Enviado</div>
  }
  @case ('delivered') {
    <div>✅ Entregado</div>
  }
  @default {
    <div>Estado Desconocido</div>
  }
}
```

**TÚ:**
> "Más limpio que hacer `@if / @else if` 5 veces. Y siempre incluyan `@default` para casos no esperados."

**💡 TIP:** Usa `@switch` cuando tienes más de 3 casos posibles.

**❓ POR QUÉ USARLO:** Código más legible que múltiples `@if`.

**⏰ CUÁNDO USARLO:** Estados de pedidos, roles de usuario, tipos de notificaciones, categorías.

---

### @let - Variables Locales

**TÚ:**
> "Novedad de Angular 18: `@let`. Crear variables locales en el template para evitar cálculos repetidos."

```html
@let total = price * quantity;
@let tax = total * 0.16;
@let finalPrice = total + tax;

<div>Total: ${{ finalPrice }}</div>
```

**TÚ:**
> "Antes teníamos que calcular en el TypeScript o crear pipes. Ahora lo hacemos directo en el template. Útil para cálculos simples."

**💡 TIP:** Usa `@let` para evitar llamar métodos múltiples veces en el template.

**❓ POR QUÉ USARLO:** Performance y legibilidad.

**⏰ CUÁNDO USARLO:** Cálculos matemáticos, transformaciones de strings, manipulación de fechas en el template.

---

### Resumen Control Flow

**TÚ:**
> "Recapitulemos los bloques de control:"
> - `@if` → Mostrar/ocultar según condición
> - `@for` → Iterar listas (track obligatorio)
> - `@empty` → Mensaje cuando lista vacía
> - `@switch` → Múltiples casos
> - `@let` → Variables locales
>
> "Todos reemplazan las directivas antiguas. Más simples, más rápidos, más legibles."

---

## 🎬 BLOQUE 2: LIFECYCLE HOOKS (30 min)

### Introducción a Lifecycle Hooks

**TÚ:**
> "Ahora vamos con Lifecycle Hooks. El ciclo de vida de un componente. Desde que nace hasta que muere."

**TÚ:**
> "Angular llama ciertos métodos automáticamente en momentos específicos. Nosotros implementamos esos métodos para hacer cosas en el momento correcto."

**💡 TIP:** No todos los hooks son necesarios. Los más usados: `constructor`, `ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`.

**❓ POR QUÉ USARLO:** Ejecutar código en el momento preciso del ciclo de vida.

**⏰ CUÁNDO USARLO:** Cargar datos, limpiar recursos, acceder a elementos del DOM.

---

### constructor() - Creación del Componente

**TÚ:**
> "Primero: `constructor()`. Se ejecuta ANTES que todo cuando Angular crea el componente."

**[Muestra el código del constructor]**

```typescript
constructor(private myService: MyService) {
  console.log('Componente creado');
}
```

**TÚ:**
> "Aquí solo inyecta dependencias. No hagas llamadas HTTP, no accedas al DOM, no hagas lógica compleja. Solo inyección de dependencias."

**💡 TIP:** Mantén el constructor simple. Solo para inyección de dependencias.

**❓ POR QUÉ USARLO:** Para inyectar servicios que necesitas.

**⏰ CUÁNDO USARLO:** Siempre que necesites inyectar servicios (HttpClient, Router, etc).

**⚠️ NO HACER:** Llamadas HTTP, acceder a ViewChild, lógica de negocio.

---

### ngOnChanges() - Cambios en @Input

**TÚ:**
> "Segundo: `ngOnChanges()`. Se ejecuta cuando cambian los valores de `@Input()`."

```typescript
@Input() userName = '';

ngOnChanges(changes: SimpleChanges) {
  console.log('Input cambió:', changes);
}
```

**TÚ:**
> "Útil para componentes hijos que reciben datos del padre. Si el padre cambia el valor, este hook se ejecuta."

**💡 TIP:** Usa `ngOnChanges` para reaccionar a cambios de props del padre.

**❓ POR QUÉ USARLO:** Para ejecutar lógica cuando cambian los inputs.

**⏰ CUÁNDO USARLO:** Validaciones, recalcular valores, actualizar estado interno.

---

### ngOnInit() - Inicialización

**TÚ:**
> "Tercero: `ngOnInit()`. El más usado. Se ejecuta UNA VEZ después del primer `ngOnChanges`."

```typescript
ngOnInit() {
  this.loadData();
  this.initForm();
  this.subscribeToEvents();
}
```

**TÚ:**
> "Aquí SÍ haces llamadas HTTP, inicializas formularios, te suscribes a observables. El lugar perfecto para setup."

**💡 TIP:** Este es tu hook principal para inicialización. Úsalo siempre.

**❓ POR QUÉ USARLO:** Inicializar datos y configuración del componente.

**⏰ CUÁNDO USARLO:** Cargar datos del servidor, inicializar formularios, setup de subscripciones.

**✅ SÍ HACER:** Llamadas HTTP, inicializar variables, crear formularios.

---

### ngDoCheck() - Detección de Cambios

**TÚ:**
> "Cuarto: `ngDoCheck()`. Se ejecuta en CADA ciclo de detección de cambios. O sea, constantemente."

**TÚ:**
> "⚠️ CUIDADO: Se ejecuta muchísimo. No pongas operaciones costosas aquí. Solo úsalo para detección de cambios personalizada."

**💡 TIP:** Evita este hook a menos que necesites detección de cambios muy específica.

**❓ POR QUÉ USARLO:** Detección personalizada de cambios que Angular no detecta automáticamente.

**⏰ CUÁNDO USARLO:** Raramente. Solo para cambios en objetos mutables que Angular no detecta.

---

### ngAfterViewInit() - Vista Inicializada

**TÚ:**
> "Quinto: `ngAfterViewInit()`. Se ejecuta UNA VEZ después de que la vista del componente está completamente inicializada."

**[Muestra el código con ViewChild]**

```typescript
@ViewChild('myInput') myInput!: ElementRef;

ngAfterViewInit() {
  // Aquí ya puedes acceder al ViewChild
  this.myInput.nativeElement.focus();
}
```

**TÚ:**
> "Este es el momento para acceder a `@ViewChild` y `@ViewChildren`. Antes de este hook, no están disponibles."

**💡 TIP:** Siempre accede a ViewChild en `ngAfterViewInit`, nunca antes.

**❓ POR QUÉ USARLO:** Para manipular elementos del DOM o componentes hijos.

**⏰ CUÁNDO USARLO:** Enfocar inputs, obtener dimensiones, inicializar librerías de terceros (charts, maps).

---

### ngAfterContentInit() - Contenido Proyectado

**TÚ:**
> "Sexto: `ngAfterContentInit()`. Para contenido proyectado con `<ng-content>`."

**TÚ:**
> "Si tu componente tiene `<ng-content>` y necesitas acceder a lo que se proyectó, usa este hook."

**💡 TIP:** Solo necesario si usas proyección de contenido.

**❓ POR QUÉ USARLO:** Acceder a contenido proyectado.

**⏰ CUÁNDO USARLO:** Componentes wrapper, layouts, tabs, accordions.

---

### ngOnDestroy() - Destrucción del Componente

**TÚ:**
> "Séptimo: `ngOnDestroy()`. Se ejecuta UNA VEZ justo antes de que Angular destruya el componente."

**[Muestra el código de cleanup]**

```typescript
timerInterval: any;

ngOnInit() {
  this.timerInterval = setInterval(() => {
    console.log('tick');
  }, 1000);
}

ngOnDestroy() {
  clearInterval(this.timerInterval);
  console.log('Componente destruido, timer limpiado');
}
```

**TÚ:**
> "SÚPER IMPORTANTE. Aquí limpias todo: subscripciones, timers, event listeners. Si no lo haces, tendrás memory leaks."

**💡 TIP:** Siempre implementa `ngOnDestroy` si creaste subscripciones o timers.

**❓ POR QUÉ USARLO:** Prevenir memory leaks.

**⏰ CUÁNDO USARLO:** Siempre que tengas subscripciones, timers, websockets, event listeners.

**⚠️ CRÍTICO:** Olvida limpiar en `ngOnDestroy` = memory leak = app lenta.

---

### Resumen Lifecycle Hooks

**TÚ:**
> "Orden de ejecución:"
> 1. `constructor()` - Crear componente
> 2. `ngOnChanges()` - Cambios en @Input
> 3. `ngOnInit()` - Inicializar datos ← **Más usado**
> 4. `ngDoCheck()` - Cada detección de cambios
> 5. `ngAfterContentInit()` - Contenido inicializado
> 6. `ngAfterViewInit()` - Vista inicializada ← **Para ViewChild**
> 7. `ngOnDestroy()` - Limpiar recursos ← **Prevenir leaks**

**TÚ:**
> "Los 3 más importantes: `ngOnInit`, `ngAfterViewInit`, `ngOnDestroy`. Dominen esos y están bien."

---

## 🎬 BLOQUE 3: FORMULARIOS (30 min)

### Template-Driven vs Reactive Forms

**TÚ:**
> "Angular tiene DOS formas de manejar formularios: Template-driven y Reactive. Vamos a ver ambos y cuándo usar cada uno."

**💡 TIP:** Template-driven para formularios simples, Reactive para formularios complejos.

---

### Template-Driven Forms

**TÚ:**
> "Template-driven: la configuración está en el HTML. Usamos `ngModel` para binding bidireccional."

**[Muestra el código del formulario template-driven]**

```html
<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
  <input
    name="email"
    [(ngModel)]="user.email"
    required
    email
  />
</form>
```

```typescript
user = { email: '' };

onSubmit(form: any) {
  if (form.valid) {
    console.log('Email:', this.user.email);
  }
}
```

**TÚ:**
> "Las validaciones están en el HTML: `required`, `email`, `minlength`, `maxlength`. Simple y rápido."

**💡 TIP:** Usa Template-driven para login, contacto, búsquedas simples.

**❓ POR QUÉ USARLO:** Rápido de implementar para formularios simples.

**⏰ CUÁNDO USARLO:** Formularios pequeños, prototipos, menos de 5 campos.

**✅ VENTAJAS:** Menos código TypeScript, más rápido de escribir.

**❌ DESVENTAJAS:** Difícil de testear, validaciones limitadas.

---

### Reactive Forms

**TÚ:**
> "Reactive: la configuración está en el TypeScript. Usamos `FormGroup` y `FormControl`."

**[Muestra el código del formulario reactivo]**

```typescript
import { FormBuilder, Validators } from '@angular/forms';

constructor(private fb: FormBuilder) {}

form = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  edad: [null, [Validators.min(18), Validators.max(100)]]
});

onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="nombre" />
  <input formControlName="email" />
  <input formControlName="edad" type="number" />
</form>
```

**TÚ:**
> "Todo está en TypeScript: estructura, validaciones, valores iniciales. Más control, más poder."

**💡 TIP:** Usa Reactive para formularios profesionales. Más control y testeable.

**❓ POR QUÉ USARLO:** Control total, validaciones dinámicas, fácil de testear.

**⏰ CUÁNDO USARLO:** Formularios complejos, validaciones personalizadas, formularios dinámicos.

**✅ VENTAJAS:** Testeable, validaciones dinámicas, control total.

**❌ DESVENTAJAS:** Más código TypeScript, curva de aprendizaje.

---

### Validaciones en Formularios

**TÚ:**
> "Validaciones built-in de Angular:"

```typescript
Validators.required          // Campo requerido
Validators.email             // Email válido
Validators.min(18)           // Valor mínimo
Validators.max(100)          // Valor máximo
Validators.minLength(3)      // Longitud mínima
Validators.maxLength(50)     // Longitud máxima
Validators.pattern(/regex/)  // Expresión regular
```

**TÚ:**
> "Y puedes crear validadores personalizados para lógica compleja."

**💡 TIP:** Combina múltiples validadores en un array para un mismo campo.

---

### Clases CSS Automáticas

**TÚ:**
> "Angular aplica clases CSS automáticamente según el estado del campo:"

```css
.ng-valid    /* Campo válido */
.ng-invalid  /* Campo inválido */
.ng-touched  /* Usuario tocó el campo */
.ng-untouched /* Aún no tocado */
.ng-dirty    /* Valor fue modificado */
.ng-pristine  /* Valor no modificado */
```

**TÚ:**
> "Puedes usar estas clases para mostrar bordes rojos en campos inválidos:"

```css
input.ng-invalid.ng-touched {
  border-color: red;
}
```

**💡 TIP:** Combina `ng-invalid` con `ng-touched` para mostrar errores solo después de que el usuario interactuó.

**❓ POR QUÉ USARLO:** Feedback visual automático.

**⏰ CUÁNDO USARLO:** Siempre. Mejora UX sin código extra.

---

### Mostrar Mensajes de Error

**TÚ:**
> "Para mostrar mensajes de error específicos:"

```html
<input formControlName="email" />

@if (email?.invalid && email?.touched) {
  <div class="error">
    @if (email?.errors?.['required']) {
      <span>El email es requerido</span>
    }
    @if (email?.errors?.['email']) {
      <span>Email inválido</span>
    }
  </div>
}
```

```typescript
get email() {
  return this.form.get('email');
}
```

**TÚ:**
> "Acceso fácil a los errores de cada campo. Mensajes específicos para cada tipo de error."

**💡 TIP:** Crea getters para los campos para acceso más limpio en el template.

---

### FormControl Standalone

**TÚ:**
> "Puedes usar `FormControl` de forma independiente, sin `FormGroup`:"

```typescript
searchControl = new FormControl('', [Validators.minLength(3)]);

ngOnInit() {
  this.searchControl.valueChanges.subscribe(value => {
    console.log('Búsqueda:', value);
  });
}
```

```html
<input [formControl]="searchControl" placeholder="Buscar..." />
```

**TÚ:**
> "Perfecto para búsquedas, filtros, campos individuales que no están en un formulario grande."

**💡 TIP:** Usa standalone FormControl para búsquedas con debounce.

**❓ POR QUÉ USARLO:** Control de un solo campo sin necesidad de FormGroup.

**⏰ CUÁNDO USARLO:** Búsquedas, filtros, campos independientes.

---

### Template Reference Variables (#)

**TÚ:**
> "Puedes referenciar elementos del template con `#nombreVariable`:"

```html
<input #myInput type="text" />

<button (click)="myInput.focus()">Enfocar Input</button>
<button (click)="myInput.value = ''">Limpiar</button>

<p>Valor actual: {{ myInput.value }}</p>
```

**TÚ:**
> "Acceso directo al elemento DOM desde el template. Útil para operaciones simples sin TypeScript."

**💡 TIP:** Usa template references para operaciones simples en el template.

**❓ POR QUÉ USARLO:** Acceso rápido a elementos sin ViewChild.

**⏰ CUÁNDO USARLO:** Botones que interactúan con inputs, mostrar valores, operaciones simples.

---

### Resumen Formularios

**TÚ:**
> "Dos tipos de formularios:"
> - **Template-driven**: Rápido, simple, validaciones en HTML
> - **Reactive**: Profesional, control total, validaciones en TypeScript
>
> "Validaciones automáticas, clases CSS automáticas, mensajes de error dinámicos."
>
> "FormControl standalone para campos individuales. Template references para operaciones rápidas."

---

## 🎬 CIERRE Y MEJORES PRÁCTICAS

### Mejores Prácticas Generales

**TÚ:**
> "Antes de terminar, mejores prácticas generales:"

**Control Flow:**
- ✅ Siempre usa `track` en `@for`
- ✅ Incluye `@empty` en listas que pueden estar vacías
- ✅ Usa `@switch` para más de 3 casos
- ✅ Prefiere `@let` para cálculos simples en templates

**Lifecycle Hooks:**
- ✅ Constructor solo para inyección de dependencias
- ✅ `ngOnInit()` para cargar datos
- ✅ `ngAfterViewInit()` para ViewChild
- ✅ SIEMPRE `ngOnDestroy()` para limpiar
- ❌ No lógica compleja en constructor
- ❌ No olvidar limpiar subscripciones

**Formularios:**
- ✅ Template-driven para formularios simples
- ✅ Reactive para formularios profesionales
- ✅ Combina `ng-invalid` con `ng-touched` para errores
- ✅ Crea getters para acceso limpio a campos
- ❌ No olvides validar en el servidor también

---

### Recursos Adicionales

**TÚ:**
> "Todos los componentes de ejemplo están en la carpeta `src/app/examples/`:"
> - `control-flow-example` - Todos los bloques de control
> - `lifecycle-example` - Hooks con logs en tiempo real
> - `forms-example` - Template-driven y Reactive
>
> "Naveguen el código, experimenten, rompan cosas. Así se aprende."

---

### Preguntas Finales

**TÚ:**
> "¿Preguntas? Ahora es el momento. Conceptos claros, práctica, y a codear."

---

## 📝 NOTAS PARA EL INSTRUCTOR

### Ritmo Recomendado
- Control Flow: 30 minutos
- Lifecycle Hooks: 30 minutos
- Formularios: 30 minutos
- Preguntas y práctica: 30 minutos
- **Total: 2 horas**

### Código en Vivo
- Abre los componentes de ejemplo mientras explicas
- Ejecuta la app y muestra los ejemplos funcionando
- Modifica valores en vivo para mostrar reactividad
- Usa console.log para mostrar el flujo de ejecución

### Analogías Útiles
- **@if**: Interruptor de luz (on/off)
- **@for**: Fila de personas, cada una con un número
- **@switch**: Selector de canales de TV
- **Lifecycle Hooks**: Etapas de vida humana (nacer, crecer, morir)
- **Template-driven**: Receta simple con ingredientes listados
- **Reactive**: Sistema de control avanzado con diales y medidores

### Puntos Críticos a Enfatizar
1. `track` es OBLIGATORIO en `@for`
2. `ngOnDestroy()` para prevenir memory leaks
3. ViewChild solo disponible en `ngAfterViewInit()`
4. Validaciones también en el servidor
5. Reactive Forms para producción

---

**FIN DEL GUIÓN**
