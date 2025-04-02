import { ChangeDetectionStrategy, Component, effect, inject,signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/Pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import{toSignal} from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListSkeletonComponent, PokemonListComponent,RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent{

  pokemonService = inject(PokemonsService);
  public pokemons = signal(<SimplePokemon[]>([]));

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  //forma de coger valores en la url sin necesidad del oninit
  public currentPage = toSignal<number>(
     this.route.params.pipe(
      map(params => params['page']?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)), // se esta haciendo la transformacion si viene letra convertirlo en numero el valor de page
      map(page => Math.max(1,page))
    )
  );

  public loadOnPageChanged = effect(() =>{
    this.loadPokemons(this.currentPage());
  });


  //Declara una variable reactiva isloading con un valor inicial de true.
  // public isloading = signal(true);

  //Usa inject(ApplicationRef) para obtener una referencia a ApplicationRef, que es un servicio de Angular
  // que permite interactuar con el ciclo de vida de la aplicación.
  // private appRef = inject(ApplicationRef);

  //Se suscribe al observable isStable de ApplicationRef, el cual emite true cuando la aplicación está completamente estable
  // (sin tareas pendientes de cambio de detección o eventos asíncronos pendientes).
  //Cada vez que el estado cambia, imprime { isStable: valor } en la consola.
  // private $appState = this.appRef.isStable.subscribe((isStable) =>{
  //   console.log({isStable})
  // });


  public loadPokemons(page = 0){

    this.pokemonService
    .loadPage(page)
    .pipe(
      tap(() =>
        this.title.setTitle(`Pokémon SSR - Page ${page}`)
      )
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons);
    })
  }
}
