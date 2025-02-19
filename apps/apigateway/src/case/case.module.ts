import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CASES_SERVICE } from './constants';
import { CASES_PACKAGE_NAME } from '@app/common/types/cases';

@Module({
   imports: [
      ClientsModule.register([
        {
          name: CASES_SERVICE,
          transport: Transport.GRPC,
          options: {
            package: CASES_PACKAGE_NAME,
            protoPath: join(__dirname, '../cases.proto'),
            url:"localhost:5001"
          },
        },
      ]),
    ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
