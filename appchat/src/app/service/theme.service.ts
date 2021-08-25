import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import listTheme from '../data/theme.json';
import { ThemeModel } from '../model/ThemeModel';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  listTheme: ThemeModel[] = listTheme;
  constructor(
    private dataService: DataService,

  ) {}
  ngOnInit(): void {}
  public setTheme(theme:ThemeModel){
    this.dataService.selectedChatContent.theme=theme;
  }
}
