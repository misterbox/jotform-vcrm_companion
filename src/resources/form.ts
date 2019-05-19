
import Constants from "../constants";
import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";
import { JotFormResponse } from "../models/responses/jotform-response";
import { Form } from "../models/form";
import Utilities from "../utilities";

const queryForms = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request(`${Constants.API_BASE}/user/forms?limit=1000&orderby=title`, {
        method: 'GET',
        removeMissingValuesFrom: {
            params: true,
            body: true
        }
    });
    let forms: any[] = [];

    if (response.json) {
        let jotFormResponse: JotFormResponse = response.json as JotFormResponse;
        let formsResult: Form[] = jotFormResponse.content as Form[];

        formsResult.forEach((form: Form) => {
            forms.push({
                id: form.id,
                name: form.title
            });
        });
    }

    return forms.sort(Utilities.sortForms);
};

const Form = {
    key: 'form',
    noun: 'Form',
    display: {
        label: 'List of forms',
        description: 'This is a hidden trigger',
        hidden: true
    },
    operation: {
        perform: queryForms
    }
};

export default Form;