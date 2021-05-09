import { Component, OnInit } from '@angular/core';

import { TareaServiceService } from '../services/tarea-service.service';
import { Activity } from '../models/activity.model';

import { MatDialog } from '@angular/material/dialog';
import { FormEditDialogComponent } from '../form-edit-dialog/form-edit-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  activities: Activity[];
  order: number;
  filter: number;

  constructor(private ts: TareaServiceService, public md: MatDialog) {
    this.activities = [];
    this.order = 3;
    this.filter = 0;
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.ts.getAll().subscribe((res) => {
      this.activities = res.map((activity) => {
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
      this.activities.sort((a,b) =>
        a.title.localeCompare(b.title)
      );
    }else if(compare === 1){
      this.order = 1;
      this.activities.sort((a,b) =>
        (a.date > b.date) ? 1 : -1
      );
    } else {
      this.order = 2;
      this.activities.sort((a,b) =>
        -(a.priority - b.priority)
      );
    }
  }

  activityFilter(filtro: number){
    this.filter = filtro;
  }

  deleteActivity(id: string){
    this.ts.borrarTarea('todoList',id);
  }

  complete(task: Activity){
    this.ts.completarTarea(task);
  }

  process(activity: Activity){
    if(activity.status === 0){
      this.ts.inProcess(activity.id,true);
    } else {
      this.ts.inProcess(activity.id,false);
    }
  }

  openEditDialog(activity: any){
    const activityUp = {
      title: activity.title,
      description: activity.description,
      priority: activity.priority,
      status: activity.status,
      id: activity.id,
      date: activity.date
    }
    const dialogRef = this.md.open(FormEditDialogComponent, {
      data: activityUp,
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if(!res){
        console.log(res);
      } else {
        this.ts.updateTarea(res);
      }
    });
  }

}
