import { Component, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';

}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgbModalModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  newTask: Task = { id: '', title: '', description: '', status: 'todo' };
  // @ViewChild('taskModal') taskModal: any;
  tasks = {
    todo: [] as Task[],
    inProgress: [] as Task[],
    done: [] as Task[]
  };
  modalRef: any;
  taskForm: FormGroup<{ title: FormControl<string | null>; description: FormControl<string | null>; status: FormControl<string | null>; }>;

  constructor(private api:ApiService,private modal:NgbModal){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('todo', Validators.required)
    });
  }
ngOnInit(): void {
  this.loadTasks()
}
async loadTasks() {
  const statuses = ['todo', 'inProgress', 'done'];
  const promises = statuses.map(status => 
    this.api.getTasks(status).toPromise()
  );
  const results = await Promise.all(promises);
  this.tasks.todo = results[0] as Task[];
  this.tasks.inProgress = results[1] as Task[];
  this.tasks.done = results[2] as Task[];
}
async createTask(form: any) {
  console.log(form);
  
  if (form.valid) {
    const task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status
    };

    try {
      const createdTask = await this.api.createTask(task).toPromise();
      
      this.tasks[createdTask.status as keyof typeof this.tasks].push(createdTask);

      this.taskForm.reset();
      this.modalRef.close();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
}
// async createTask(form: any) {
//   console.log(form);
  
//   if (form.valid) {
//     const task = await this.api.createTask({
//       title: this.taskForm.value.title,
//       description: this.taskForm.value.description,
//       status: this.taskForm.value.status
//     }).toPromise();

//     // Add task to the appropriate column
//     switch(this.taskForm.value.status) {
//       case 'todo':
//         this.tasks.todo.push(task);
//         break;
//       case 'inProgress':
//         this.tasks.inProgress.push(task);
//         break;
//       case 'done':
//         this.tasks.done.push(task);
//         break;
//     }

//     this.newTask = { id: '', title: '', description: '', status: 'todo' };
//     form.reset();
//     this.modalRef.close();
//   }
// }

  async deleteTask(task: Task, status: string) {
    await this.api.deleteTask(task.id).toPromise();
    this.tasks[status as keyof typeof this.tasks] = this.tasks[status as keyof typeof this.tasks].filter(t => t.id !== task.id);
  }
  async updateTaskStatus(task: Task, newStatus: string) {
    await this.api.updateTask(task.id, {
      ...task,
      status: newStatus
    }).toPromise();
  }


  drag(event: DragEvent, task: Task) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(task));
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  async drop(event: DragEvent, status: string) {
    event.preventDefault();
    const taskData = event.dataTransfer?.getData('text/plain');
    if (taskData) {
      const task: Task = JSON.parse(taskData);
      
      // Remove from current status
      Object.keys(this.tasks).forEach((key:any) => {
        this.tasks[key as keyof typeof this.tasks] = this.tasks[key as keyof typeof this.tasks].filter((t: { id: string; }) => t.id !== task.id);
      });
      
      // Add to new status
      this.tasks[status as keyof typeof this.tasks].push(task);
      try {
        await this.api.updateTask(task.id, {
          ...task,
          status: status
        }).toPromise();
      } catch (error) {
        console.error('Error updating task status:', error);
        // If update fails, revert the UI changes
        this.tasks[task.status as keyof typeof this.tasks].push(task);
        this.tasks[status as keyof typeof this.tasks] = this.tasks[status as keyof typeof this.tasks].filter(t => t.id !== task.id);
      }          
    }
  }
  openModal(t: any) {
    this.modalRef = this.modal.open(t);
  }

  closeModal() {
    this.modalRef.close();
  }
}
