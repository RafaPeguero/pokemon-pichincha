import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  public allPokemons: IPokemon[] = [];
  public pokemon!: IPokemon;
  public showPokemonForm!: boolean;

  constructor(private fb: FormBuilder, private _pokemonService: PokemonService) {}

  public searchForm = this.fb.group({
    searchText: ['']
  });
  
  ngAfterViewInit(): void {
    this.searchPokemon();
  }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  childFinishedTask(MakedRequest: boolean) {
    if(MakedRequest) {
      this.showPokemonForm = false;
      this.getAllPokemons();
    } else {
      this.showPokemonForm = false;
    }
  }

  getAllPokemons() {
    this._pokemonService.getAllPokemons().subscribe({
      next: (resp) => {
        this.allPokemons = resp as IPokemon[];
      }
    });
  }

  getPokemon(pokemonId: number) {
    this._pokemonService.getPokemon(pokemonId).subscribe({
      next: (resp) => {
        this.pokemon = resp as IPokemon;
        this.showPokemonForm = true;
      }
    })
  };

  deletePokemon(pokemonId: number) {
    this._pokemonService.deletePokemon(pokemonId).subscribe({
      next: () => {
        this.getAllPokemons();
      }
    })
  };

  searchPokemon() {
    this.searchForm.controls['searchText'].valueChanges.
    pipe(debounceTime(800))
    .subscribe( (text: string) => {
      if(text) {
        let pokemonsFiltered = this.allPokemons.filter(p => p.name === text);
        this.allPokemons = pokemonsFiltered;
      } else {
        this.getAllPokemons();
      }
    });
  };

}
