import { GuestProvider } from './../../providers/guest/guest';
import { Guest } from './../../app/interface/guest.interface';
import { Event } from './../../app/interface/event.interface';
import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ViewController,
	AlertController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
	selector: 'page-event-detailt',
	templateUrl: 'event-detailt.html'
})
export class EventDetailtPage {
	eventSelected: Event;
	guestsList$: Guest;
	guests: Guest;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public alertCtrl: AlertController,
		public cameraPlugin: Camera,
		public providerGuest: GuestProvider
	) {
		this.eventSelected = navParams.get('currentEvent');
		this.providerGuest.getGuests(this.eventSelected.id);
	}

	dismissModal() {
		this.viewCtrl.dismiss();
	}

	/**
     * Función que muestra el formulario para crear un nuevo invitado.
     */
	showAddGuests() {
		let prompt = this.alertCtrl.create({
			title: 'Agregar Nuevo Invitado',
			message: 'Llene los datos para agregar un nuevo invitado!',
			inputs: [
				{
					name: 'name',
					placeholder: 'Nombre del invitado'
				}
			],
			buttons: [
				{
					text: 'Tomar Foto',
					handler: (data) => {
						console.log('Tomar Foto');
						this.takePicture();
					}
				},
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
						this.addGuest(data);
					}
				}
			]
		});
		prompt.present();
	}

	options: CameraOptions = {
		quality: 100,
		destinationType: this.cameraPlugin.DestinationType.DATA_URL,
		encodingType: this.cameraPlugin.EncodingType.JPEG,
		mediaType: this.cameraPlugin.MediaType.PICTURE,
		saveToPhotoAlbum: false
	};

	photoGuets: string = '';

	/**
	 * Función que llama a la camara
	 */
	takePicture(): void {
		this.cameraPlugin.getPicture(this.options).then(
			(imageData) => {
				// Se asigna la fotografía tomada al objeto que se almacenará.
				this.guests.photo = imageData;
				// Se asigna la fotografía tomada a la imagen mostrada.
				this.photoGuets = 'data:image/jpeg;base64,' + imageData;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	/**
   * Función que permite agregar un invitado a un evento.
   */
	addGuest(data): void {
		// Se realiza el llamado al método del provider envando los parámetros necesarios.
		this.providerGuest.addGuest(this.eventSelected.id, this.guests.photo, data.name).then(
			(success) => {},
			(err) => {
				console.log(err);
			}
		);
	}
}
