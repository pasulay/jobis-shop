import { Injectable,NgZone } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { ActivatedRoute, Router } from "@angular/router";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // to use an async pipe, we use an observable
  // by convension, we add a $ sign to our observable
  user$:Observable<User>;
  constructor(private afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone,
    private route: ActivatedRoute, private userService:UserService) { 

    this.user$= this.afAuth.authState;
  }

  login() {
    // return the queried url, otherwise go back to the home page
    let returnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    // we store in local storage
    localStorage.setItem('returnUrl', returnUrl);

    return this.OAuthProvider(new auth.GoogleAuthProvider())
        .then((_res: any) => {
            console.log('Successfully logged in!')
        }).catch((error: any) => {
            console.log(error)
        });
}

OAuthProvider(provider:any) {
  return this.afAuth.signInWithRedirect(provider);
      // .then((res: any) => {

      //   // this.user$.subscribe(user => {
      //   //   if(user){
      //   //     let returnUrl = localStorage.getItem('returnUrl');

      //   //     this.router.navigateByUrl(returnUrl);
      //   //   }
      //   // })


      //     // this.ngZone.run(() => {
      //     //     this.router.navigate(['home']);
      //     // })
      // })
      
      // .catch((error: any) => {
      //     window.alert(error)
      // })
}


  logout(){
    this.afAuth.signOut();
    this.router.navigate['/'];
  }


  // an observable that returns our appUser object
  // having issues with the logout
  get appUser$(): Observable<AppUser>{

    return this.user$
    .pipe(switchMap(user=> {
        if(user) return this.userService.get(user.uid).valueChanges()

          // return Observable.of(null);
        }));
   
  
  }

  // get appUser$(): Observable<AppUser> {
  //   return this.user$.pipe(
  //     switchMap(user => user
  //       ? this.userService.get<AppUser>(user.uid).valueChanges() : of(null)
  //     )
  //   );
  // }


}
