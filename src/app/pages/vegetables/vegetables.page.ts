import { Component, OnInit } from '@angular/core';
import { VegetablesService } from '../../services/vegetables/vegetables.service';


@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.page.html',
  styleUrls: ['./vegetables.page.scss'],
})
export class VegetablesPage implements OnInit {
  public list: Array<any>;
  constructor(private vegetablesService: VegetablesService) { }

  ngOnInit() {
    this.vegetablesService
      .getList()
      .get()
      .then( snapshot => {
        this.list = [];
        snapshot.forEach( snap => {
          const data = snap.data();
          this.list.push(data);
        });
        console.log(this.list);
      });
  }
}
