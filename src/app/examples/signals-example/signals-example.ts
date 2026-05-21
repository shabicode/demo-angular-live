import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface LogEntry {
  type: string;
  message: string;
  timestamp: string;
  color: string;
}

@Component({
  selector: 'app-signals-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals-example.html',
  styleUrls: ['./signals-example.css']
})
export class SignalsExampleComponent implements OnInit {
  
  // === SIGNALS BÁSICOS ===
  // Signal primitivo
  count = signal(0);
  
  // Signal de objeto
  user = signal({
    name: 'Juan Pérez',
    email: 'juan@email.com',
    age: 25
  });

  // Signal de array
  tasks = signal<Task[]>([
    { id: 1, title: 'Aprender Signals', completed: true, priority: 'high' },
    { id: 2, title: 'Crear componente con Signals', completed: false, priority: 'medium' },
    { id: 3, title: 'Comparar con RxJS', completed: false, priority: 'low' }
  ]);

  // === COMPUTED SIGNALS ===
  // Computed: Se recalcula automáticamente cuando cambian sus dependencias
  doubleCount = computed(() => this.count() * 2);
  
  completedTasks = computed(() => 
    this.tasks().filter(task => task.completed)
  );

  pendingTasks = computed(() => 
    this.tasks().filter(task => !task.completed)
  );

  completionPercentage = computed(() => {
    const total = this.tasks().length;
    if (total === 0) return 0;
    return Math.round((this.completedTasks().length / total) * 100);
  });

  highPriorityTasks = computed(() =>
    this.tasks().filter(task => task.priority === 'high' && !task.completed)
  );

  userInfo = computed(() => 
    `${this.user().name} (${this.user().age} años) - ${this.user().email}`
  );

  // === SIGNALS PARA UI ===
  newTaskTitle = signal('');
  selectedPriority = signal<'low' | 'medium' | 'high'>('medium');
  filterStatus = signal<'all' | 'completed' | 'pending'>('all');

  filteredTasks = computed(() => {
    const filter = this.filterStatus();
    const allTasks = this.tasks();
    
    switch(filter) {
      case 'completed':
        return allTasks.filter(t => t.completed);
      case 'pending':
        return allTasks.filter(t => !t.completed);
      default:
        return allTasks;
    }
  });

  // === LOGS ===
  logs = signal<LogEntry[]>([]);

  // === EFFECT ===
  // Effect: Se ejecuta cuando cambian los signals que lee
  constructor() {
    // Effect que se ejecuta cuando cambia count
    effect(() => {
      const currentCount = this.count();
      console.log('🔔 Effect: Count cambió a:', currentCount);
      
      if (currentCount > 0 && currentCount % 5 === 0) {
        this.addLog('effect', `¡Múltiplo de 5 alcanzado! Count = ${currentCount}`, '#9c27b0');
      }
    });

    // Effect que se ejecuta cuando cambia el porcentaje de completado
    effect(() => {
      const percentage = this.completionPercentage();
      console.log('🔔 Effect: Completion cambió a:', percentage + '%');
      
      if (percentage === 100) {
        this.addLog('effect', '🎉 ¡Todas las tareas completadas!', '#4caf50');
      }
    });

    this.addLog('constructor', '🏗️ Componente Signals creado', '#9c27b0');
  }

  ngOnInit(): void {
    this.addLog('ngOnInit', '✅ Componente inicializado', '#4caf50');
  }

  // === COUNTER METHODS ===
  increment(): void {
    // update() para modificar basándose en el valor anterior
    this.count.update(value => value + 1);
    this.addLog('update', `Contador incrementado a ${this.count()}`, '#1976d2');
  }

  decrement(): void {
    this.count.update(value => Math.max(0, value - 1));
    this.addLog('update', `Contador decrementado a ${this.count()}`, '#ff9800');
  }

  reset(): void {
    // set() para establecer un valor directamente
    this.count.set(0);
    this.addLog('set', 'Contador reseteado a 0', '#f44336');
  }

  setCount(value: number): void {
    this.count.set(value);
    this.addLog('set', `Contador establecido a ${value}`, '#03a9f4');
  }

  // === USER METHODS ===
  updateUserName(name: string): void {
    // Actualizar un objeto signal
    this.user.update(user => ({
      ...user,
      name: name
    }));
    this.addLog('update', `Nombre actualizado a: ${name}`, '#673ab7');
  }

  updateUserAge(age: number): void {
    this.user.update(user => ({
      ...user,
      age: age
    }));
    this.addLog('update', `Edad actualizada a: ${age}`, '#673ab7');
  }

  updateUserEmail(email: string): void {
    this.user.update(user => ({
      ...user,
      email: email
    }));
    this.addLog('update', `Email actualizado a: ${email}`, '#673ab7');
  }

  // === TASKS METHODS ===
  addTask(): void {
    const title = this.newTaskTitle().trim();
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: this.selectedPriority()
    };

    // Agregar a un array signal
    this.tasks.update(tasks => [...tasks, newTask]);
    this.newTaskTitle.set('');
    this.addLog('update', `Tarea agregada: "${title}"`, '#4caf50');
  }

  toggleTask(taskId: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    this.addLog('update', 'Estado de tarea cambiado', '#ff9800');
  }

  deleteTask(taskId: number): void {
    const task = this.tasks().find(t => t.id === taskId);
    this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
    this.addLog('update', `Tarea eliminada: "${task?.title}"`, '#f44336');
  }

  changePriority(taskId: number, priority: 'low' | 'medium' | 'high'): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === taskId
          ? { ...task, priority }
          : task
      )
    );
    this.addLog('update', `Prioridad cambiada a: ${priority}`, '#00bcd4');
  }

  clearCompleted(): void {
    const completedCount = this.completedTasks().length;
    this.tasks.update(tasks => tasks.filter(t => !t.completed));
    this.addLog('update', `${completedCount} tareas completadas eliminadas`, '#f44336');
  }

  completeAll(): void {
    this.tasks.update(tasks =>
      tasks.map(task => ({ ...task, completed: true }))
    );
    this.addLog('update', 'Todas las tareas marcadas como completadas', '#4caf50');
  }

  // === FILTER METHODS ===
  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    this.filterStatus.set(filter);
    this.addLog('set', `Filtro cambiado a: ${filter}`, '#03a9f4');
  }

  // === HELPER METHODS ===
  addLog(type: string, message: string, color: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.update(logs => [...logs, { type, timestamp, message, color }]);

    // Limitar a 50 logs
    if (this.logs().length > 50) {
      this.logs.update(logs => logs.slice(1));
    }
  }

  clearLogs(): void {
    this.logs.set([]);
    console.log('🗑️ Logs limpiados');
  }

  getPriorityColor(priority: string): string {
    switch(priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#6c757d';
    }
  }

  getPriorityIcon(priority: string): string {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'constructor': '🏗️',
      'ngOnInit': '✅',
      'effect': '🔔',
      'set': '📝',
      'update': '🔄',
    };
    return icons[type] || '📌';
  }

  // === DEMO METHODS ===
  demoSignalMutation(): void {
    this.addLog('demo', '🎯 Demo: No se puede mutar directamente', '#e91e63');
    
    // INCORRECTO (no funciona con signals)
    // this.count() = 10; ❌
    
    // CORRECTO
    this.count.set(10);
    this.addLog('demo', '✅ Usar .set() o .update() en su lugar', '#4caf50');
  }

  demoComputed(): void {
    this.addLog('computed', '🎯 Demo: Computed se recalcula automáticamente', '#673ab7');
    
    this.count.set(5);
    this.addLog('computed', `Count = ${this.count()}, DoubleCount = ${this.doubleCount()}`, '#673ab7');
    
    setTimeout(() => {
      this.count.set(10);
      this.addLog('computed', `Count = ${this.count()}, DoubleCount = ${this.doubleCount()}`, '#673ab7');
    }, 1000);
  }

  demoEffect(): void {
    this.addLog('effect', '🎯 Demo: Effect se ejecuta automáticamente', '#9c27b0');
    
    // Los effects ya están configurados en el constructor
    // Incrementar count activará el effect
    let currentCount = this.count();
    const target = Math.ceil((currentCount + 1) / 5) * 5;
    
    this.count.set(target);
    this.addLog('effect', `Establecido a ${target} para activar effect`, '#9c27b0');
  }
}
