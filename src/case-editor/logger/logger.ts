export class Logger {
    static pretty = true;

    static warn = (msg: any) => {

        console.error(`\x1b[33m${Logger.prepocessMsg(msg)}\x1b[0m`);
    }

    static error = (msg: any) => {
        console.error(`\x1b[31m${Logger.prepocessMsg(msg)}\x1b[0m`);
    }

    static criticalError = (msg: any) => {
        console.error(`\x1b[41m${Logger.prepocessMsg(msg)}\x1b[0m`);
    }

    static success = (msg: any) => {
        console.log(`\x1b[32m${Logger.prepocessMsg(msg)}\x1b[0m`);
    }

    static log = (msg: any) => {
        console.log(`${Logger.prepocessMsg(msg)}`);
    }

    private static prepocessMsg(msg: any) {
        if (typeof (msg) === 'object') {
            return JSON.stringify(msg, undefined, Logger.pretty ? 2 : undefined)
        }
        return msg;
    }
}
