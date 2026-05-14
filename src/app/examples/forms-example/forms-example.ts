import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forms-example',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-example.html',
  styleUrls: ['./forms-example.css']
})
export class FormsExampleComponent implements OnInit {
  // === TEMPLATE-DRIVEN FORM ===
  templateUser = {
    nombre: '',
    email: '',
    edad: 0,
    comentarios: ''
  };

  // === REACTIVE FORM ===
  reactiveForm!: FormGroup;

  // === STANDALONE FORMCONTROL ===
  searchControl = new FormControl('', [Validators.minLength(3)]);

  // === FORM STATUS TRACKING ===
  templateSubmitted = false;
  reactiveSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Crear formulario reactivo con FormBuilder
    this.reactiveForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // Escuchar cambios en el control de búsqueda
    this.searchControl.valueChanges.subscribe(value => {
      console.log('🔍 Búsqueda:', value);
    });
  }

  // === TEMPLATE-DRIVEN FORM METHODS ===
  onTemplateSubmit(form: any): void {
    this.templateSubmitted = true;
    
    if (form.valid) {
      console.log('✅ Template Form válido:', this.templateUser);
      alert('¡Formulario Template-driven enviado correctamente!');
    } else {
      console.log('❌ Template Form inválido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  resetTemplateForm(form: any): void {
    this.templateSubmitted = false;
    form.reset();
    this.templateUser = {
      nombre: '',
      email: '',
      edad: 0,
      comentarios: ''
    };
  }

  // === REACTIVE FORM METHODS ===
  onReactiveSubmit(): void {
    this.reactiveSubmitted = true;

    if (this.reactiveForm.valid) {
      // Verificar que las contraseñas coincidan
      const password = this.reactiveForm.get('password')?.value;
      const confirmPassword = this.reactiveForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      console.log('✅ Reactive Form válido:', this.reactiveForm.value);
      alert('¡Formulario Reactivo enviado correctamente!');
    } else {
      console.log('❌ Reactive Form inválido');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  resetReactiveForm(): void {
    this.reactiveSubmitted = false;
    this.reactiveForm.reset();
  }

  // === HELPER METHODS ===
  // Para Reactive Form
  get nombre() { return this.reactiveForm.get('nombre'); }
  get email() { return this.reactiveForm.get('email'); }
  get edad() { return this.reactiveForm.get('edad'); }
  get password() { return this.reactiveForm.get('password'); }
  get confirmPassword() { return this.reactiveForm.get('confirmPassword'); }

  // Verificar si un campo reactivo tiene error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.reactiveForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched || this.reactiveSubmitted));
  }

  // === DEMO METHODS ===
  fillTemplateForm(): void {
    this.templateUser = {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      edad: 25,
      comentarios: 'Este es un comentario de prueba'
    };
  }

  fillReactiveForm(): void {
    this.reactiveForm.patchValue({
      nombre: 'María García',
      email: 'maria@example.com',
      edad: 30,
      password: 'password123',
      confirmPassword: 'password123'
    });
  }

  // Marcar todos los campos como tocados (para mostrar errores)
  markAllAsTouched(): void {
    Object.keys(this.reactiveForm.controls).forEach(key => {
      this.reactiveForm.get(key)?.markAsTouched();
    });
  }

  // Mostrar estado del formulario reactivo
  get formStatus(): string {
    if (this.reactiveForm.valid) return '✅ Válido';
    if (this.reactiveForm.invalid) return '❌ Inválido';
    return '⏳ Pendiente';
  }

  // Mostrar si el formulario ha sido tocado
  get formTouched(): boolean {
    return this.reactiveForm.touched;
  }

  // Mostrar si el formulario ha sido modificado
  get formDirty(): boolean {
    return this.reactiveForm.dirty;
  }

  // === SEARCH CONTROL DEMO ===
  onSearch(): void {
    if (this.searchControl.valid) {
      console.log('🔍 Búsqueda ejecutada:', this.searchControl.value);
      alert(`Buscando: ${this.searchControl.value}`);
    } else {
      alert('Debe ingresar al menos 3 caracteres para buscar');
    }
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  // Mostrar estado del control de búsqueda
  get searchStatus(): string {
    if (this.searchControl.valid) return 'válido';
    if (this.searchControl.invalid && this.searchControl.touched) return 'inválido';
    return 'sin tocar';
  }
}
