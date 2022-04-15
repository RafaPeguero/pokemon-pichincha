import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITypes } from 'src/app/models/pokemon-types.model';
import { IPokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements  OnChanges {

  @Input() pokemon: IPokemon;
  @Output() finishedTask = new EventEmitter<boolean>();
  

  public title: string = '';
  public validPokemonTypes: ITypes[] = [
    {name: 'fuego', value: 'fire'},
    {name: 'agua', value: 'water'},
    {name: 'normal', value: 'normal'},
    {name: 'insecto', value: 'bug'},
    {name: 'venenoso', value: 'poison'},
  ];
  constructor(private fb: FormBuilder, private _pokemonsService: PokemonService) {
    this.pokemon = {
      id: 0,
      name: '',
      image: '',
      attack: 0,
      defense: 0,
      type:'',
      hp:0,
      idAuthor:0
    };
    this.title ='Nuevo Pokemon';
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkInputPokemonChanges(changes);
  }

  public pokemonForm = this.fb.group({
    id: [0],
    name: [null, Validators.required],
    image: [null],
    attack: [20, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
    defense: [20, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
    hp: [20, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
    type : ['fire', Validators.required],
    idAuthor: [1]
  });

   checkInputPokemonChanges(changes: SimpleChanges) {
    let currentPokemon  = this.pokemon = changes['pokemon'].currentValue;
    if(currentPokemon) {
      this.setPokemonData(currentPokemon as IPokemon);
      this.title = 'Editar un pokemon'
    }
  }
  setPokemonData(pokemon: IPokemon) {

    Object.keys(this.pokemonForm.controls).map( key => {
      this.pokemonForm.controls[key].setValue(pokemon[key as keyof IPokemon]);
    });
  }

  addPokemon(pokemon: IPokemon) {
    this._pokemonsService.addPokemon(pokemon).subscribe({
      next: () => {
        this.finishedTask.emit(true);
      }
    });
  }

  updatePokemon(pokemon: IPokemon) {
    this._pokemonsService.updatePokemon(pokemon).subscribe({
      next: () => {
        this.finishedTask.emit(true);
      }
    });
  }

  addorEditPokemon() {
    const params: any = {};

    Object.keys(this.pokemonForm.controls).map( key => {
      params[key] = this.pokemonForm.get(`${key}`)?.value;
    })

    if(this.pokemonForm.invalid) {
      this.pokemonForm.controls['name'].markAsTouched();
      return;
    }

    if(params.id > 0) {
      this.updatePokemon(params);
    } else {
      this.addPokemon(params);
    }
  }
}
