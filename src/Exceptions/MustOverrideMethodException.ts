export class MustOverrideMethodException extends Error {
    public constructor(methodName: string = '-') {
        const message: string = 'Must override this method (' + methodName + ').';
        super(message);
    }
}