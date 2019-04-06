import { FormSubmission } from "./models/responses/form-submission";
import { Answer } from "./models/answer";
import { AnswerControl } from "./enums/answer-control";
import { AnswerResponse } from "./models/responses/answer-response";

const processFormSubmissions = (submissions: FormSubmission[]): any[] => {
    let result: any[] = [];

    for (const submission of submissions) {
        processFormSubmission(submission);
        result.push({
            id: submission.id
        });
    }

    return result;
};

const processFormSubmission = (submission: FormSubmission) => {
    /*
        End result: {
            passenger_data: [
                {
                    first_name: firstName,
                    last_name: lastName
                },
                {
                    first_name: firstName,
                    middle_name: middleName,
                    last_name: lastName
                }
            ],
            email11: 'test@ump.ump',
            phoneNumber12: '(123) 4567890'
        }

        * process answer responses in to normalized array of Answers
        * sort Answers based on Order
        * filter Answers with empty answer
        * find and group passenger data
        * add passenger array to result
        * add all non-passenger Answers as properties of result
    */

    const allAnswers: Answer[] = processAnswerResponses(submission)
    console.log('answers: ', allAnswers);
    const passengerAnswers = groupPassengerAnswers(allAnswers);
};

const processAnswerResponses = (submission: FormSubmission): Answer[] => {
    let result: Answer[] = [];

    for (const answer in submission.answers) {
        if (submission.answers.hasOwnProperty(answer)) {
            const answerResponse: AnswerResponse = submission.answers[answer];

            if (shouldProcessAnswer(answerResponse)) {
                // console.log('element: ', element);
                result.push(processAnswerResponse(answerResponse));
            }
        }
    }

    return result.sort((a: Answer, b: Answer) => a.order - b.order)
        .filter((answer: Answer) => answer.answer && answer.answer.trim().length);
};

const shouldProcessAnswer = (answerResponse: AnswerResponse): boolean => {
    return answerResponse.type === AnswerControl.BIRTHDATE ||
        answerResponse.type === AnswerControl.DATETIME ||
        answerResponse.type === AnswerControl.DROPDOWN || 
        answerResponse.type === AnswerControl.EMAIL ||
        answerResponse.type === AnswerControl.HEAD ||
        answerResponse.type === AnswerControl.PHONE ||
        answerResponse.type === AnswerControl.RADIO || 
        answerResponse.type === AnswerControl.TEXTAREA ||
        answerResponse.type === AnswerControl.TEXTBOX;
};

const processAnswerResponse = (answerResponse: AnswerResponse): Answer => {
    let result: Answer = {
        name: answerResponse.name,
        text: answerResponse.text,
        order: answerResponse.order,
        is_head: false
    };

    switch (answerResponse.type as AnswerControl) {
        case AnswerControl.HEAD:
            result.is_head = true;
            break;
        case AnswerControl.DATETIME:
        case AnswerControl.BIRTHDATE:
        case AnswerControl.PHONE:
            result.answer = answerResponse.prettyFormat;
            break;
        default:
            result.answer = answerResponse.answer;
    }

    return result;
};

const groupPassengerAnswers = (answers: Answer[]) => {
    
};

const sortForms = (formA: any, formB: any): number => {
    const nameA = formA.name.toUpperCase();
    const nameB = formB.name.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
};

const Utilities = {
    processAnswerResponses: processAnswerResponses,
    processAnswerResponse: processAnswerResponse,
    processFormSubmissions: processFormSubmissions,
    sortForms: sortForms
};

export default Utilities;