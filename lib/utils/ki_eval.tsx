type OperatorFunction = (a: number, b: number) => boolean;

// Supported binary comparison operators
const operators: Record<string, OperatorFunction> = {
    "Gt": (a, b) => a > b,
    "Lt": (a, b) => a < b,
    "Eq": (a, b) => a === b,
    "NotEq": (a, b) => a !== b,
    "GtE": (a, b) => a >= b,
    "LtE": (a, b) => a <= b,
};

function parseOperator(op: string): OperatorFunction {
    switch (op) {
        case ">": return operators["Gt"];
        case "<": return operators["Lt"];
        case "==": return operators["Eq"];
        case "!=": return operators["NotEq"];
        case ">=": return operators["GtE"];
        case "<=": return operators["LtE"];
        default:
            throw new Error(`Unsupported operator: ${op}`);
    }
}

/**
 * Safely evaluate a comparison expression with 'N' as a variable.
 * Supports chained comparisons like "3 < N > 5".
 *
 * @param expr A string containing a comparison expression.
 * @param value A numeric value to substitute for 'N'.
 * @returns True if the expression evaluates to True, else False.
 */

export function safeEval(expr: string, value: number) {
    try {
        // Tokenize the expression into parts
        const tokens = expr.match(/[^\s<>!=]+|[<>!=]=?|==/g);

        if (!tokens || tokens.length < 3 || tokens.length % 2 === 0) {
            return false
        }

        // Resolve operand value
        const resolveOperand = (token: string): number => {
            if (token === "N") {
                return value;
            } else if (!isNaN(Number(token))) {
                return Number(token);
            } else {
                return 0
            }
        };

        let leftValue = resolveOperand(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operatorToken = tokens[i];
            const rightToken = tokens[i + 1];

            const rightValue = resolveOperand(rightToken);
            const opFunc = parseOperator(operatorToken);

            if (!opFunc(leftValue, rightValue)) {
                return false; // Short-circuit on failure
            }

            leftValue = rightValue; // for chained comparison
        }

        return true;
    } catch {
       return false
    }
}
