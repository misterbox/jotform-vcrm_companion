import { Form } from "./models/form";

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
    SortForms: sortForms
};

export default Utilities;