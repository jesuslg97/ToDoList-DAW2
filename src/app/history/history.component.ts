import { Component, OnInit } from '@angular/core';

import { TareaServiceService } from '../services/tarea-service.service';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  completed: Activity[];

  constructor(private ts: TareaServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.ts.getCompleted().subscribe((res) => {
      this.completed = res.map((activity) => {
        return {
          ...activity.payload.doc.data() as {},
          id: activity.payload.doc.id
        } as Activity;
      });
    });
  }

  eliminar(id: string){
    this.ts.borrarTarea('completed',id);
  }

}
