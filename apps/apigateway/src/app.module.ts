import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CaseModule } from './case/case.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CASES_SERVICE } from './case/constants';
import { CASES_PACKAGE_NAME } from '@app/common/types/cases';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CASES_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001', // Ensure this matches your server address
          package: CASES_PACKAGE_NAME, // Must match the package name in the .proto file
          protoPath: join(__dirname, '../cases.proto'),
        },
      },
    ]),
    UsersModule,
    CaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
