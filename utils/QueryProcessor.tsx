export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "sangyoon";
  }

  const largestMatch = query.match(/largest:\s*([-\d,\s]+)/i);
  if (largestMatch) {
    const numbers = (largestMatch[1].match(/-?\d+/g) || []).map(Number);
    if (numbers.length > 0) {
      return Math.max(...numbers).toString();
    }
  }

  const plusMatch = query.match(/(-?\d+(?:\s+plus\s+-?\d+)+)/i);
  if (plusMatch) {
    const numbers = (plusMatch[1].match(/-?\d+/g) || []).map(Number);
    return numbers.reduce((a, b) => a + b, 0).toString();
  }

  if (query.toLowerCase().includes("name")) {
    return "asdf";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }



  return "";
}
