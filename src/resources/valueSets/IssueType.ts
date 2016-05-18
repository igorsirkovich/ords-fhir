import {Valueset} from 'ts-objectschema';

export class IssueType {
    public codeSystem: Object = {
        concept: [
            {
                code: 'invalid',
                display: 'Invalid Content',
                definition: 'Content invalid against the specification or a profile.',
                concept: [
                    {
                        code: 'structure',
                        display: 'Structural Issue',
                        definition: 'A structural issue in the content such as wrong namespace, or unable to parse the content completely, or invalid json syntax.'
                    },
                    {
                        code: 'required',
                        display: 'Required element missing',
                        definition: 'A required element is missing.'
                    },
                    {
                        code: 'value',
                        display: 'Element value invalid',
                        definition: 'An element value is invalid.'
                    },
                    {
                        code: 'invariant',
                        display: 'Validation rule failed',
                        definition: 'A content validation rule failed - e.g. a schematron rule.'
                    }
                ]
            },
            {
                code: 'security',
                display: 'Security Problem',
                definition: 'An authentication/authorization/permissions issue of some kind.',
                concept: [
                    {
                        code: 'login',
                        display: 'Login Required',
                        definition: 'The client needs to initiate an authentication process.'
                    },
                    {
                        code: 'unknown',
                        display: 'Unknown User',
                        definition: 'The user or system was not able to be authenticated (either there is no process, or the proferred token is unacceptable).'
                    },
                    {
                        code: 'expired',
                        display: 'Session Expired',
                        definition: 'User session expired; a login may be required.'
                    },
                    {
                        code: 'forbidden',
                        display: 'Forbidden',
                        definition: 'The user does not have the rights to perform this action.'
                    },
                    {
                        code: 'suppressed',
                        display: 'Information  Suppressed',
                        definition: 'Some information was not or may not have been returned due to business rules, consent or privacy rules, or access permission constraints.  This information may be accessible through alternate processes.'
                    }
                ]
            },
            {
                code: 'processing',
                display: 'Processing Failure',
                definition: 'Processing issues. These are expected to be final e.g. there is no point resubmitting the same content unchanged.',
                concept: [
                    {
                        code: 'not-supported',
                        display: 'Content not supported',
                        definition: 'The resource or profile is not supported.'
                    },
                    {
                        code: 'duplicate',
                        display: 'Duplicate',
                        definition: 'An attempt was made to create a duplicate record.'
                    },
                    {
                        code: 'not-found',
                        display: 'Not Found',
                        definition: 'The reference provided was not found. In a pure RESTful environment, this would be an HTTP 404 error, but this code may be used where the content is not found further into the application architecture.'
                    },
                    {
                        code: 'too-long',
                        display: 'Content Too Long',
                        definition: 'Provided content is too long (typically, this is a denial of service protection type of error).'
                    },
                    {
                        code: 'code-invalid',
                        display: 'Invalid Code',
                        definition: 'The code or system could not be understood, or it was not valid in the context of a particular ValueSet.code.'
                    },
                    {
                        code: 'extension',
                        display: 'Unacceptable Extension',
                        definition: 'An extension was found that was not acceptable, could not be resolved, or a modifierExtension was not recognized.'
                    },
                    {
                        code: 'too-costly',
                        display: 'Operation Too Costly',
                        definition: 'The operation was stopped to protect server resources; e.g. a request for a value set expansion on all of SNOMED CT.'
                    },
                    {
                        code: 'business-rule',
                        display: 'Business Rule Violation',
                        definition: 'The content/operation failed to pass some business rule, and so could not proceed.'
                    },
                    {
                        code: 'conflict',
                        display: 'Edit Version Conflict',
                        definition: 'Content could not be accepted because of an edit conflict (i.e. version aware updates) (In a pure RESTful environment, this would be an HTTP 404 error, but this code may be used where the conflict is discovered further into the application architecture.)'
                    },
                    {
                        code: 'incomplete',
                        display: 'Incomplete Results',
                        definition: 'Not all data sources typically accessed could be reached, or responded in time, so the returned information may not be complete.'
                    }
                ]
            },
            {
                code: 'transient',
                display: 'Transient Issue',
                definition: 'Transient processing issues. The system receiving the error may be able to resubmit the same content once an underlying issue is resolved.',
                concept: [
                    {
                        code: 'lock-error',
                        display: 'Lock Error',
                        definition: 'A resource/record locking failure (usually in an underlying database).'
                    },
                    {
                        code: 'no-store',
                        display: 'No Store Available',
                        definition: 'The persistent store is unavailable; e.g. the database is down for maintenance or similar action.'
                    },
                    {
                        code: 'exception',
                        display: 'Exception',
                        definition: 'An unexpected internal error has occurred.'
                    },
                    {
                        code: 'timeout',
                        display: 'Timeout',
                        definition: 'An internal timeout has occurred.'
                    },
                    {
                        code: 'throttled',
                        display: 'Throttled',
                        definition: 'The system is not prepared to handle this request due to load management.'
                    }
                ]
            },
            {
                code: 'informational',
                display: 'Informational Note',
                definition: 'A message unrelated to the processing success of the completed operation (examples of the latter include things like reminders of password expiry, system maintenance times, etc.).'
            }
        ],
        system: process.env.domain + '/ValueSet/IssueType',
        version: '1.0.0'
    };
}

export const issueType: IssueType = new Valueset(new IssueType());