import { Component, OnInit } from '@angular/core';

import { Activity } from 'src/app/activity/activity.model';
import { ActivityServiceService } from 'src/app/activity-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  activity: Activity[];
  order: number;
  filter: number;

  constructor(private ActivityService: ActivityServiceService) {
    this.activity = [];
    this.order = 3;
    this.filter = 0;
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.ActivityService.getAll().subscribe((res) => {
      this.activity = res.map((activity) => {
        return {
          ...activity.payload.doc.data() as {},
          id: activity.payload.doc.id
        } as Activity;
      });
    });
  }

  activityOrder(compare: number){
    if(compare === 0){
      this.order = 0;
      this.activity.sort((a,b) =>
        a.title.localeCompare(b.title)
      );
    }else if(compare === 1){
      this.order = 1;
      this.activity.sort((a,b) =>
        (a.date > b.date) ? 1 : -1
      );
    } else {
      this.order = 2;
      this.activity.sort((a,b) =>
        -(a.priority - b.priority)
      );
    }
  }

  activityFilter(filtro: number){
    this.filter = filtro;
  }

  deleteActivity(id: string){
    this.ActivityService.deleteActivity('todoList',id);
  }

  complete(task: Activity){
    this.ActivityService.completarActivity(task);
  }

  process(activity: Activity){
    if(activity.status === 0){
      this.ActivityService.inProcess(activity.id,true);
    } else {
      this.ActivityService.inProcess(activity.id,false);
    }
  }

}
