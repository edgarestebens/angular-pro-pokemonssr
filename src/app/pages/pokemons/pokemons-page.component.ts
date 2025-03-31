import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/Pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';

import{toSignal} from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListSkeletonComponent, PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit, OnDestroy{

  pokemonService = inject(PokemonsService);
  public pokemons = signal(<SimplePokemon[]>([]));

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(

    this.route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)), // se esta haciendo la transformacion si viene letra convertirlo en numero el valor de page
      map(page => Math.max(1,page))
    )

  )




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

  ngOnInit(): void {

    this.loadPokemons();

    // setTimeout(() => {
    //   this.isloading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0){

    const pageToLoad = this.currentPage()! + page;

    this.pokemonService
    .loadPage(pageToLoad)
    .pipe(
      tap(() =>
        this.router.navigate([], {queryParams: {page: pageToLoad}})
      ),
      tap(() =>
        this.title.setTitle(`Pokémon SSR - Page ${pageToLoad}`)
      )
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons);
    })

  }

  ngOnDestroy(): void {
    // console.log('destoy');
    // this.$appState.unsubscribe();
  }

}
