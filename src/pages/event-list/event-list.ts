import { Event } from './../../app/interface/event.interface';
import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-event-list',
	templateUrl: 'event-list.html'
})
export class EventListPage {
	// Lista de todos los ToDos
	events$: Event[];
	eventPhoto: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public providerEvent: EventProvider,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController
	) {
		this.getEventList();
	}

	/**
   * Función que muestra todos los eventos.
   */
	getEventList() {
		this.providerEvent.getEventList().subscribe((content) => {
			this.events$ = content;
		});
	}

	/**
   * Función que muestra el formulario para crear un nuevo evento.
   */
	showAddEvent() {
		let prompt = this.alertCtrl.create({
			title: 'Agregar Nuevo Evento',
			message: 'Llene los datos para agregar un nuevo evento!',
			inputs: [
				{
					name: 'type',
					placeholder: 'Elija un tipo'
				},
				{
					name: 'name',
					placeholder: 'Nombre del Evento'
				},
				{
					name: 'date',
					placeholder: 'Fecha del evento (dd-mm-aaaa)'
				},
				{
					name: 'detailt',
					placeholder: 'Descripción del evento'
				}
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: (data) => {
						console.log('Cancelar');
					}
				},
				{
					text: 'Guardar',
					handler: (data) => {
						console.log(data);
						this.providerEvent.addEvent(data);
					}
				}
			]
		});
		prompt.present();
	}

	/**
   * Función que me muestra la página del detalle del evento.
   */
	showEventDetailt(event): void {
		let modal = this.modalCtrl.create('EventDetailtPage', { currentEvent: event });
		modal.present();
	}
}
