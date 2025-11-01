import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { authCredentialDto } from './DTO/auth-credential.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: authCredentialDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({ username, password: hashedPassword });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      //console.log(error.code); to check error code
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async signIn(authCredentialsDto: authCredentialDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'sign in successful';
    } else {
      throw new UnauthorizedException('Invalid credentials');
    } 
  }



}
