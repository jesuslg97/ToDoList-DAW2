import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Activity } from './activity/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  constructor(private readonly firebase: AngularFirestore) {

    getAll(){
      return this.firebase.collection('todolist-daw2').snapshotChanges();
    }

    getComplete(){
      return this.firebase.collection('complete').snapshotChanges();
    }

    addActivity(payload: Activity){
      return this.firebase.collection('todoList-DAW2').add(payload);
    }

    updateActivity(payload: Activity){
      return this.firebase.doc('todoList-DAW2/'+ payload['id']).update(payload);
    }

    completarActivity(task: Activity){
      task.date = Date.now();
      this.firebase.collection('complete').add(task);
      this.firebase.doc('todoList-DAW2/' + task.id).delete();
    }

    deleteActivity(lista: string, id: string){
      return this.firebase.doc(lista + '/' + id).delete();
    }

    inProcess(id: string, process: boolean){
      if(process){
        return this.firebase.doc('todoList-DAW2-daw2/' + id).update({status:1});
      } else {
        return this.firebase.doc('todoList-DAW2/' + id).update({status:0});
      }
    }
  }
}
