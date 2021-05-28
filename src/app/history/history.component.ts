import { Component, OnInit } from '@angular/core';

import { ActivityServiceService } from '../services/activity-service.service';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  completed: Activity[];
  order: number;

  constructor(private as: ActivityServiceService) {
    this.completed = [];
    this.order = 2;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.as.getCompleted().subscribe((res) => {
      this.completed = res.map((activity) => {
        return {
          ...activity.payload.doc.data() as {},
          id: activity.payload.doc.id
        } as Activity;
      });
    });
  }

  delete(id: string){
    this.as.deleteActivity('completed', id);
  }

  activityOrder(compare: number){
    if (compare === 0){
      this.order = 0;
      this.completed.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }else if (compare === 1){
      this.order = 1;
      this.completed.sort((a, b) =>
        (a.date > b.date) ? 1 : -1
      );
    }
  }

}
