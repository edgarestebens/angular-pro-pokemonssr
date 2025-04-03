import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', ()=>{

  let router:Router;
  let location: Location;

  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers:[
        provideRouter(routes)
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  })

  it('should navigate to "about" redirects to "/about"', async() =>{

    await router.navigate(['about']);

    expect(location.path()).toBe('/about');

  });

  it('should navigate to "pokemons/page/1" redirects to "/pokemons/page/1"', async() =>{

    await router.navigate(['pokemons/page/1']);

    expect(location.path()).toBe('/pokemons/page/1');

  });

  it('should route not exist"', async() =>{

    await router.navigate(['unknown-page']);

    expect(location.path()).toBe('/about');

  });

  it('should load the proper component"', async() =>{

    //si la ruta no existe terminar proceso
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();
    //si existe
    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

   //si la ruta no existe terminar proceso
   const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!;
   expect(pokemonPageRoute).toBeDefined();
   //si existe
   const pokemonPage = (await pokemonPageRoute.loadComponent!()) as any;
   expect(pokemonPage.default.name).toBe('PokemonsPageComponent');



  });

})
