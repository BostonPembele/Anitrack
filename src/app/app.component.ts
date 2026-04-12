import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, bookmarkOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class AppComponent {
  constructor(private router: Router) {
    addIcons({ homeOutline, bookmarkOutline, personOutline });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}