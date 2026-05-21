# 🎤 DIÁLOGO - RxJS Observables, Signals y Forms

## 📋 GUIÓN PARA EL INSTRUCTOR

Este documento contiene el **diálogo** para explicar los 3 temas adicionales: RxJS Observables, Signals Avanzado y Formularios Completo.

---

## 🎬 BLOQUE 8: RXJS OBSERVABLES (30 min)

### Introducción a RxJS

**TÚ:**
> "Ahora vamos a hablar de **RxJS** - Reactive Extensions for JavaScript. Es una de las bibliotecas más poderosas de Angular, pero también la que más confunde a los principiantes. Vamos a desmitificarla."

**TÚ:**
> "Pregunta rápida: ¿Han usado Netflix o Spotify? Cuando escribes para buscar una serie, ¿la app hace una búsqueda con CADA letra que escribes?"

**ALUMNO:** 
> "No, espera a que termines"

**TÚ:**
> "Exacto. Eso es `debounceTime` en RxJS. La app espera a que dejes de escribir antes de buscar. Vamos a ver cómo funciona."

---

### Paso 1: Concepto de Observable

**TÚ:**
> "Un **Observable** es como una manguera de agua. El agua fluye continuamente (los datos). Tú puedes:"
> - Transformar el agua (map)
> - Filtrar impurezas (filter)
> - Ver qué pasa sin tocar el agua (tap)
> - Cerrar la manguera (unsubscribe)

**[Muestra `rxjs-operators-example.ts`]**

**TÚ:**
> "Vean este código. Es un Observable simple:"

```typescript
of(1, 2, 3, 4, 5).pipe(
  map(x => x * 10),
  filter(x => x > 20)
).subscribe(result => console.log(result));
```

**TÚ:**
> "Se lee así:"
> - `of(1,2,3,4,5)` → Crear observable con esos números
> - `map(x => x * 10)` → Multiplicar cada uno por 10 (10, 20, 30, 40, 50)
> - `filter(x => x > 20)` → Quedarse solo con los mayores a 20 (30, 40, 50)
> - `subscribe` → "Conectar la manguera" y recibir los resultados

---

### Paso 2: Demo map()

**[Abre navegador en /examples/rxjs]**

**TÚ:**
> "Vamos a probarlo en vivo. Click en 'Ejecutar map()'"

**[Click en el botón]**

**TÚ:**
> "¿Ven los logs? Original: [1, 2, 3, 4, 5]. Con map(x => x * 10): [10, 20, 30, 40, 50]"
>
> "map() TRANSFORMA cada valor. Es como hacer .map() en un array, pero para streams asíncronos."

**💡 TIP:** Menciona que map() es el operador más usado en Angular.

---

### Paso 3: Demo filter()

**TÚ:**
> "Ahora filter(). Click en 'Ejecutar filter()'"

**[Click en el botón]**

**TÚ:**
> "Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. Solo pares: [2, 4, 6, 8, 10]"
>
> "filter() es autoexplicativo. Solo deja pasar los valores que cumplen la condición."

---

### Paso 4: Demo debounceTime() - MUY IMPORTANTE

**TÚ:**
> "Este es SÚPER importante. debounceTime(). Lo usarás TODO EL TIEMPO en búsquedas."

**[Muestra el input de búsqueda]**

**TÚ:**
> "Vean este input. Voy a escribir 'Angular' letra por letra."

**[Escribe despacio: A-n-g-u-l-a-r]**

**TÚ:**
> "¿Ven los logs? Dice 'Tecla presionada (esperando 500ms...)' con cada letra. PERO solo hace la búsqueda cuando dejo de escribir por 500ms."
>
> "Sin debounceTime, haríamos 7 peticiones al servidor. Con debounceTime, solo 1."

**💡 TIP:** Esto ahorra MUCHÍSIMO dinero en APIs de pago.

**❓ POR QUÉ USARLO:** 
- Búsquedas en tiempo real
- Autocompletado
- Validación de formularios contra API

---

### Paso 5: switchMap vs mergeMap

**TÚ:**
> "Estos dos confunden a TODOS. La diferencia:"
> - **switchMap**: Cancela la petición anterior si llega una nueva (búsquedas)
> - **mergeMap**: Ejecuta todas las peticiones en paralelo (subir múltiples archivos)

**[Click en 'Ejecutar switchMap()']**

**TÚ:**
> "¿Ven los logs?"
> - Petición 1: 'Angular' iniciada
> - Petición 2: 'React' iniciada (cancela la anterior)
> - Solo recibimos resultado de 'React'

**TÚ:**
> "Ahora mergeMap()"

**[Click en 'Ejecutar mergeMap()']**

**TÚ:**
> "Request 1, 2 y 3 se ejecutan TODOS. Llegan en orden aleatorio porque son asíncronos. Todos completan."

**💡 TIP:** switchMap para búsquedas, mergeMap para acciones independientes.

---

### Paso 6: catchError - Manejo de errores

**TÚ:**
> "En apps reales, las cosas fallan. catchError() maneja errores con gracia."

**[Click en 'Ejecutar catchError()']**

**TÚ:**
> "Miren los logs:"
> - Números 1, 2 procesados (10, 20)
> - Error en el 3
> - catchError lo captura y devuelve 999 como valor por defecto
> - El stream continúa funcionando

**TÚ:**
> "Sin catchError, el stream moriría y ya no recibirías más valores."

---

### Paso 7: takeUntil - Prevenir Memory Leaks

**TÚ:**
> "Esto es CRÍTICO. En el código vean esto:"

```typescript
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

searchSubject$.pipe(
  debounceTime(500),
  takeUntil(this.destroy$)  // ← ESTO
).subscribe(...);
```

**TÚ:**
> "takeUntil(this.destroy$) dice: 'Desuscríbete cuando se destruya el componente'."
>
> "Si no haces esto, las suscripciones siguen vivas aunque el componente muera. Eso es un **memory leak**."

**💡 TIP:** SIEMPRE usa takeUntil() en componentes.

---

### Resumen RxJS

**TÚ:**
> "Operadores que DEBES conocer:"
> - **map**: Transformar valores
> - **filter**: Filtrar valores
> - **tap**: Debugging sin modificar
> - **debounceTime**: Esperar antes de actuar
> - **switchMap**: Cancelar anterior (búsquedas)
> - **mergeMap**: Ejecutar todas (paralelo)
> - **catchError**: Manejar errores
> - **takeUntil**: Prevenir memory leaks

**TÚ:**
> "Con estos 8 operadores, resuelves el 80% de casos reales."

---

## 🎬 BLOQUE 9: SIGNALS AVANZADO (25 min)

### Introducción a Signals

**TÚ:**
> "Signals es la NUEVA forma de manejar estado en Angular 17+. Es más simple que RxJS y más performante."

**TÚ:**
> "Pregunta: ¿Qué es lo que más odian de RxJS?"

**ALUMNO:** 
> "Tener que hacer unsubscribe"

**TÚ:**
> "EXACTO. Con Signals, **no hay unsubscribe**. Angular lo maneja automáticamente."

---

### Paso 1: Signal Básico - Contador

**[Abre navegador en /examples/signals]**

**TÚ:**
> "Vean este contador. El código es súper simple:"

```typescript
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

**TÚ:**
> "Eso es TODO. No hay subscribe, no hay unsubscribe, no hay pipe."

**[Click en Incrementar varias veces]**

**TÚ:**
> "¿Ven cómo se actualiza instantáneamente? Eso es reactividad pura."

**💡 TIP:** Para LEER un signal, usas paréntesis: `count()`

---

### Paso 2: computed() - Valores Derivados

**TÚ:**
> "Miren este código:"

```typescript
count = signal(0);
doubleCount = computed(() => this.count() * 2);
```

**TÚ:**
> "doubleCount es un **computed signal**. Se recalcula automáticamente cuando count cambia."

**[Incrementa el contador]**

**TÚ:**
> "Count = 5, DoubleCount = 10. Count = 6, DoubleCount = 12. Automático. Cero configuración."

**❓ CUÁNDO USAR:** Para valores que dependen de otros (totales, porcentajes, filtros).

---

### Paso 3: effect() - Efectos Secundarios

**TÚ:**
> "effect() es para 'escuchar' cambios y hacer algo. Ejemplo:"

```typescript
effect(() => {
  const currentCount = this.count();
  if (currentCount % 5 === 0) {
    console.log('¡Múltiplo de 5!');
  }
});
```

**[Click en 'Demo Effect']**

**TÚ:**
> "Cuando el contador llega a 5, 10, 15... el effect se ejecuta automáticamente."

**⚠️ CUIDADO:** No abuses de effects. Úsalos solo para side effects (logs, analytics, localStorage).

---

### Paso 4: Signals con Arrays - TO-DO List

**TÚ:**
> "Aquí es donde Signals brilla. Vean esta TO-DO list."

**[Muestra la sección de tareas]**

**TÚ:**
> "Todo esto se maneja con signals:"

```typescript
tasks = signal<Task[]>([]);

addTask() {
  this.tasks.update(tasks => [...tasks, newTask]);
}

completedTasks = computed(() => 
  this.tasks().filter(task => task.completed)
);
```

**[Agrega una tarea]**

**TÚ:**
> "Agregué una tarea. ¿Ven cómo se actualizaron las estadísticas?"
> - Total: +1
> - Pendientes: +1
> - Progreso: recalculado

**TÚ:**
> "TODO eso son computed signals. Se actualizan solos."

**[Marca la tarea como completada]**

**TÚ:**
> "Marqué como completada. Las estadísticas se actualizaron automáticamente. Cero líneas de código extra."

---

### Paso 5: set() vs update()

**TÚ:**
> "Dos formas de modificar signals:"

```typescript
// set() - Valor nuevo directo
count.set(10);

// update() - Basado en el valor anterior
count.update(value => value + 1);
```

**TÚ:**
> "Usa `set()` cuando NO necesitas el valor anterior. Usa `update()` cuando SÍ lo necesitas."

---

### Paso 6: Signals vs RxJS

**[Muestra la tabla de comparación al final]**

**TÚ:**
> "¿Cuándo usar cada uno?"

**Signals:**
- Estado local del componente
- Valores síncronos
- Listas, formularios, contadores

**RxJS:**
- Peticiones HTTP
- WebSockets
- Eventos del DOM complejos
- Operadores como debounceTime, switchMap

**TÚ:**
> "La recomendación de Angular: Usa Signals por defecto. Solo usa RxJS cuando necesites operadores o asincronía compleja."

---

## 🎬 BLOQUE 10: FORMULARIOS COMPLETO (30 min)

### Introducción a Forms

**TÚ:**
> "Angular tiene DOS formas de manejar formularios:"
> - **Template-driven**: Simple, como HTML tradicional
> - **Reactive**: Programático, más poderoso

**TÚ:**
> "Vamos a ver ambos."

---

### Paso 1: Template-Driven Forms

**[Abre /examples/forms]**

**TÚ:**
> "Template-driven usa `[(ngModel)]`. Es two-way binding:"

```html
<input [(ngModel)]="user.name" />
```

**TÚ:**
> "El HTML y el componente están sincronizados. Cambias uno, cambia el otro."

**[Escribe en el input de Template-driven]**

**TÚ:**
> "¿Ven? Escribo aquí y el valor cambia inmediatamente en el componente."

**💡 TIP:** Perfecto para formularios simples (login, registro básico).

---

### Paso 2: Reactive Forms

**TÚ:**
> "Reactive Forms son más poderosos. Todo se controla desde el código:"

```typescript
reactiveForm = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]]
});
```

**TÚ:**
> "Las validaciones están en el TypeScript, no en el HTML. Más testeable, más mantenible."

---

### Paso 3: Validaciones

**[Muestra el formulario reactivo]**

**TÚ:**
> "Vamos a probar las validaciones. Intento enviar el form vacío."

**[Click en Submit sin llenar]**

**TÚ:**
> "Mensajes de error aparecen. Ahora lleno el nombre con solo 2 letras."

**[Escribe 'Ab']**

**TÚ:**
> "'Debe tener al menos 3 caracteres'. Automático."

**[Completa correctamente]**

**TÚ:**
> "Ahora sí. Formulario válido y enviado."

---

### Paso 4: Estado del Formulario

**TÚ:**
> "Los formularios tienen ESTADOS:"

- **valid/invalid**: ¿Es válido?
- **pristine/dirty**: ¿Ha sido modificado?
- **touched/untouched**: ¿Ha sido tocado?

**TÚ:**
> "Úsenlos para mostrar errores SOLO cuando tenga sentido:"

```html
@if (form.get('email')?.invalid && form.get('email')?.touched) {
  <div class="error">Email inválido</div>
}
```

**💡 TIP:** No muestres errores si el usuario ni siquiera ha tocado el campo.

---

### Resumen Forms

**TÚ:**
> "Template-driven vs Reactive:"

| Template-Driven | Reactive |
|---|---|
| Simple | Más código |
| Validaciones en HTML | Validaciones en TS |
| Forms pequeños | Forms complejos |
| Menos testeable | Muy testeable |

**TÚ:**
> "Recomendación: Usa Reactive Forms para apps profesionales."

---

## 📊 RESUMEN FINAL - 3 TEMAS NUEVOS

**TÚ:**
> "Recapitulemos lo que vimos:"

**RxJS Observables:**
- map, filter, tap
- debounceTime (búsquedas)
- switchMap vs mergeMap
- catchError (errores)
- takeUntil (memory leaks)

**Signals:**
- signal() para valores reactivos
- computed() para valores derivados
- effect() para side effects
- .set() y .update()
- Más simple que RxJS

**Formularios:**
- Template-driven (simple)
- Reactive (profesional)
- Validaciones (required, email, custom)
- Estado del form (valid, dirty, touched)

---

## 💡 TIPS FINALES

**✅ Hacer:**
- Usa debounceTime en TODAS las búsquedas
- Usa takeUntil para prevenir memory leaks
- Usa Signals para estado local
- Usa Reactive Forms en apps profesionales

**❌ Evitar:**
- Múltiples suscripciones sin unsubscribe
- Ignorar errores (siempre usa catchError)
- Template-driven forms en apps grandes
- Abusar de effects

---

## 🎯 EJERCICIOS PRÁCTICOS

**Para los estudiantes:**

1. **RxJS**: Crear un buscador de películas con debounceTime
2. **Signals**: Crear un carrito de compras con computed totals
3. **Forms**: Crear un formulario de registro con validaciones custom

---

**🚀 ¡Eso es todo! Tienen ahora las herramientas para construir aplicaciones Angular profesionales. 🚀**

---

**📌 Última actualización:** Mayo 2026  
**📌 Angular Version:** 21.2.0  
**📌 Tiempo total:** ~1.5 horas adicionales
