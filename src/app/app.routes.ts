import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    //path: 'pokemons',
    path: 'pokemons/page/:page', //se cambia la ruta para poder hacer lo de SSG + Hiybrid
    loadComponent: () => import('./pages/pokemons/pokemons-page.component')
  },

  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component')
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component')
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component')
  },

  {
    path: '**',
    redirectTo: ()=>{

      //desde aqui se puede injectar un servicio
      //const authService = inject(AuthService)

      return 'about';
    }
  }

];
