import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Importar Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventProvider } from '../providers/event/event';
import { credentials } from './credentials';
import { HttpClientModule } from '@angular/common/http';
import { GuestProvider } from '../providers/guest/guest';
import { Camera } from '@ionic-native/camera';

@NgModule({
	declarations: [ MyApp, HomePage ],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(credentials.firebase41),
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireStorageModule
	],
	bootstrap: [ IonicApp ],
	entryComponents: [ MyApp, HomePage ],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		EventProvider,
		GuestProvider
	]
})
export class AppModule {}
