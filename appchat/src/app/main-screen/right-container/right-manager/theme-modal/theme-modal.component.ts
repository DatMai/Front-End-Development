import { Component, OnInit } from '@angular/core';
import { ThemeModel } from 'src/app/model/ThemeModel';
import { DataService } from 'src/app/service/data.service';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.css']
})
export class ThemeModalComponent implements OnInit {

  constructor(private themeService:ThemeService) { }

  ngOnInit(): void {
  }
  public getListTheme(){
    return this.themeService.listTheme;
  }
  public setTheme(theme:ThemeModel) {
    this.themeService.setTheme(theme);
  }
}
