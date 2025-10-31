import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum.';
import { UpdateTaskStatusDto } from './update_tasks_status.dto';

export class getTasksFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}
