const OPERATORS = "plus|minus|multiplied by|times|to the power of";
const EXPRESSION = new RegExp(
  `-?\\d+(?:\\s+(?:${OPERATORS})\\s+-?\\d+)+`,
  "i"
);

// Evaluates e.g. "2 plus 3 multiplied by 4" with normal precedence:
// power, then multiplication, then addition/subtraction.
function evaluate(expression: string): string {
  const tokens = expression
    .toLowerCase()
    .replace(/multiplied by|times/g, "*")
    .replace(/to the power of/g, "^")
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .match(/-?\d+|[+\-*^]/g) || [];

  // Rebuild alternating number/operator lists (a leading "-" on a number
  // directly after an operator belongs to the number).
  const values: bigint[] = [];
  const ops: string[] = [];
  let expectNumber = true;
  for (const token of tokens) {
    if (expectNumber) {
      values.push(BigInt(token));
      expectNumber = false;
    } else if (/^-\d+$/.test(token)) {
      ops.push("-");
      values.push(BigInt(token.slice(1)));
    } else {
      ops.push(token);
      expectNumber = true;
    }
  }

  const reduce = (symbols: string[], apply: (a: bigint, b: bigint, op: string) => bigint) => {
    for (let i = 0; i < ops.length; ) {
      if (symbols.includes(ops[i])) {
        values.splice(i, 2, apply(values[i], values[i + 1], ops[i]));
        ops.splice(i, 1);
      } else {
        i++;
      }
    }
  };
  reduce(["^"], (a, b) => {
    let result = BigInt(1);
    for (let i = BigInt(0); i < b; i++) result *= a;
    return result;
  });
  reduce(["*"], (a, b) => a * b);
  reduce(["+", "-"], (a, b, op) => (op === "+" ? a + b : a - b));
  return values[0].toString();
}

function listAfterColon(query: string): number[] {
  const list = query.slice(query.lastIndexOf(":") + 1);
  return (list.match(/-?\d+/g) || []).map(Number);
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function QueryProcessor(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lower.includes("andrew id")) {
    return "sangyoon";
  }

  if (lower.includes("largest")) {
    return Math.max(...listAfterColon(query)).toString();
  }

  if (lower.includes("smallest")) {
    return Math.min(...listAfterColon(query)).toString();
  }

  if (lower.includes("square and a cube")) {
    return listAfterColon(query)
      .filter((n) => Math.round(Math.cbrt(n)) ** 3 === n && Math.round(Math.sqrt(n)) ** 2 === n)
      .join(", ");
  }

  if (lower.includes("prime")) {
    return listAfterColon(query).filter(isPrime).join(", ");
  }

  const anagram = lower.match(/anagram of (\w+):\s*(.+)/);
  if (anagram) {
    const sortLetters = (word: string) => word.split("").sort().join("");
    const target = sortLetters(anagram[1]);
    return anagram[2]
      .split(/[,\s?]+/)
      .filter((word) => word && word !== anagram[1] && sortLetters(word) === target)
      .join(", ");
  }

  const expression = query.match(EXPRESSION);
  if (expression) {
    return evaluate(expression[0]);
  }

  if (lower.includes("your name")) {
    return "asdf";
  }

  if (lower.includes("your age") || lower.includes("how old")) {
    return "67";
  }

  return "";
}
