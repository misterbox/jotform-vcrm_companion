import { FormSubmission } from "./models/responses/form-submission";
import { Answer } from "./models/answer";
import { AnswerControl } from "./enums/answer-control";
import { AnswerResponse } from "./models/responses/answer-response";

const processFormSubmissions = (submissions: FormSubmission[]): any[] => {
    let result: any[] = [];

    for (const submission of submissions) {
        const answers: Answer[] = processAnswerResponses(submission);
        result.push({
            id: submission.id
        });
    }

    return result;
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

    return result;
};

const shouldProcessAnswer = (answerResponse: AnswerResponse): boolean => {
    return answerResponse.type === AnswerControl.BIRTHDATE ||
        answerResponse.type === AnswerControl.DROPDOWN || 
        answerResponse.type === AnswerControl.EMAIL ||
        answerResponse.type === AnswerControl.DATETIME ||
        answerResponse.type === AnswerControl.PHONE ||
        answerResponse.type === AnswerControl.RADIO || 
        answerResponse.type === AnswerControl.TEXTAREA ||
        answerResponse.type === AnswerControl.TEXTBOX;
};

const processAnswerResponse = (answerResponse: AnswerResponse): Answer => {
    let result: Answer;

    switch (answerResponse.type as AnswerControl) {
        case AnswerControl.DATETIME:
        case AnswerControl.BIRTHDATE:
        case AnswerControl.PHONE:
            result = {
                name: answerResponse.text,
                text: answerResponse.prettyFormat
            };
            break;
        default:
            result = {
                name: answerResponse.text,
                text: answerResponse.answer
            };
    }

    return result;
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