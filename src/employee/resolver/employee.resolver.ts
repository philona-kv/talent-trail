import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Employee from '../entity/employee.entity'; // Update the import path
import { EmployeeService } from '../service/employee.service'; // Update the service import
import {
  EmployeeCreateInput, // Update the input type
  EmployeeUpdateInput, // Update the input type
} from '../../schema/graphql.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EmployeeNotFoundException } from '../exception/employee.exception'; // Update the exception class

@Resolver('Employee') // Update the resolver name
export class EmployeeResolver {
  // Update the resolver class name
  constructor(private employeeService: EmployeeService) {}

  @Query()
  getEmployees(): Promise<Employee[]> {
    // Update the method name and return type
    return this.employeeService.getAllEmployees(); // Update the service method call
  }

  @Query()
  getEmployee(@Args('id') id: number) {
    // Update the argument name
    return this.employeeService.getEmployee(id); // Update the service method call
  }

  @Mutation()
  employeeSignUp(
    // Update the mutation name
    @Args('input') input: EmployeeCreateInput, // Update the argument name
  ): Promise<Employee> {
    // Update the return type
    return this.employeeService.createEmployee(input); // Update the service method call
  }

  @Mutation()
  updateEmployee(
    // Update the mutation name
    @Args('id') id: number, // Update the argument name
    @Args('input') input: EmployeeUpdateInput, // Update the argument name
  ): Promise<Employee> {
    // Update the return type
    return this.employeeService.updateEmployee(id, input); // Update the service method call
  }

  @Mutation()
  deleteEmployee(@Args('id') id: number): Promise<Employee> {
    // Update the argument name
    return this.employeeService.deleteEmployee(id); // Update the service method call
  }
}
