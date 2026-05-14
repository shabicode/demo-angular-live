import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface User {
  name: string;
  role: 'admin' | 'editor' | 'viewer' | 'guest';
}

@Component({
  selector: 'app-control-flow-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-flow-example.html',
  styleUrls: ['./control-flow-example.css']
})
export class ControlFlowExampleComponent {
  // === @IF EXAMPLES ===
  isLoggedIn = false;
  isPremium = false;
  loadingData = false;
  errorMessage = '';

  // === @FOR EXAMPLES ===
  products: Product[] = [
    { id: 1, name: 'Laptop HP', price: 899, stock: 5, category: 'Electrónica' },
    { id: 2, name: 'Mouse Logitech', price: 25, stock: 0, category: 'Accesorios' },
    { id: 3, name: 'Teclado Mecánico', price: 120, stock: 8, category: 'Accesorios' },
    { id: 4, name: 'Monitor Dell 27"', price: 350, stock: 3, category: 'Electrónica' }
  ];

  emptyList: any[] = [];

  // === @SWITCH EXAMPLES ===
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' = 'pending';

  // === USER ROLE EXAMPLES ===
  currentUser: User = {
    name: 'Juan Pérez',
    role: 'viewer'
  };

  // === @LET EXAMPLES ===
  complexCalculation = {
    value: 100,
    tax: 0.16,
    discount: 0.10
  };

  // === MÉTODOS PARA @IF ===
  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
    console.log('🔐 Login:', this.isLoggedIn ? 'Conectado' : 'Desconectado');
  }

  togglePremium(): void {
    this.isPremium = !this.isPremium;
    console.log('⭐ Premium:', this.isPremium ? 'Activado' : 'Desactivado');
  }

  simulateLoading(): void {
    this.loadingData = true;
    this.errorMessage = '';
    console.log('⏳ Cargando datos...');

    setTimeout(() => {
      this.loadingData = false;
      console.log('✅ Datos cargados');
    }, 2000);
  }

  simulateError(): void {
    this.errorMessage = 'Error: No se pudieron cargar los datos del servidor';
    console.log('❌ Error simulado');
  }

  clearError(): void {
    this.errorMessage = '';
    console.log('✅ Error limpiado');
  }

  // === MÉTODOS PARA @FOR ===
  addProduct(): void {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: `Producto ${this.products.length + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      stock: Math.floor(Math.random() * 20),
      category: Math.random() > 0.5 ? 'Electrónica' : 'Accesorios'
    };
    this.products.push(newProduct);
    console.log('➕ Producto agregado:', newProduct);
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    console.log('➖ Producto eliminado:', productId);
  }

  clearProducts(): void {
    this.products = [];
    console.log('🗑️ Todos los productos eliminados');
  }

  resetProducts(): void {
    this.products = [
      { id: 1, name: 'Laptop HP', price: 899, stock: 5, category: 'Electrónica' },
      { id: 2, name: 'Mouse Logitech', price: 25, stock: 0, category: 'Accesorios' },
      { id: 3, name: 'Teclado Mecánico', price: 120, stock: 8, category: 'Accesorios' },
      { id: 4, name: 'Monitor Dell 27"', price: 350, stock: 3, category: 'Electrónica' }
    ];
    console.log('🔄 Productos restaurados');
  }

  // === MÉTODOS PARA @SWITCH ===
  setOrderStatus(status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'): void {
    this.orderStatus = status;
    console.log('📦 Estado del pedido:', status);
  }

  nextOrderStatus(): void {
    const statusFlow: ('pending' | 'processing' | 'shipped' | 'delivered')[] = 
      ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusFlow.indexOf(this.orderStatus as any);
    
    if (currentIndex < statusFlow.length - 1) {
      this.orderStatus = statusFlow[currentIndex + 1];
      console.log('➡️ Siguiente estado:', this.orderStatus);
    }
  }

  // === MÉTODOS PARA USER ROLE ===
  setUserRole(role: 'admin' | 'editor' | 'viewer' | 'guest'): void {
    this.currentUser.role = role;
    console.log('👤 Rol cambiado a:', role);
  }

  // === HELPERS ===
  trackByProductId(index: number, product: Product): number {
    return product.id; // Retorna el ID único para tracking
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': '#ffc107',
      'processing': '#2196f3',
      'shipped': '#9c27b0',
      'delivered': '#4caf50',
      'cancelled': '#f44336'
    };
    return colors[status] || '#666';
  }

  getRoleIcon(role: string): string {
    const icons: { [key: string]: string } = {
      'admin': '👑',
      'editor': '✏️',
      'viewer': '👀',
      'guest': '🚶'
    };
    return icons[role] || '❓';
  }

  // === @LET CALCULATIONS ===
  calculateFinalPrice(basePrice: number, tax: number, discount: number): number {
    const priceWithTax = basePrice * (1 + tax);
    return priceWithTax * (1 - discount);
  }
}
