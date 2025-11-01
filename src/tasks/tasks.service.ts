import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum.'; //Task
import { CreateTaskDto } from './DTO/create_task.dto';
import { filter } from 'rxjs';
import { getTasksFilterDto } from './DTO/get_tasks_filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    this.taskRepository.save(task);
    return task;
  }

  async getTasks(filterDto: getTasksFilterDto): Promise<Task[]> {
    const query = await this.taskRepository.createQueryBuilder('task');
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
}

//import { TasksRepository } from './task.repository';
// private tasks: Task[] = [];

// getAllTasks(): Task[] {
//   return this.tasks;
// }

// getTaskById(id: string): Task {
//   const found = this.tasks.find((task) => task.id === id)!;
//   if (!found) {
//     throw new NotFoundException(`Task with ID "${id}" not found`);
//   }
//   return found;
// }

// getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
//   const { status, search } = filterDto;
//   let tasks = this.getAllTasks();

//   if (filterDto.status) {//(status)
//     tasks = tasks.filter((task) => task.status === status);

//   }

//   if (search) {
//     tasks = tasks.filter((task) => {
//       if (task.title.includes(search) || task.description.includes(search))
//         return true;
//       return false;
//     });
//   }
//   return tasks;
// }

// createTask(create_task: CreateTaskDto): Task {
//   const { title, description } = create_task;

//   const task: Task = {
//     id: uuid(),
//     title,
//     description,
//     status: TaskStatus.OPEN,
//   };
//   this.tasks.push(task);
//   return task;
// }

// deleteTask(id: string) {
//   const task: Task = this.getTaskById(id);

//   this.tasks = this.tasks.filter((task) => task.id !== id);
// }

// updateTaskStatus(id: string, status: TaskStatus): Task {
//   const task: Task = this.getTaskById(id);
//   task.status = status;
//   return task;
// }
