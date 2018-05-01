import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Guest } from '../../app/interface/guest.interface';

@Injectable()
export class GuestProvider {
	constructor(
		public http: HttpClient,
		private db: AngularFirestore,
		private storage: AngularFireStorage
	) {}

	/**
   * Método empleado para obtener los invitados de un evento.
   * @param eventId Id del evento al que se le obtendrán los invitados.
   */
	getGuests(eventId): Observable<Guest[]> {
		return this.db
			.collection<Event>('events')
			.doc(eventId)
			.collection<Guest>('guests')
			.valueChanges();
	}

	/**
   * Método empleado para subir una imagen al storage y posteriormente almacenar un invitado.
   * @param eventId Id del evento al que se agregará el invitado.
   * @param guest Datos del invitado a almacenar.
   */
	addGuest(eventId: string, guestPhoto: string, guestName: string): Promise<any> {
		return this.storage
			.ref(`events/${eventId}/guests/${guestName}`)
			.putString(guestPhoto, 'base64', { contentType: 'image/png' })
			.then(
				(data) => {
					// Se obtiene la URL de la imagen subida.
					const linkPhoto = data.metadata.downloadURLs[0];
					// Se realiza el llamado al método que registra el invitado en el evento.
					return this.addGuestEvent(eventId, guestName, linkPhoto);
				},
				(err) => {
					console.log(err);
				}
			);
	}

	/**
   * Método empleado para agregar un invitado a un evento.
   * @param eventId Id del evento al que se le agregará el invitado.
   * @param guest Datos del invitado a almacenar.
   * @param linkPhoto URL de la imagen del invitado.
   */
	addGuestEvent(eventId: string, guestName: string, linkPhoto: string): Promise<any> {
		const id = this.db.createId();
		return this.db.collection('events').doc(eventId).collection('guests').doc(id).set({
			id,
			name: guestName,
			linkPhoto: linkPhoto
		});
	}
}
