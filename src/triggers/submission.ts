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
        perform: () => {}
    }
}

export default Submission;