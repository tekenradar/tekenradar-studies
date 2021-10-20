import { Expression, ExpressionArg } from "survey-engine/lib/data_types";


export const isExpression = (value: Expression | any): value is Expression => {
    return typeof (value) === 'object' && (value as Expression).name !== undefined && (value as Expression).name.length > 0;
}

export type ExpressionArgDType = 'exp' | 'num' | 'str';


export const expressionArgParser = (arg: ExpressionArg): any => {
    switch (arg.dtype) {
        case 'num':
            return arg.num;
        case 'str':
            return arg.str;
        case 'exp':
            return arg.exp;
        default:
            return arg.str;
    }
}