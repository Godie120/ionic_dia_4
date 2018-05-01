import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	username: string = '';
	password: string = '';
	constructor(
		public navCtrl: NavController,
		public fireAuth: AngularFireAuth,
		public db: AngularFirestore
	) {}

	loginAppEvent(email: string, password: string): Promise<any> {
		return this.fireAuth.auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {})
			.catch((error) => console.log(error));
	}

	addUserAppEvent(email: string, password: string): Promise<any> {
		return this.fireAuth.auth
			.createUserWithEmailAndPassword(email, password)
			.then((newUser) => {
				this.db.collection('users').doc(newUser.uid).set({ email: email });
			})
			.catch((error) => console.log(error));
	}
}
