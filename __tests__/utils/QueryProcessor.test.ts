import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "asdf"
          ));
    })

    test('should return andrew id', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "sangyoon"
          ));
    })

    test('should return largest number', () => {
        const query = "Which of the following numbers is the largest: 11, 13, 75?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "75"
          ));
    })

    test('should return sum', () => {
        const query = "What is 12 plus 45?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "57"
          ));
    })

    test('should ignore id prefix in math queries', () => {
        expect(QueryProcessor("a1b2c3: What is 87 plus 19?")).toBe("106");
        expect(QueryProcessor("9f8e: Which of the following numbers is the largest: 45, 43, 19?")).toBe("45");
    })
});
describe("QueryProcessor math", () => {
    test.each([
        ["What is 87 minus 19?", "68"],
        ["What is 7 multiplied by 6?", "42"],
        ["What is 2 plus 3 multiplied by 4?", "14"],
        ["What is 2 to the power of 70?", "1180591620717411303424"],
        ["What is 5 minus 9 plus 1?", "-3"],
        ["Which of the following numbers is both a square and a cube: 64, 12, 729, 100?", "64, 729"],
        ["Which of the following numbers are primes: 7, 10, 13, 1?", "7, 13"],
        ["What is the average of something?", ""],
    ])("%s", (query, expected) => {
        expect(QueryProcessor(query)).toBe(expected);
    });
});
