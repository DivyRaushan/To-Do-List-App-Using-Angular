import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  fG!: FormGroup;
  updateIndex!: any
  toDoTaskUpdate:boolean = false;
  inProgressUpdate:boolean = false

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.fG = this.fb.group({
      addedTask: ['', Validators.required]
    })
  }

  title = 'Todo';
  todoTask: Array<any> = []
  progressTask: Array<string> = []
  doneTask: Array<string> = []



  addTask() {
    this.todoTask.push(this.fG.value.addedTask);
    this.fG.reset();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  editTodo(item: string, i: number) {
    this.fG.controls['addedTask'].setValue(item)
    this.toDoTaskUpdate = true
    this.updateIndex = i
  }

  updateTask() {

    if(this.toDoTaskUpdate)
    {
      this.todoTask[this.updateIndex] = this.fG.value.addedTask;
      this.fG.reset();
      this.toDoTaskUpdate = false;
      this.updateIndex = undefined;
    }
    else if(this.inProgressUpdate)
    {
     this.progressTask[this.updateIndex] = this.fG.value.addedTask;
     this.fG.reset();
     this.inProgressUpdate = false;
     this.updateIndex = undefined;
    }
    
  }

  deleteTodo(i: number) {
    this.todoTask.splice(i, 1)
  }

  editProgress(item:any, i: any) {

    this.fG.controls['addedTask'].setValue(item);
    this.inProgressUpdate = true;
    this.updateIndex = i;

  }

  deleteProgress(i: number) {

    this.progressTask.splice(i,1);

  }
}
