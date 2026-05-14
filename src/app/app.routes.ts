import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { 
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.routes').then(m => m.CURSOS_ROUTES),
        canActivate: [authGuard]
    },    
    { 
    path: 'demo',
    loadComponent: () => import('./demo/demo-wrapper').then(m => m.DemoWrapperComponent)
    },
    { 
    path: 'demo2',
    loadComponent: () => import('./demo/demo2-wrapper').then(m => m.Demo2WrapperComponent)
    },
    { 
    path: 'examples/control-flow',
    loadComponent: () => import('./examples/control-flow-example/control-flow-example').then(m => m.ControlFlowExampleComponent)
    },
    { 
    path: 'examples/lifecycle',
    loadComponent: () => import('./examples/lifecycle-example/lifecycle-example').then(m => m.LifecycleExampleComponent)
    },
    { 
    path: 'examples/forms',
    loadComponent: () => import('./examples/forms-example/forms-example').then(m => m.FormsExampleComponent)
    },
    { path: '**', redirectTo: '' }
];
