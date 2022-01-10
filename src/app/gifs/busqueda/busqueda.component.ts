import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styles: [
	]
})
export class BusquedaComponent {
	// Con ViewChild se va a buscar un elemento que tenga referencia el txtBuscar
	// Es asi igual que utilizar querySelector
	// con ! se asegura de que el objeto no es nulo
	@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

	constructor( private gifsService: GifsService ) {}

	buscar() {
		const valor = this.txtBuscar.nativeElement.value;
		
		this.gifsService.buscarGifs(valor);

		this.txtBuscar.nativeElement.value = '';
	}
}
