import { Component, OnInit } from '@angular/core';

import { TareaServiceService } from '../services/tarea-service.service';
import { Tarea } from '../models/tarea.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  completed: Tarea[];

  constructor(private ts: TareaServiceService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.ts.getCompleted().subscribe((res) => {
      this.completed = res.map((tarea) => {
        return {
          ...tarea.payload.doc.data() as {},
          id: tarea.payload.doc.id
        } as Tarea;
      });
    });
  }

  eliminar(id: string){
    this.ts.borrarTarea('completed',id);
  }

}
