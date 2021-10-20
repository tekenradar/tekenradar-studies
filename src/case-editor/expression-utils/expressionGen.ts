import { Expression, ExpressionName } from "survey-engine/lib/data_types"


export const generateExpression = (name: ExpressionName,
    returnType?: 'string' | 'float',
    ...args: any[]): Expression => {
    return {
        name: name,
        returnType: returnType,
        data: args.filter(a => a !== undefined).map(arg => {
            if (typeof (arg) === 'string') {
                return {
                    dtype: 'str',
                    str: arg
                }
            } else if (typeof (arg) === 'number') {
                return {
                    dtype: 'num',
                    num: arg
                }
            }
            return {
                dtype: 'exp',
                exp: arg as Expression
            }
        })
    }
}