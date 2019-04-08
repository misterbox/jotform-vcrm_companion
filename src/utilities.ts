import { FormSubmission } from "./models/responses/form-submission";
import { Answer } from "./models/answer";
import { AnswerControl } from "./enums/answer-control";
import { AnswerResponse } from "./models/responses/answer-response";

const passengerRegExp = /^Passenger_\d+/i;

const processFormSubmissions = (submissions: FormSubmission[]): any[] => {
    let result: any[] = [];

    for (const submission of submissions) {
        const processedSubmission = processFormSubmission(submission);
        result.push(processedSubmission);
    }

    return result;
};

const processFormSubmission = (submission: FormSubmission): any => {
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
        *   throw error if no passenger data can be found
        * add passenger array to result
        * add all non-passenger Answers as properties of result
    */

    const allAnswers: Answer[] = processAnswerResponses(submission)
    const passengerData = groupPassengerData(allAnswers);
    const processedSubmission = buildFinalSubmissionResult(allAnswers, passengerData);
    processedSubmission.id = submission.id;
    processedSubmission.passenger_data_string = JSON.stringify(processedSubmission.passenger_data);

    return processedSubmission;
};

const processAnswerResponses = (submission: FormSubmission): Answer[] => {
    let result: Answer[] = [];

    for (const answer in submission.answers) {
        if (submission.answers.hasOwnProperty(answer)) {
            const answerResponse: AnswerResponse = submission.answers[answer];

            if (shouldProcessAnswer(answerResponse)) {
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
        answerResponse.type === AnswerControl.PHONE ||
        answerResponse.type === AnswerControl.RADIO || 
        answerResponse.type === AnswerControl.TEXTAREA ||
        answerResponse.type === AnswerControl.TEXTBOX;
};

const processAnswerResponse = (answerResponse: AnswerResponse): Answer => {
    const replaceRegex = /[^\w\d]/g;
    let result: Answer = {
        text: answerResponse.text.replace(replaceRegex, '_'),
        order: answerResponse.order,
    };

    switch (answerResponse.type as AnswerControl) {
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

const groupPassengerData = (answers: Answer[]): any[] => {
    let result: any[] = [];
    let passengerMap: { [key:string]: any } = {};

    for (const answer of answers) {
        if (passengerRegExp.test(answer.text)) {
            const matches = answer.text.match(passengerRegExp);

            if (matches) {
                const passengerKey = matches[0];
                passengerMap[passengerKey] = passengerMap[passengerKey] || {};
                passengerMap[passengerKey][answer.text] = answer.answer;
            }
        }
    }

    for (const key in passengerMap) {
        if (passengerMap.hasOwnProperty(key)) {
            const passengerData = passengerMap[key];
            result.push(passengerData);
        }
    }

    if (result.length < 1) {
        throw new Error('No passenger data could be found in submission data!');
    }

    return result;
};

const buildFinalSubmissionResult = (allAnswers: Answer[], passengerData: any[]): any => {
    let result: any = {};
    result.passenger_data = passengerData;
    const sortedAnswers = allAnswers.sort(sortAnswers);

    for (const answer of sortedAnswers) {
        if (!passengerRegExp.test(answer.text)) {
            result[answer.text] = answer.answer;
        }
    }

    return result;
};

const sortAnswers = (answerA: Answer, answerB: Answer): number => {
    const textA = answerA.text.toUpperCase();
    const textB = answerB.text.toUpperCase();

    if (textA < textB) {
        return -1;
    }
    if (textA > textB) {
        return 1;
    }

    return 0;
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
    buildFinalSubmissionResult: buildFinalSubmissionResult,
    groupPassengerData: groupPassengerData,
    processAnswerResponses: processAnswerResponses,
    processAnswerResponse: processAnswerResponse,
    processFormSubmissions: processFormSubmissions,
    sortForms: sortForms
};

export default Utilities;