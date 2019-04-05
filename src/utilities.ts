import { FormSubmission } from "./models/responses/form-submission";
import { AnswerResponse } from "./models/responses/answer-response";

const processFormSubmissions = (submissions: FormSubmission[]): any[] => {
    let result: any[] = [];

    for (const submission of submissions) {
        const answers: AnswerResponse[] = getAnswerResponses(submission);
        result.push({
            id: submission.id
        });
    }

    return result;
};

const getAnswerResponses = (submission: FormSubmission): AnswerResponse[] => {
    let result: AnswerResponse[] = [];

    for (const answer in submission.answers) {
        if (submission.answers.hasOwnProperty(answer)) {
            const element = submission.answers[answer];
            console.log('element: ', element);
        }
    }

    return result;
}

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
    getAnswerResponses: getAnswerResponses,
    processFormSubmissions: processFormSubmissions,
    sortForms: sortForms
};

export default Utilities;