import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";

import Constants from "../constants";
import Utilities from "../utilities";
import { JotFormResponse } from "../models/responses/jotform-response";
import { FormSubmission } from "../models/responses/form-submission";

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

        submissions = Utilities.processFormSubmissions(jotFormResponse.content as FormSubmission[]);
        // console.log('submissions: ', submissions);
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