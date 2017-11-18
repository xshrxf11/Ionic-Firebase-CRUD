import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddMoviePage } from '../add-movie/add-movie';
import { AngularFireDatabase} from 'angularfire2/database-deprecated';
import { FirebaseListObservable} from 'angularfire2/database-deprecated';
import { Movies } from '../../models/add-movie/add-movie.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  moviesRef : FirebaseListObservable<Movies[]>
  constructor(public navCtrl: NavController, private database: AngularFireDatabase, public alertCtrl:AlertController) {
      this.moviesRef = this.database.list('list-movies');
    }

  
  addMovie(){
    this.navCtrl.push('AddMoviePage');
  }

  deleteMovie(key):void {
    let prompt=this.alertCtrl.create({
      title: 'Delete this movie?',
      buttons:[{
        text:"NO",
        handler:data => {
          console.log("cancel clicked");
        }
      },{
        text:"YES",
        handler:data => {
          this.moviesRef.remove(key);
        }
      }
      ]
    });
    prompt.present();
  }

  updateMovie(movie):void {
    let prompt=this.alertCtrl.create({
      title: 'Edit Movie',
      inputs:[
      {
        name : 'movieTitle',
        placeholder:movie.movieTitle
      },
      {
        name : 'moviePrice',
        placeholder:movie.moviePrice
      }
      ],
      buttons:[
      {
        text:"Cancel",
        handler:data => {
          console.log("cancel clicked");
        }
      },
      {
      text: "Submit",
      handler: data =>{
        let newMovieTitle: String = movie.movieTitle;
        let newMoviePrice: String = movie.moviePrice;
        if(data.movieTitle != ''){
          newMovieTitle = data.movieTitle;
        }
        if(data.moviePrice != ''){
          newMoviePrice = data.moviePrice;
        }
        this.moviesRef.update(movie.$key,{
          movieTitle: newMovieTitle,
          moviePrice : newMoviePrice,
        })
      }
      }]

    });
    prompt.present();
  }
}
