
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export interface Candidate {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    info?: JSON;
    onboardingInfo?: JSON;
}

export interface IQuery {
    getCandidates(): Candidate[] | Promise<Candidate[]>;
    getCandidate(id: number): Candidate | Promise<Candidate>;
}

export interface IMutation {
    candidateSignUp(input?: CandidateCreateInput): Candidate | Promise<Candidate>;
    updateCandidate(id: number, input?: CandidateUpdateInput): Candidate | Promise<Candidate>;
    deleteCandidate(id: number): Candidate | Promise<Candidate>;
}

export type JSON = any;
