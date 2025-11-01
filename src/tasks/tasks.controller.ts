import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTO/create_task.dto';
import { getTasksFilterDto } from './DTO/get_tasks_filter.dto';
import { UpdateTaskStatusDto } from './DTO/update_tasks_status.dto';
import { Task } from './task.entity';
// import type { TaskStatus } from './tasks-status.enum.'; //Task
// import { pipe } from 'rxjs';
// import { get } from 'http';
/* eslint-disable */

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksService.createTask(createTaskDto);
    return task;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
   updateTaskStatus(
   @Param('id') id: string,
  @Body() updateTaskStatusDto: UpdateTaskStatusDto,
   ) : Promise<Task> {
  const { status } = updateTaskStatusDto; //or updateTaskStatusDto.status in the param below
  return this.tasksService.updateTaskStatus(id, status);
}

@Get()
getTasks(@Query()filterDto : getTasksFilterDto): Promise<Task[]>{
return this.tasksService.getTasks(filterDto);
}
}

// @Get()
// getTasks(@Query() filterDto: getTasksFilterDto): Task[] {
//   if (Object.keys(filterDto).length) {
//     return this.tasksService.getTasksWithFilters(filterDto);
//   } else {
//     return this.tasksService.getAllTasks();
//   }
// }
// @Get('/:id')
// getTaskById(@Param('id') id: string): Task {
//   return this.tasksService.getTaskById(id);
// }

// @Post()
// createTask(@Body() createTaskDto: CreateTaskDto): Task {
//   return this.tasksService.createTask(createTaskDto);
// }

// @Delete('/:id')
// deleteTask(@Param('id') id: string) {
//   this.tasksService.deleteTask(id);
// }

// @Patch('/:id/status')
// updateTaskStatus(
//   @Param('id') id: string,
//   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
// ) {
//   const { status } = updateTaskStatusDto; //or updateTaskStatusDto.status in the param below
//   return this.tasksService.updateTaskStatus(id, status);
// }
