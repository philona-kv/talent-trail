
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface LoginInput {
    email: string;
    password: string;
}

export interface CandidateCreateInput {
    name: string;
    age: number;
    email: string;
    phone: string;
    password: string;
}

export interface CandidateUpdateInput {
    name?: string;
    age?: number;
    email?: string;
    phone?: string;
    password?: string;
}

export interface EmployeeCreateInput {
    name: string;
    email: string;
    role: string[];
    password: string;
}

export interface EmployeeUpdateInput {
    name: string;
    email: string;
    role: string[];
    password: string;
}

export interface CreateInterviewInput {
    candidateId: number;
    employeeId: number;
    applicationId: number;
    startDate?: Date;
    endDate?: Date;
    round: number;
    status: string;
    prev?: number;
}

export interface UpdateInterviewInput {
    startDate?: Date;
    endDate?: Date;
    status?: string;
}

export interface JobAttributes {
    title?: string;
    description?: string;
    info?: JSON;
}

export interface LocationInput {
    country?: string;
    state?: string;
}

export interface JobCreateInput {
    title: string;
    description: string;
    location?: LocationInput;
    info?: JSON;
    createdBy: string;
}

export interface JobUpdateInput {
    title: string;
    description: string;
    location?: LocationInput;
    info?: JSON;
}

export interface Application {
    id: string;
    candidateId: string;
    jobId: string;
    referredBy?: string;
    status: string;
    appliedDate?: Date;
    candidate: Candidate;
    referrer?: Employee;
    job?: Job;
}

export interface IQuery {
    getAllReferred(): Application[] | Promise<Application[]>;
    getLoggedInUser(): User | Promise<User>;
    getCandidates(): Candidate[] | Promise<Candidate[]>;
    getCandidate(id: number): Candidate | Promise<Candidate>;
    getEmployees(): Employee[] | Promise<Employee[]>;
    getEmployee(id: number): Employee | Promise<Employee>;
    getAllInterviews(): Interview[] | Promise<Interview[]>;
    getInterview(id: number): Interview | Promise<Interview>;
    getJobs(attributes?: JobAttributes): Job[] | Promise<Job[]>;
    getJob(id: number): Job | Promise<Job>;
}

export interface User {
    id?: number;
    email?: string;
    groups?: string[];
}

export interface IMutation {
    login(input: LoginInput): string | Promise<string>;
    logout(): string | Promise<string>;
    candidateSignUp(input?: CandidateCreateInput): Candidate | Promise<Candidate>;
    updateCandidate(id: number, input?: CandidateUpdateInput): Candidate | Promise<Candidate>;
    deleteCandidate(id: number): Candidate | Promise<Candidate>;
    employeeSignUp(input?: EmployeeCreateInput): Employee | Promise<Employee>;
    updateEmployee(id: number, input?: EmployeeUpdateInput): Employee | Promise<Employee>;
    deleteEmployee(id: number): Employee | Promise<Employee>;
    createInterview(input: CreateInterviewInput): Interview | Promise<Interview>;
    updateInterview(id: number, input: UpdateInterviewInput): Interview | Promise<Interview>;
    deleteInterview(id: number): Interview | Promise<Interview>;
    createJob(input?: JobCreateInput): Job | Promise<Job>;
    updateJob(id: number, input?: JobUpdateInput): Job | Promise<Job>;
    deleteJob(id: number): Job | Promise<Job>;
}

export interface Candidate {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    info?: JSON;
    onboardingInfo?: JSON;
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: string[];
    password: string;
}

export interface Interview {
    id: number;
    candidateId: number;
    employeeId: number;
    applicationId: number;
    startDate?: Date;
    endDate?: Date;
    feedback?: JSON;
    round: number;
    status: string;
    next?: number;
    prev?: number;
}

export interface Location {
    country?: string;
    state?: string;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    location?: Location;
    info?: JSON;
}

export type JSON = any;
