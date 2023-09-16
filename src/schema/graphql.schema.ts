/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum DocumentType {
    RESUME = "RESUME"
}

export interface ApplicationFilter {
    applicantId?: number;
    jobId?: number;
    referredBy?: number;
    status?: string;
}

export interface CreateApplicationInput {
    candidateId: number;
    jobId: number;
}

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

export interface CreateDocumentInput {
    entityName: string;
    entityId: number;
    key: string;
    type: DocumentType;
}

export interface EmployeeCreateInput {
    name: string;
    email: string;
    role: string[];
    password: string;
    skills?: string[];
    experience: number;
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

export interface CreateInterviewSlotInput {
    slotId: number;
    userId: number;
    status: string;
    rejectionReason?: string;
}

export interface UpdateInterviewSlotInput {
    slotId: number;
    userId: number;
    status?: string;
    rejectionReason?: string;
}

export interface GetUniqueInterviewSlotInput {
    slotId: number;
    userId: number;
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
    createdBy?: number;
}

export interface LocationInput {
    country?: string;
    state?: string;
}

export interface JobCreateInput {
    title: string;
    description: string;
    location?: LocationInput;
    categoryId: number;
    info?: JSON;
}

export interface JobUpdateInput {
    title: string;
    description: string;
    location?: LocationInput;
    info?: JSON;
}

export interface Application {
    id: number;
    candidateId: number;
    jobId: number;
    referredBy?: string;
    status: string;
    appliedDate?: Date;
    candidate: Candidate;
    referrer?: Employee;
    job?: Job;
    timeline?: JSON;
    score?: number;
}

export interface IQuery {
    getAllReferred(): Application[] | Promise<Application[]>;
    findApplications(filter?: ApplicationFilter): Application[] | Promise<Application[]>;
    getLoggedInUser(): User | Promise<User>;
    getCandidates(): Candidate[] | Promise<Candidate[]>;
    getCandidate(id: number): Candidate | Promise<Candidate>;
    getHotProfiles(skills?: string[]): Candidate[] | Promise<Candidate[]>;
    getDocumentUploadUrl(key: string): DocumentUrlResponse | Promise<DocumentUrlResponse>;
    getDocumentById(id?: number): Document | Promise<Document>;
    getEmployees(): Employee[] | Promise<Employee[]>;
    getEmployee(id: number): Employee | Promise<Employee>;
    getAllInterviews(): Interview[] | Promise<Interview[]>;
    getInterview(id: number): Interview | Promise<Interview>;
    getAllInterviewSlots(): InterviewSlot[] | Promise<InterviewSlot[]>;
    getInterviewSlot(input?: GetUniqueInterviewSlotInput): InterviewSlot | Promise<InterviewSlot>;
    getAllCategory(): Category[] | Promise<Category[]>;
    getJobs(attributes?: JobAttributes): Job[] | Promise<Job[]>;
    getJob(id: number): Job | Promise<Job>;
}

export interface IMutation {
    createApplication(input: CreateApplicationInput): Application | Promise<Application>;
    hrStatusUpdate(applicationId: number, accepted?: boolean): Application | Promise<Application>;
    login(input: LoginInput): string | Promise<string>;
    logout(): string | Promise<string>;
    candidateSignUp(input?: CandidateCreateInput): Candidate | Promise<Candidate>;
    updateCandidate(id: number, input?: CandidateUpdateInput): Candidate | Promise<Candidate>;
    deleteCandidate(id: number): Candidate | Promise<Candidate>;
    createDocument(input?: CreateDocumentInput): Document | Promise<Document>;
    employeeSignUp(input?: EmployeeCreateInput): Employee | Promise<Employee>;
    updateEmployee(id: number, input?: EmployeeUpdateInput): Employee | Promise<Employee>;
    deleteEmployee(id: number): Employee | Promise<Employee>;
    createInterview(input: CreateInterviewInput): Interview | Promise<Interview>;
    updateInterview(id: number, input: UpdateInterviewInput): Interview | Promise<Interview>;
    deleteInterview(id: number): Interview | Promise<Interview>;
    createInterviewSlot(input: CreateInterviewSlotInput): InterviewSlot | Promise<InterviewSlot>;
    updateInterviewSlot(input: UpdateInterviewSlotInput): InterviewSlot | Promise<InterviewSlot>;
    deleteInterviewSlot(input?: GetUniqueInterviewSlotInput): InterviewSlot | Promise<InterviewSlot>;
    schedule(id?: number): Interview | Promise<Interview>;
    submitPreferredSlot(slotId: number, startDate?: Date, endDate?: Date): InterviewSlot | Promise<InterviewSlot>;
    createJob(input?: JobCreateInput): Job | Promise<Job>;
    updateJob(id: number, input?: JobUpdateInput): Job | Promise<Job>;
    deleteJob(id: number): Job | Promise<Job>;
    mockJob(): Job[] | Promise<Job[]>;
}

export interface User {
    id?: number;
    email?: string;
    name?: string;
    groups?: string[];
}

export interface Candidate {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    info?: JSON;
    location?: Location;
    leetcode?: number;
    github?: number;
    onboardingInfo?: JSON;
}

export interface Document {
    id?: number;
    entityName?: string;
    entityId?: number;
    key?: string;
    type?: string;
    url?: string;
}

export interface DocumentUrlResponse {
    key?: string;
    url?: string;
    extension?: string;
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

export interface InterviewSlot {
    slotId: number;
    userId: number;
    status: string;
    rejectionReason?: string;
}

export interface Category {
    id: string;
    name: string;
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
    createdAt?: Date;
    status?: string;
    applicants?: number;
    info?: JSON;
}

export type JSON = any;
