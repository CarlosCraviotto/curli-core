export class MustOverrideMethodException extends Error {

    public constructor (methodName = '-') {
        const message: string = 'Must override this method (' + methodName + ').';
        super(message);
    }

}
