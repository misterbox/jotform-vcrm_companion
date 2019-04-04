import { FormSubmission } from "./models/responses/form-submission";
import Submission from "./models/submission";

const processFormSubmissions = (submissions: FormSubmission[]): Submission[] => {
    let result: Submission[] = [];

    // console.log('Processing submissions: ', submissions);
    // console.log('Properties: ', Object.keys(submissions[0].answers));
    for (let answer in Object.keys(submissions[0].answers)) {
        console.log('Property: ', answer);
        console.log('answer: ', submissions[0].answers[answer]);
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
    processFormSubmissions: processFormSubmissions,
    sortForms: sortForms
};

export default Utilities;