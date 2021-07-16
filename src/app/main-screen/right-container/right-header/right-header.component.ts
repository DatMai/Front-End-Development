import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html',
  styleUrls: ['./right-header.component.css']
})
export class RightHeaderComponent implements OnInit {
  @Input() selectedUser:UserModel ={};
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    // this.dataService.selectedUser$.subscribe(value=>
    //   {
    //   this.selectedUser=value;
    //   }
    // );
  }

}
