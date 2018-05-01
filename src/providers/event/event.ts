import { Event } from './../../app/interface/event.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
	constructor(public http: HttpClient, private db: AngularFirestore) {}

	/**
	 * Función para cargar todos los eventos en la BD.
	 */
	getEventList(): Observable<Event[]> {
		return this.db.collection<Event>('events').valueChanges();
	}

	/**
	 * Función para insertar un nuevo ToDo a la BD.
	 * @param event objeto de tipo Event[], que contiene el nuevo evento
	 */
	addEvent(event: Event): Promise<any> {
		const id = this.db.createId();
		return this.db.collection('events').doc(id).set({
			id,
			type: event.type,
			name: event.name,
			date: event.date,
			detailt: event.detailt
		});
	}
}
