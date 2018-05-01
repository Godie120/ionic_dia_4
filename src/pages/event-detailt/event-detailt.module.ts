import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailtPage } from './event-detailt';

@NgModule({
  declarations: [
    EventDetailtPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailtPage),
  ],
})
export class EventDetailtPageModule {}
