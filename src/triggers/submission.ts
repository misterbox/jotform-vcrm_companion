import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";

import Constants from "../constants";
import { JotFormResponse } from "../models/responses/jotform-response";

const triggerFormSubmission = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/form/${bundle.inputData.form_id}/submissions`, {
        method: 'GET',
        removeMissingValuesFrom: {
            params: true,
            body: true
        }
    });
    let submissions: any[] = [];

    if (response.json) {
        let jotFormResponse: JotFormResponse = response.json as JotFormResponse;

        console.log('response: ', jotFormResponse.content);
    }

    return submissions;
};

const Submission = {
    key: 'submission',
    noun: 'Submission',
    display: {
        label: 'Form Submission',
        description: 'Fires on a new form submission'
    },
    operation: {
        inputFields: [
            {
                key: 'form_id',
                label: 'Form ID',
                required: true,
                dynamic: 'form.id.name'
            }
        ],
        perform: triggerFormSubmission
    }
};

export default Submission;