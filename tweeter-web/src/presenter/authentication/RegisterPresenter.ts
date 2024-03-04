import { AuthenticatePresenter, AuthenticateView } from "./AuthenticatePresenter";
import { Buffer } from "buffer";

export class RegisterPresenter extends AuthenticatePresenter {
    constructor(view: AuthenticateView) {
        super(view);
    }

    public async doRegister(alias: string, password: string, firstName: string, lastName: string, imageBytes: Uint8Array) {
        this.doAuthenticationOperation(
            async () => { return this.service.register(firstName, lastName, alias, password, imageBytes) },
            "register user",
            undefined);
    };

    protected navigateTo(): void {
        this.view.navigate("/");
    }

    public handleImageFile(file: File | undefined, imageURL: string, imageBytes: Uint8Array){
        if (file) {
          imageURL = URL.createObjectURL(file);
    
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const imageStringBase64 = event.target?.result as string;
    
            // Remove unnecessary file metadata from the start of the string.
            const imageStringBase64BufferContents =
              imageStringBase64.split("base64,")[1];
    
            const bytes: Uint8Array = Buffer.from(
              imageStringBase64BufferContents,
              "base64"
            );
    
            imageBytes = bytes;
          };
          reader.readAsDataURL(file);
        } else {
          imageURL = "";
          imageBytes = new Uint8Array();
        }
      };

}