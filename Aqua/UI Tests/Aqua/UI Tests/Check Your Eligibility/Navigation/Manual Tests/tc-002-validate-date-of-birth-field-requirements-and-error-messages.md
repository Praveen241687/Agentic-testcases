# TC-002 — Validate Date of Birth field requirements and error messages

**Priority:** HIGH

## Preconditions
Navigate to the ‘Check your eligibility’ form

## Steps
1. Attempt to submit the form without entering a Date of Birth
2. Verify that an error message 'Please provide a valid day/Please provide a valid month/Please provide a valid year' is displayed
3. Enter the following Date of Birth values and verify the stated outcome for each: ['12-12-2000 → Accepted'], ['12-12-200 → Invalid format error'], ['12-13-2000 → Invalid format error'], ['20-02-2000a → Invalid format error'], ['30-02-2000 → Invalid format error'], ['00-02-2000 → Invalid format error']

## Expected Result
The Date of Birth field is mandatory, accepts only digits in the format DD-MM-YYYY, and displays specific error messages for invalid inputs.
