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