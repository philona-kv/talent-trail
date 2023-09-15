import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Employee from './entity/employee.entity'; // Update the import path
import { EmployeeResolver } from './resolver/employee.resolver'; // Update the resolver import
import { EmployeeService } from './service/employee.service'; // Update the service import

@Module({
  imports: [TypeOrmModule.forFeature([Employee])], // Update the entity type
  providers: [EmployeeResolver, EmployeeService], // Update the resolver and service
  exports: [EmployeeService],
  controllers: [], // Optionally update controllers if needed
})
export class EmployeeModule {
  // Update the module name
}
