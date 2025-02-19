import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import {
  User,
  CreateUserDto,
  UpdateUserDto,
  Users,
  PaginationDto,
} from '@app/common';
import { Observable, Subject } from 'rxjs';
import { PrismaService } from '../prisma.service';



@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const usersCount = await this.prisma.user.count();
    if (usersCount === 0) {
      for (let i = 0; i <= 100; i++) {
        await this.create({
          username: `user${i}`,
          password: `pass${i}`,
          age: 0,
        });
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User not found by id ${id}.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto
      }
    });
    return user;
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user;
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = async (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      const users = await this.prisma.user.findMany({
        skip: start,
        take: paginationDto.skip,
      });
      subject.next({ users });
    };

    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
