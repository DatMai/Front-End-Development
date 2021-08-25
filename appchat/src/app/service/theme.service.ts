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
  public setTheme(theme:ThemeModel){
    this.colorSubject.next(theme.data?.color||"");
    this.backgroundSubject.next(theme.data?.color||"");
    this.isTheme=true;
  }

}
