import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";
import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

export class FileUploadService {
    private _sp: SPFI;
    public context: AdaptiveCardExtensionContext;

    public setup(context: AdaptiveCardExtensionContext): void {
        if (!this._sp && typeof context !== "undefined") {
            this._sp = spfi().using(SPFx(context));
            this.context = context;
        }
    }

    public async UploadFile(fileName: string, content: string): Promise<void> {
        const base64Response = await fetch(content);
        const myblob = await base64Response.blob();

        await this._sp.web
            .getFolderByServerRelativePath("Shared Documents")
            .files
            .addChunked(fileName, myblob, undefined, true);
    }
}

const FileService: FileUploadService = new FileUploadService();
export default FileService;