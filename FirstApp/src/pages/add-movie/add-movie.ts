import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movies } from '../../models/add-movie/add-movie.interface';
import { AngularFireDatabase} from 'angularfire2/database-deprecated';
import { FirebaseListObservable} from 'angularfire2/database-deprecated';

/**
 * Generated class for the AddMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-movie',
  templateUrl: 'add-movie.html',
})
export class AddMoviePage {

  movies = {} as Movies;
  moviesRef : FirebaseListObservable<Movies[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.moviesRef = this.database.list('list-movies');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMoviePage');
  }

  AddMovie(movies: Movies){
    this.moviesRef.push({
      movieTitle : this.movies.movieTitle,
      moviePrice : this.movies.moviePrice
    })

    movies  = {} as Movies;
    this.navCtrl.pop();

  }

}
