export interface View {
    displayErrorMessage: (message: string) => void,
}

export interface MessageInfoView {
    //displayErrorMessage: (message: string) => void,
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string | undefined) => void;
    clearLastInfoMessage: () => void;
}

export class Presenter {
    private _view: View;

    public constructor(view: View){
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    protected async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string): Promise<void> {
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to ${operationDescription} because of exception: ${error}`
            );
        }
    };
}