import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  constructor(private readonly firebase: AngularFirestore) { }

  getAll(){
    return this.firebase.collection('todolist').snapshotChanges();
  }

  getCompleted(){
    return this.firebase.collection('completed').snapshotChanges();
  }

  addActivity(payload: Activity){
    return this.firebase.collection('todolist').add(payload);
  }

  updateActivity(payload: Activity){
    return this.firebase.doc('todolist/' + payload['id']).update(payload);
  }

  completeActivity(task: Activity){
    task.date = Date.now();
    this.firebase.collection('completed').add(task);
    this.firebase.doc('todolist/' + task.id).delete();
  }

  deleteActivity(lista: string, id: string){
    return this.firebase.doc(lista + '/' + id).delete();
  }

  inProcess(id: string, process: boolean){
    if (process){
      return this.firebase.doc('todolist/' + id).update({status: 1});
    } else {
      return this.firebase.doc('todolist/' + id).update({status: 0});
    }
  }
}
