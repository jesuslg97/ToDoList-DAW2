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

  constructor(private as: ActivityServiceService) { }

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

}
