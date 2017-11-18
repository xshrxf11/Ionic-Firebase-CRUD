import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieDescPage } from './movie-desc';

@NgModule({
  declarations: [
    MovieDescPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieDescPage),
  ],
})
export class MovieDescPageModule {}
