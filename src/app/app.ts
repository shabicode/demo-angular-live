import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <a routerLink="/" style="color: white; font-weight: 600; font-size: 1.1rem; text-decoration: none; margin-right: auto;">🏠 Angular Demo</a>
        <a routerLink="/login" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(255,255,255,0.1); transition: background 0.3s;" 
           onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.1)'">🔐 Login</a>
        <a routerLink="/cursos" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(255,255,255,0.1); transition: background 0.3s;"
           onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.1)'">📚 Cursos</a>
        <a routerLink="/demo" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(255,255,255,0.1); transition: background 0.3s;"
           onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.1)'">🎨 Demo</a>
        
        <div style="width: 2px; height: 24px; background: rgba(255,255,255,0.3); margin: 0 0.5rem;"></div>
        <span style="color: rgba(255,255,255,0.9); font-weight: 600; font-size: 0.9rem;">📖 Ejemplos:</span>
        
        <a routerLink="/examples/control-flow" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(76,175,80,0.3); transition: background 0.3s;"
           onmouseover="this.style.background='rgba(76,175,80,0.5)'" 
           onmouseout="this.style.background='rgba(76,175,80,0.3)'">🎯 Control Flow</a>
        <a routerLink="/examples/lifecycle" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(156,39,176,0.3); transition: background 0.3s;"
           onmouseover="this.style.background='rgba(156,39,176,0.5)'" 
           onmouseout="this.style.background='rgba(156,39,176,0.3)'">⏰ Lifecycle</a>
        <a routerLink="/examples/forms" style="color: white; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 4px; background: rgba(33,150,243,0.3); transition: background 0.3s;"
           onmouseover="this.style.background='rgba(33,150,243,0.5)'" 
           onmouseout="this.style.background='rgba(33,150,243,0.3)'">📝 Forms</a>
      </div>
    </nav>
    
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo-angular-live');
}
