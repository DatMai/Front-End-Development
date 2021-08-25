import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import listTheme from '../data/theme.json';
import { ThemeModel } from '../model/ThemeModel';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  listTheme:ThemeModel[]=listTheme;
  private colorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  color$: Observable<string> = this.colorSubject.asObservable();
  private backgroundSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  background$: Observable<string> = this.backgroundSubject.asObservable();
  isTheme: boolean = false;

  constructor() { }
  setColor(text: string) {
    this.colorSubject.next(text);
  }
  setBackground(text: string) {
    this.backgroundSubject.next(text);
  }
}
