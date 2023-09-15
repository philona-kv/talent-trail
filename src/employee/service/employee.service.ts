import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from '../entity/employee.entity'; // Update the import path
import { Repository } from 'typeorm';
import {
  EmployeeCreateInput, // Update the input type
  EmployeeUpdateInput, // Update the input type
} from '../../schema/graphql.schema';
import { EmployeeNotFoundException } from '../exception/employee.exception'; // Update the exception class

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) // Update the repository type to Employee
    private employeeRepository: Repository<Employee>, // Update the repository variable name
  ) {}

  public getAllEmployees() {
    return this.employeeRepository.find();
  }

  public getEmployee(id: number) {
    return this.employeeRepository.findOne(id);
  }

  public filterEmployee(filter: Partial<Employee>) {
    return this.employeeRepository.find(filter);
  }

  public createEmployee(input: EmployeeCreateInput) {
    const newRecord = this.employeeRepository.create(input);
    return this.employeeRepository.save(newRecord);
  }

  public async updateEmployee(id: number, input: EmployeeUpdateInput) {
    const existingRecord = await this.employeeRepository.findOne(id);
    if (!existingRecord) {
      throw new EmployeeNotFoundException(`Employee with id ${id} not found`);
    }
    return this.employeeRepository.save({
      ...existingRecord,
      ...input,
    });
  }

  public deleteEmployee(id: number) {
    const record = this.employeeRepository.findOne(id);
    this.employeeRepository.delete(id);
    return record;
  }
}
