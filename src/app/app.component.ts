import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jobis-shop';

  constructor(private userService:UserService, private auth: AuthService, router: Router){

    // to make sure that after logging in upon visiting a guarded link, it takes you back to that 
    // particular page
      auth.user$.subscribe(user => {

       
          if(user){
             // when the user logs in, we save his data in the db and keep updating it
            userService.save(user);
            
            let returnUrl = localStorage.getItem('returnUrl');

            router.navigateByUrl(returnUrl);
          }
        })
  }
}
