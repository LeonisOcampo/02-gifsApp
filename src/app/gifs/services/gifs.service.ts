import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
	providedIn: 'root'
})
export class GifsService {
	private apiKey      :string   = 'FPuJy59AAjgzm2AL57l5ImQUSMDDWuq4';
	private servicioUrl :string   = 'https://api.giphy.com/v1/gifs';
	private _historial  :string[] =[];
	public resultados   :Gif[]    = [];

	get historial() {
		// Rompo la referencia con el _historial y regreso un nuevo arreglo
		return [...this._historial];
	}

	constructor(private http: HttpClient) {
		this._historial = JSON.parse(localStorage.getItem('historial')!)  || [];
		this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

		// Otra manera de hacerlo
		/*if(localStorage.getItem('historial')) {
			this._historial = JSON.parse(localStorage.getItem('historial')!);
		}*/
	}

	buscarGifs( query:string = '' ) {
		query = query.trim().toLocaleLowerCase();

		if(query.length === 0) return;

		if(!this._historial.includes( query )) {
			this._historial.unshift( query );

			this._historial = this._historial.splice(0,10);

			localStorage.setItem('historial', JSON.stringify(this._historial));
		}

		/*
			fetch('https://api.giphy.com/v1/gifs/trending?api_key=FPuJy59AAjgzm2AL57l5ImQUSMDDWuq4&q=dragon ball z&limit=10'
				).then(resp => {
					resp.json().then(data => {
						console.log(data);
					})
				})
			
			Otra manera:

			const resp = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=FPuJy59AAjgzm2AL57l5ImQUSMDDWuq4&q=dragon ball z&limit=10')
			const data = await resp.json();
		*/

		const params = new HttpParams()
			.set('api_key', this.apiKey)
			.set('limit', '10')
			.set('q', query)

		this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
			.subscribe( ( resp ) => {
				this.resultados = resp.data;

				localStorage.setItem('resultados', JSON.stringify(this.resultados));
			}) // El subscribe se va a ejecutar cuando se tenga la resolución del GET
	}
}
