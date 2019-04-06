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
                    id: expectedId1
                },
                {
                    id: expectedId2
                }
            ];

            const result = Utilities.processFormSubmissions(submissions);

            should(result[0].id).eql(expectedId1);
            should(result[1].id).eql(expectedId2);
        });
    });

    describe('processAnswerResponses', () => {
        it('should return expected form submission answers', () => {
            const expectedName2 = "email11";
            const expectedOrder2 = 26;
            const expectedText2 = "E-mail";
            const expectedType2 = "control_email";
            const expectedAnswer2 = "teset@ump.ump";
            const submission: FormSubmission =
            {
                "id": 4298733848221547651,
                "form_id": 90896763718172,
                "answers": {
                    "7": {
                        "name": expectedName2,
                        "order": expectedOrder2,
                        "text": expectedText2,
                        "type": expectedType2,
                        "answer": expectedAnswer2
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
                "id": 4298733848221547651,
                "form_id": 90896763718172,
                "answers": {
                    1: goodAnswerResponse,
                    7: badAnswerResponse
                }
            };

            const result: Answer[] = Utilities.processAnswerResponses(submission);

            should(result.length).eql(1);
        });
    });

    describe('processAnswerResponse', () => {
        it('should return expected email address given control_email type', () => {
            const expectedText = 'E-mail';
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
            const expectedText = 'Phone Number';
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
            const expectedText = 'Passenger 1 Birth Date';
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
            const expectedText = 'Departure Date/Time';
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
});

const submissionData = [
    {
        "id": "4298733848221547651",
        "form_id": "90896763718172",
        "ip": "64.85.193.228",
        "created_at": "2019-03-31 16:29:44",
        "status": "ACTIVE",
        "new": "1",
        "flag": "0",
        "notes": "",
        "updated_at": null,
        "answers": {
            "1": {
                "name": "txMusic",
                "order": "1",
                "text": "TX Music Takeover MexiKOE Getaway Booking Form",
                "type": "control_head"
            },
            "7": {
                "name": "clickTo7",
                "order": "19",
                "text": "Passsenger Information",
                "type": "control_head"
            },
            "11": {
                "name": "email11",
                "order": "26",
                "text": "E-mail",
                "type": "control_email",
                "answer": "test@ump.ump"
            },
            "12": {
                "name": "phoneNumber12",
                "order": "27",
                "sublabels": "{\"country\":\"Country Code\",\"area\":\"Area Code\",\"phone\":\"Phone Number\",\"full\":\"Phone Number\",\"masked\":\"\"}",
                "text": "Phone Number",
                "type": "control_phone",
                "answer": {
                    "area": "214",
                    "phone": "5434999"
                },
                "prettyFormat": "(214) 5434999"
            },
            "13": {
                "name": "passenger113",
                "order": "25",
                "sublabels": "{\"month\":\"Month\",\"day\":\"Day\",\"year\":\"Year\"}",
                "text": "Passenger 1 Birth Date",
                "type": "control_birthdate",
                "answer": {
                    "month": "January",
                    "day": "1",
                    "year": "1967"
                },
                "prettyFormat": "January 1 1967"
            },
            "14": {
                "name": "passenger114",
                "order": "33",
                "text": "Passenger 1 Passport Number",
                "type": "control_textbox",
                "answer": "112233445566"
            },
            "17": {
                "name": "passenger117",
                "order": "36",
                "text": "Passenger 1 Frequent Flyer Number",
                "type": "control_textbox",
                "answer": "987654321f"
            },
            "19": {
                "name": "clickTo19",
                "order": "20",
                "text": "Passenger #1",
                "type": "control_head"
            },
            "23": {
                "name": "passenger223",
                "order": "45",
                "sublabels": "{\"month\":\"Month\",\"day\":\"Day\",\"year\":\"Year\"}",
                "text": "Passenger 2 Birth Date",
                "type": "control_birthdate",
                "answer": {
                    "month": "January",
                    "day": "1",
                    "year": "1934"
                },
                "prettyFormat": "January 1 1934"
            },
            "24": {
                "name": "passenger224",
                "order": "46",
                "text": "Passenger 2 Passport Number",
                "type": "control_textbox",
                "answer": "9988776655"
            },
            "26": {
                "name": "passenger226",
                "order": "49",
                "text": "Passenger 2 Frequent Flyer Number",
                "type": "control_textbox",
                "answer": "55775566t"
            },
            "54": {
                "name": "additionalInformation54",
                "order": "66",
                "text": "Additional Information",
                "type": "control_textarea",
                "answer": "some additional information"
            },
            "55": {
                "name": "submitForm55",
                "order": "67",
                "text": "Submit Form",
                "type": "control_button"
            },
            "56": {
                "name": "wouldYou56",
                "order": "4",
                "text": "Would you like us to quote you on travel insurance?",
                "type": "control_dropdown",
                "answer": "Yes"
            },
            "57": {
                "name": "airlineClass",
                "order": "15",
                "text": "Airline Class of Service",
                "type": "control_dropdown",
                "answer": "Coach"
            },
            "71": {
                "name": "departureDatetime",
                "order": "7",
                "sublabels": "{\"day\":\"Day\",\"month\":\"Month\",\"year\":\"Year\",\"last\":\"Last Name\",\"hour\":\"Hour\",\"minutes\":\"Minutes\",\"litemode\":\"Date\"}",
                "text": "Departure Date/Time",
                "type": "control_datetime",
                "answer": {
                    "month": "04",
                    "day": "01",
                    "year": "2019",
                    "hour": "1",
                    "min": "00",
                    "ampm": "AM"
                },
                "prettyFormat": "04-01-2019 1:00 AM"
            },
            "72": {
                "name": "returnDatetime",
                "order": "11",
                "sublabels": "{\"day\":\"Day\",\"month\":\"Month\",\"year\":\"Year\",\"last\":\"Last Name\",\"hour\":\"Hour\",\"minutes\":\"Minutes\",\"litemode\":\"Date\"}",
                "text": "Return Date/Time",
                "type": "control_datetime",
                "answer": {
                    "month": "04",
                    "day": "05",
                    "year": "2019",
                    "hour": "1",
                    "min": "00",
                    "ampm": "AM"
                },
                "prettyFormat": "04-05-2019 1:00 AM"
            },
            "80": {
                "name": "passenger180",
                "order": "34",
                "sublabels": "{\"day\":\"Day\",\"month\":\"Month\",\"year\":\"Year\",\"last\":\"Last Name\",\"hour\":\"Hour\",\"minutes\":\"Minutes\",\"litemode\":\"Date\"}",
                "text": "Passenger 1 Passport Expiration Date",
                "type": "control_datetime",
                "answer": {
                    "month": "04",
                    "day": "08",
                    "year": "2019"
                },
                "prettyFormat": "04-08-2019"
            },
            "81": {
                "name": "passenger281",
                "order": "47",
                "sublabels": "{\"day\":\"Day\",\"month\":\"Month\",\"year\":\"Year\",\"last\":\"Last Name\",\"hour\":\"Hour\",\"minutes\":\"Minutes\",\"litemode\":\"Date\"}",
                "text": "Passenger 2 Passport Expiration Date",
                "type": "control_datetime",
                "answer": {
                    "month": "04",
                    "day": "08",
                    "year": "2019"
                },
                "prettyFormat": "04-08-2019"
            },
            "96": {
                "name": "passenger196",
                "order": "37",
                "text": "Passenger 1 TSA Pre-Check Number",
                "type": "control_textbox",
                "answer": "t123456789"
            },
            "97": {
                "name": "passenger197",
                "order": "38",
                "text": "Passenger 1 Global Entry Number",
                "type": "control_textbox",
                "answer": "987654321g"
            },
            "98": {
                "name": "passenger298",
                "order": "50",
                "text": "Passenger 2 TSA Pre-Check Number",
                "type": "control_textbox",
                "answer": "t88551118"
            },
            "99": {
                "name": "passenger299",
                "order": "51",
                "text": "Passenger 2 Global Entry Number",
                "type": "control_textbox",
                "answer": "g5588899"
            },
            "111": {
                "name": "numberOf",
                "order": "2",
                "text": "Number of Passengers",
                "type": "control_dropdown",
                "answer": "2"
            },
            "112": {
                "name": "passenger1112",
                "order": "24",
                "text": "Passenger 1 Gender",
                "type": "control_radio",
                "answer": "Male"
            },
            "113": {
                "name": "passenger2113",
                "order": "44",
                "text": "Passenger 2 Gender",
                "type": "control_radio",
                "answer": "Male"
            },
            "114": {
                "name": "passenger2114",
                "order": "48",
                "text": "Passenger 2 Are you a U.S. citizen",
                "type": "control_radio",
                "answer": "Yes"
            },
            "115": {
                "name": "passenger1115",
                "order": "35",
                "text": "Passenger 1 Are you a U.S. citizen",
                "type": "control_radio",
                "answer": "Yes"
            },
            "116": {
                "name": "passenger1116",
                "order": "39",
                "text": "Passenger 1 Flight Seating Preference",
                "type": "control_dropdown",
                "answer": "Window"
            },
            "117": {
                "name": "passenger2117",
                "order": "52",
                "text": "Passenger 2 Flight Seating Preference",
                "type": "control_dropdown",
                "answer": "Window"
            },
            "118": {
                "name": "clickTo118",
                "order": "53",
                "text": "Passenger #3",
                "type": "control_head"
            },
            "120": {
                "name": "passenger3120",
                "order": "57",
                "text": "Passenger 3 Gender",
                "type": "control_radio",
                "answer": ""
            },
            "121": {
                "name": "passenger3121",
                "order": "58",
                "sublabels": "{\"month\":\"Month\",\"day\":\"Day\",\"year\":\"Year\"}",
                "text": "Passenger 3 Birth Date",
                "type": "control_birthdate",
                "answer": {
                    "month": "",
                    "day": "",
                    "year": ""
                },
                "prettyFormat": "  "
            },
            "122": {
                "name": "passenger3122",
                "order": "59",
                "text": "Passenger 3 Passport Number",
                "type": "control_textbox",
                "answer": ""
            },
            "123": {
                "name": "passenger3123",
                "order": "60",
                "sublabels": "{\"day\":\"Day\",\"month\":\"Month\",\"year\":\"Year\",\"last\":\"Last Name\",\"hour\":\"Hour\",\"minutes\":\"Minutes\",\"litemode\":\"Date\"}",
                "text": "Passenger 3 Passport Expiration Date",
                "type": "control_datetime",
                "answer": {
                    "month": "",
                    "day": "",
                    "year": ""
                },
                "prettyFormat": ""
            },
            "124": {
                "name": "passenger3124",
                "order": "61",
                "text": "Passenger 3 Are you a U.S. citizen",
                "type": "control_radio",
                "answer": ""
            },
            "125": {
                "name": "passenger3125",
                "order": "62",
                "text": "Passenger 3 Frequent Flyer Number",
                "type": "control_textbox",
                "answer": ""
            },
            "127": {
                "name": "passenger3127",
                "order": "63",
                "text": "Passenger 3 TSA Pre-Check Number",
                "type": "control_textbox",
                "answer": ""
            },
            "128": {
                "name": "passenger3128",
                "order": "64",
                "text": "Passenger 3 Global Entry Number",
                "type": "control_textbox",
                "answer": ""
            },
            "165": {
                "name": "passenger3165",
                "order": "65",
                "text": "Passenger 3 Flight Seating Preference",
                "type": "control_dropdown",
                "answer": ""
            },
            "166": {
                "name": "clickTo166",
                "order": "40",
                "text": "Passenger #2",
                "type": "control_head"
            },
            "168": {
                "name": "wouldYou",
                "order": "3",
                "text": "Would you like to book your trip with air?",
                "type": "control_radio",
                "answer": "Yes"
            },
            "169": {
                "name": "departureFlight",
                "order": "10",
                "text": "Departure Flight Number",
                "type": "control_textbox",
                "answer": "AA1122"
            },
            "170": {
                "name": "returnFlight",
                "order": "13",
                "text": "Return Flight Number",
                "type": "control_textbox",
                "answer": "AA3344"
            },
            "171": {
                "name": "departureAirline171",
                "order": "9",
                "text": "Departure Airline",
                "type": "control_textbox",
                "answer": "American Airlines"
            },
            "172": {
                "name": "returnAirline",
                "order": "12",
                "text": "Return Airline",
                "type": "control_textbox",
                "answer": "American Airlines"
            },
            "173": {
                "name": "heading",
                "order": "6",
                "text": "Flight Information",
                "type": "control_head"
            },
            "174": {
                "name": "heading174",
                "order": "16",
                "text": "Hotel Information",
                "type": "control_head"
            },
            "175": {
                "name": "whichRoom",
                "order": "17",
                "text": "Which room category would you like?",
                "type": "control_dropdown",
                "answer": "Luxury Jr Suite"
            },
            "177": {
                "name": "beddingPreference",
                "order": "18",
                "text": "Bedding Preference",
                "type": "control_dropdown",
                "answer": "King"
            },
            "184": {
                "name": "typeOf",
                "order": "5",
                "text": "Type of Transfers",
                "type": "control_dropdown",
                "answer": "Non-Stop Shared -$58 per person"
            },
            "261": {
                "name": "departureCity",
                "order": "8",
                "text": "Departure City",
                "type": "control_textbox",
                "answer": "COLUMBIA"
            },
            "262": {
                "name": "returnCity",
                "order": "14",
                "text": "Return City",
                "type": "control_textbox",
                "answer": "COLUMBIA"
            },
            "263": {
                "name": "passenger1",
                "order": "21",
                "text": "Passenger 1 First Name",
                "type": "control_textbox",
                "answer": "Skye"
            },
            "264": {
                "name": "passenger1264",
                "order": "22",
                "text": "Passenger 1 Middle Name",
                "type": "control_textbox",
                "answer": "Barton"
            },
            "265": {
                "name": "passenger1265",
                "order": "23",
                "text": "Passenger 1 Last Name",
                "type": "control_textbox",
                "answer": "Griffin"
            },
            "266": {
                "name": "streetAddress",
                "order": "28",
                "text": "Street Address",
                "type": "control_textbox",
                "answer": "2009 Ammonette Street"
            },
            "267": {
                "name": "streetAddress267",
                "order": "29",
                "text": "Street Address 2",
                "type": "control_textbox",
                "answer": ""
            },
            "268": {
                "name": "city",
                "order": "30",
                "text": "City",
                "type": "control_textbox",
                "answer": "COLUMBIA"
            },
            "269": {
                "name": "state",
                "order": "31",
                "text": "State",
                "type": "control_dropdown",
                "answer": "MO"
            },
            "270": {
                "name": "zipCode",
                "order": "32",
                "text": "Zip Code",
                "type": "control_textbox",
                "answer": "65201"
            },
            "271": {
                "name": "passenger2",
                "order": "41",
                "text": "Passenger 2 First Name",
                "type": "control_textbox",
                "answer": "Max"
            },
            "272": {
                "name": "passenger2272",
                "order": "42",
                "text": "Passenger 2 Middle Name",
                "type": "control_textbox",
                "answer": ""
            },
            "273": {
                "name": "passenger2273",
                "order": "43",
                "text": "Passenger 2 Last Name",
                "type": "control_textbox",
                "answer": "Griffin"
            },
            "274": {
                "name": "passenger3",
                "order": "54",
                "text": "Passenger 3 First Name",
                "type": "control_textbox",
                "answer": ""
            },
            "275": {
                "name": "passenger3275",
                "order": "55",
                "text": "Passenger 3 Middle Name",
                "type": "control_textbox",
                "answer": ""
            },
            "276": {
                "name": "passenger3276",
                "order": "56",
                "text": "Passenger 3 Last Name",
                "type": "control_textbox",
                "answer": ""
            }
        }
    }
];