import { createAppTester, tools } from 'zapier-platform-core';
import * as should from 'should';
import * as nock from 'nock';

import App from '../index';
import Constants from '../constants';

const appTester = createAppTester(App);

describe('Submission Triggers', () => {
    describe('triggerFormSubmission', () => {
        beforeEach(() => {
            tools.env.inject();
        });

        it('should return expected submission answers given form submission', async () => {
            const bundle = {
                inputData: {
                    form_id: 90896763718172
                }
            };

            try {
                const answers: any[] = await appTester(App.triggers.submission.operation.perform, bundle);
                should(true);
            }
            catch (error) {
                should.fail(null, null, 'We should never get here');
            }
        });
    });
});