import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { TaskStatus } from './tasks-status.enum.';
import { CreateTaskDto } from './DTO/create_task.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Entity()
 export class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;

}










//   constructor(
//       @InjectRepository(Task)
//       private taskRepository: Repository<Task>,
//     ) {}
//   async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
//       const { title, description } = createTaskDto;
  
//       const task = this.taskRepository.create({
//         title,
//         description,
//         status: TaskStatus.OPEN,
//       });
  
//       await this.taskRepository.save(task);
//       return task;
// }