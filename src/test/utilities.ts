import * as should from 'should';

import Utilities from '../utilities';
import { FormSubmission } from '../models/responses/form-submission';
import { AnswerResponse } from '../models/responses/answer-response';
import { Answer } from '../models/answer';

describe('Utilities', () => {
    describe('processFormSubmissions', () => {
        it('should return array of processed submissions with expected ids', () => {
            const expectedId1 = 123456;
            const expectedId2 = 987654;
            const submissions: FormSubmission[] = [
                {
                    id: expectedId1,
                    answers: {
                        1: {
                            name: 'first name',
                            order: 1,
                            text: 'passenger 1 first name',
                            answer: 'rick',
                            type: 'control_textbox'
                        }
                    }
                },
                {
                    id: expectedId2,
                    answers: {
                        1: {
                            name: 'first name',
                            order: 1,
                            text: 'passenger 1 first name',
                            answer: 'summer',
                            type: 'control_textbox'
                        }
                    }
                }
            ];

            const result = Utilities.processFormSubmissions(submissions);

            should(result[0].id).eql(expectedId1);
            should(result[1].id).eql(expectedId2);
        });
    });

    describe('processAnswerResponses', () => {
        it('should return expected form submission answers', () => {
            const expectedName2 = 'email11';
            const expectedOrder2 = 26;
            const expectedText2 = 'E_mail';
            const expectedType2 = 'control_email';
            const expectedAnswer2 = 'teset@ump.ump';
            const submission: FormSubmission =
            {
                'id': 4298733848221547651,
                'form_id': 90896763718172,
                'answers': {
                    '7': {
                        'name': expectedName2,
                        'order': expectedOrder2,
                        'text': expectedText2,
                        'type': expectedType2,
                        'answer': expectedAnswer2
                    }
                }
            };

            let result = Utilities.processAnswerResponses(submission);

            should(result[0].text).eql(expectedText2);
            should(result[0].answer).eql(expectedAnswer2);
        });

        it('should filter out expected answer responses', () => {
            const expectedText = 'Phone Number';
            const expectedAnswer = '(123) 4567890';
            const goodAnswerResponse: AnswerResponse = {
                name: 'phoneNumber12',
                order: 27,
                text: expectedText,
                type: 'control_phone',
                answer: {
                    area: '123',
                    phone: '4567890'
                },
                prettyFormat: expectedAnswer
            };
            const badAnswerResponse: AnswerResponse = {
                name: 'clickto166',
                order: 40,
                text: 'Passenger #2',
                type: 'control_button'
            };
            const submission: FormSubmission = {
                'id': 4298733848221547651,
                'form_id': 90896763718172,
                'answers': {
                    1: goodAnswerResponse,
                    7: badAnswerResponse
                }
            };

            const result: Answer[] = Utilities.processAnswerResponses(submission);

            should(result.length).eql(1);
        });


        it('should filter out blank answer responses', () => {
            const expectedText = 'Phone Number';
            const expectedAnswer = '(123) 4567890';
            const goodAnswerResponse: AnswerResponse = {
                name: 'phoneNumber12',
                order: 27,
                text: expectedText,
                type: 'control_phone',
                answer: {
                    area: '123',
                    phone: '4567890'
                },
                prettyFormat: expectedAnswer
            };
            const badAnswerResponse: AnswerResponse = {
                name: 'email',
                order: 30,
                text: 'some question',
                type: 'control_phone',
                answer: {
                    area: '',
                    phone: ''
                },
                prettyFormat: '   '
            };
            const submission: FormSubmission = {
                'id': 4298733848221547651,
                'form_id': 90896763718172,
                'answers': {
                    1: goodAnswerResponse,
                    7: badAnswerResponse
                }
            };

            const result: Answer[] = Utilities.processAnswerResponses(submission);

            should(result.length).eql(1);
        });

        it('should sort processed answer responses', () => {
            const firstExpectedOrder = 1;
            const secondExpectedOrder = 2;
            const first: AnswerResponse = {
                name: 'phoneNumber12',
                order: firstExpectedOrder,
                text: 'phone number',
                type: 'control_phone',
                answer: {
                    area: '123',
                    phone: '4567890'
                },
                prettyFormat: '123 4567890'
            };
            const second: AnswerResponse = {
                name: 'email',
                order: secondExpectedOrder,
                text: 'some question',
                type: 'control_email',
                answer: 'test@ump.ump'
            };
            const submission: FormSubmission = {
                'id': 4298733848221547651,
                'form_id': 90896763718172,
                'answers': {
                    1: first,
                    7: second
                }
            };

            const result: Answer[] = Utilities.processAnswerResponses(submission);

            should(result[0].order).eql(firstExpectedOrder);
            should(result[1].order).eql(secondExpectedOrder);
        });
    });

    describe('processAnswerResponse', () => {
        it('should return expected email address given control_email type', () => {
            const expectedText = 'E_mail';
            const expectedAnswer = 'test@ump.ump';
            const answerResponse: AnswerResponse = {
                name: 'email11',
                order: 26,
                text: expectedText,
                type: 'control_email',
                answer: expectedAnswer
            };

            const result: Answer = Utilities.processAnswerResponse(answerResponse);

            should(result.text).eql(expectedText);
            should(result.answer).eql(expectedAnswer);
        });

        it('should return expected phone number given control_phone type', () => {
            const expectedText = 'Phone_Number';
            const expectedAnswer = '(123) 4567890';
            const answerResponse: AnswerResponse = {
                name: 'phoneNumber12',
                order: 27,
                text: expectedText,
                type: 'control_phone',
                answer: {
                    area: '123',
                    phone: '4567890'
                },
                prettyFormat: expectedAnswer
            };

            const result: Answer = Utilities.processAnswerResponse(answerResponse);

            should(result.text).eql(expectedText);
            should(result.answer).eql(expectedAnswer);
        });

        it('should return expected birthdate given control_birthdate type', () => {
            const expectedText = 'Passenger_1_Birth_Date';
            const expectedAnswer = 'January 1 1967';
            const answerResponse: AnswerResponse = {
                name: 'passenger113',
                order: 25,
                text: expectedText,
                type: 'control_birthdate',
                answer: {
                    month: 'January',
                    day: '1',
                    year: '1967'
                },
                prettyFormat: expectedAnswer
            };

            const result: Answer = Utilities.processAnswerResponse(answerResponse);

            should(result.text).eql(expectedText);
            should(result.answer).eql(expectedAnswer);
        });

        it('should return expected departure date given control_datetime type', () => {
            const expectedText = 'Departure_Date_Time';
            const expectedAnswer = '04-01-2019 1:00 AM';
            const answerResponse: AnswerResponse = {
                name: 'departureDatetime',
                order: 7,
                text: expectedText,
                type: 'control_datetime',
                answer: {
                    month: '04',
                    day: '01',
                    year: '2019',
                    hour: '1',
                    min: '00',
                    ampm: 'AM'
                },
                prettyFormat: expectedAnswer
            };

            const result: Answer = Utilities.processAnswerResponse(answerResponse);

            should(result.text).eql(expectedText);
            should(result.answer).eql(expectedAnswer);
        });
    });

    describe('groupPassengerData', () => {
        it('should throw error if no passenger data can be found', () => {
            const answers: Answer[] = [
                {
                    order: 1,
                    text: 'email_address',
                    answer: 'test@ump.ump'
                }
            ];

            try {
                Utilities.groupPassengerData(answers);
                should.fail(null, null, 'We should never get here');
            }
            catch(error) {
                should(error.message).containEql('No passenger data could be found in submission data!');
            }
        });

        it('should return a single passenger with expected data', () => {
            const expectedFirstName = 'Rick';
            const expectedFirstNameText = 'Passenger_1_First_name';
            const expectedLastName = 'Sanchez';
            const expectedLastNameText = 'Passenger_1_Last_name';
            const expectedStreetAddress = '123 Street';
            const expectedStreetAddressText = 'Passenger_1_Street_address';
            const expectedCity = 'Seattle';
            const expectedCityText = 'Passenger_1_City';
            const expectedState = 'Washington';
            const expectedStateText = 'Passenger_1_State';
            const answers: Answer[] = [
                {
                    order: 2,
                    text: expectedFirstNameText,
                    answer: expectedFirstName
                },
                {
                    order: 3,
                    text: expectedLastNameText,
                    answer: expectedLastName
                },
                {
                    order: 4,
                    text: expectedStreetAddressText,
                    answer: expectedStreetAddress
                },
                {
                    order: 5,
                    text: expectedCityText,
                    answer: expectedCity
                },
                {
                    order: 6,
                    text: expectedStateText,
                    answer: expectedState
                }
            ];

            const result = Utilities.groupPassengerData(answers);
            const passenger = result[0];

            should(passenger[expectedFirstNameText]).eql(expectedFirstName);
            should(passenger[expectedLastNameText]).eql(expectedLastName);
            should(passenger[expectedStreetAddressText]).eql(expectedStreetAddress);
            should(passenger[expectedCityText]).eql(expectedCity);
            should(passenger[expectedStateText]).eql(expectedState);
        });

        it('should return multiple passengers with expected data', () => {
            const firstExpectedFirstName = 'Rick';
            const firstExpectedFirstNameText = 'Passenger_1_First_name';
            const firstExpectedLastName = 'Sanchez';
            const firstExpectedLastNameText = 'Passenger_1_Last_name';
            const firstExpectedStreetAddress = '123 Street';
            const firstExpectedStreetAddressText = 'Passenger_1_Street_address';
            const firstExpectedCity = 'Seattle';
            const firstExpectedCityText = 'Passenger_1_City';
            const firstExpectedState = 'Washington';
            const firstExpectedStateText = 'Passenger_1_State';

            const secondExpectedFirstName = 'Summer';
            const secondExpectedFirstNameText = 'Passenger_2_First_name';
            const secondExpectedLastName = 'Smith';
            const secondExpectedLastNameText = 'Passenger_2_Last_name';
            const secondExpectedStreetAddress = '456 Street';
            const secondExpectedStreetAddressText = 'Passenger_2_Street_address';
            const secondExpectedCity = 'Seattle';
            const secondExpectedCityText = 'Passenger_2_City';
            const secondExpectedState = 'Washington';
            const secondExpectedStateText = 'Passenger_2_State';

            const answers: Answer[] = [
                {
                    order: 2,
                    text: firstExpectedFirstNameText,
                    answer: firstExpectedFirstName
                },
                {
                    order: 3,
                    text: firstExpectedLastNameText,
                    answer: firstExpectedLastName
                },
                {
                    order: 4,
                    text: firstExpectedStreetAddressText,
                    answer: firstExpectedStreetAddress
                },
                {
                    order: 5,
                    text: firstExpectedCityText,
                    answer: firstExpectedCity
                },
                {
                    order: 6,
                    text: firstExpectedStateText,
                    answer: firstExpectedState
                },
                {
                    order: 7,
                    text: secondExpectedFirstNameText,
                    answer: secondExpectedFirstName
                },
                {
                    order: 8,
                    text: secondExpectedLastNameText,
                    answer: secondExpectedLastName
                },
                {
                    order: 9,
                    text: secondExpectedStreetAddressText,
                    answer: secondExpectedStreetAddress
                },
                {
                    order: 10,
                    text: secondExpectedCityText,
                    answer: secondExpectedCity
                },
                {
                    order: 11,
                    text: secondExpectedStateText,
                    answer: secondExpectedState
                }
            ];

            const result = Utilities.groupPassengerData(answers);
            const passenger1 = result[0];
            const passenger2 = result[1];

            should(passenger1[firstExpectedFirstNameText]).eql(firstExpectedFirstName);
            should(passenger1[firstExpectedLastNameText]).eql(firstExpectedLastName);
            should(passenger1[firstExpectedStreetAddressText]).eql(firstExpectedStreetAddress);
            should(passenger1[firstExpectedCityText]).eql(firstExpectedCity);
            should(passenger1[firstExpectedStateText]).eql(firstExpectedState);

            should(passenger2[secondExpectedFirstNameText]).eql(secondExpectedFirstName);
            should(passenger2[secondExpectedLastNameText]).eql(secondExpectedLastName);
            should(passenger2[secondExpectedStreetAddressText]).eql(secondExpectedStreetAddress);
            should(passenger2[secondExpectedCityText]).eql(secondExpectedCity);
            should(passenger2[secondExpectedStateText]).eql(secondExpectedState);
        });
    });

    describe('buildFinalSubmissionResult', () => {
        it('should return result with expected data given answers and passenger data', () => {
            const expectedEmail = 'test@ump.ump';
            const expectedEmailAddressText = 'email_address';
            const expectedFirstName = 'Rick';
            const expectedLastName = 'Sanchez';
            const expectedFirstNameText = 'passenger_1_first_name';
            const expectedLastNameText = 'passenger_1_last_name';
            const allAnswers: Answer[] = [
                {
                    order: 1,
                    text: expectedEmailAddressText,
                    answer: expectedEmail
                },
                {
                    order: 2,
                    text: expectedFirstNameText,
                    answer: expectedFirstName
                },
                {
                    order: 3,
                    text: expectedLastNameText,
                    answer: expectedLastName
                }
            ];
            const passengerData: any[] = [
                {
                    [expectedFirstNameText]: expectedFirstName,
                    [expectedLastNameText]: expectedLastName
                }
            ];

            const result = Utilities.buildFinalSubmissionResult(allAnswers, passengerData);
            const passenger = result.passenger_data[0];

            should(result[expectedEmailAddressText]).eql(expectedEmail);
            should(passenger[expectedFirstNameText]).eql(expectedFirstName);
            should(passenger[expectedLastNameText]).eql(expectedLastName);
        });
    });
});