import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './DTO/create_task.dto';
import { filter } from 'rxjs';
import { getTasksFilterDto } from './DTO/get_tasks_filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  hi() {
    console.log('Hello from TasksService');
  }
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (filterDto.status) {
      //or status
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search))
          return true;
        return false;
      });
    }

    return tasks;
  }

  createTask(create_task: CreateTaskDto): Task {
    const { title, description } = create_task;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)!;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
