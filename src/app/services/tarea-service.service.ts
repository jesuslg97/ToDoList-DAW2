import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Tarea } from '../models/tarea.model';


@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {

  constructor(private readonly afs: AngularFirestore) { }

  getAll(){
    return this.afs.collection('todolist').snapshotChanges();
  }

  getCompleted(){
    return this.afs.collection('completed').snapshotChanges();
  }

  addTarea(payload: Tarea){
    return this.afs.collection('todolist').add(payload);
  }

  updateTarea(payload: Tarea){
    return this.afs.doc('todolist/'+ payload['id']).update(payload);
  }

  completarTarea(task: Tarea){
    task.date = Date.now();
    this.afs.collection('completed').add(task);
    this.afs.doc('todolist/' + task.id).delete();
  }

  borrarTarea(lista: string, id: string){
    return this.afs.doc(lista + '/' + id).delete();
  }

  inProcess(id: string, process: boolean){
    if(process){
      return this.afs.doc('todolist/' + id).update({status:1});
    } else {
      return this.afs.doc('todolist/' + id).update({status:0});
    }
  }
}
