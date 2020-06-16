import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationStackService {

  public stack: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['/']);
  constructor(private navCtrl: NavController) { }

  setRoot(url): Promise<boolean> {
    this.stack.next([url]);
    return this.navCtrl.navigateRoot([url]);
  }

  push(url): Promise<boolean> {
    const newStack = this.stack.getValue();
    newStack.push(url);
    this.stack.next(newStack);
    return this.navCtrl.navigateForward([url]);
  }

  pop(): Promise<any> {
    const newStack = this.stack.getValue();
    console.log(newStack);
    if (newStack.length <= 1) {
      /* return this.setRoot('/'); */
      return this.setRoot(newStack[0]);
    }
    newStack.pop();
    this.stack.next(newStack);
    return this.navCtrl.pop();
  }

  getStack(): Observable<string[]> {
    return this.stack.asObservable();
  }
}
