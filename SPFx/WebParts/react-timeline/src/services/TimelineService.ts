import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { ITimelineActivity, ITimelineActivityCollection } from "../models";

export default class TimelineService {
    constructor(private context: WebPartContext) {
        // Setup context to PnPjs
        sp.setup({
            spfxContext: this.context
        });
    }

    public test(): void {
    }
}
