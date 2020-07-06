import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web, IItem } from "@pnp/sp/presets/all";
import { ITimelineActivity } from "../models";

export default class TimelineService {
    /**
     * Constructor
     * @param context 
     */
    constructor(private context: WebPartContext) {
        // Setup context to PnPjs
        sp.setup({
            spfxContext: this.context
        });
    }

    /**
     * Get timeline activity by id.
     * @param listTitle 
     * @param id 
     */
    public async getTimelineActivity(listTitle: string, id: number): Promise<ITimelineActivity> {
        let returnTimelineActivity: ITimelineActivity = undefined;

        try {
            let activity: any = await sp.web.lists.getByTitle(listTitle).items.usingCaching().getById(id)
                .select("Id", "Title", "SPFxTimelineLink", "SPFxTimelineDate", "SPFxTimelinePicture", "SPFxTimelineDescription")
                .get();

            returnTimelineActivity = {
                id: activity.ID,
                activityTitle: activity.Title,
                acivityLink: activity.SPFxTimelineLink,
                acivityDate: activity.SPFxTimelineDate,
                activityPictureUrl: activity.SPFxTimelinePicture,
                activityDescription: activity.SPFxTimelineDescription,
            };
        }
        catch (error) {
            return Promise.reject(error);
        }

        return returnTimelineActivity;
    }

    /**
     * Get all timeline activities
     * @param listTitle 
     * @param sortOrder 
     */
    public async getTimelineActivities(listTitle: string, sortOrder: string): Promise<ITimelineActivity[]> {
        let returnTimelineActivities: ITimelineActivity[] = [];
        let sortOrderAsc: boolean = (sortOrder === "asc");

        try {
            let activities: any[] = await sp.web.lists.getByTitle(listTitle).items
                .select("Id", "Title", "SPFxTimelineLink", "SPFxTimelineDate", "SPFxTimelinePicture", "SPFxTimelineDescription")
                .orderBy("SPFxTimelineDate", sortOrderAsc)
                .get();

            activities.forEach(activity => {
                let timelineActivity = {
                    id: activity.ID,
                    activityTitle: activity.Title,
                    acivityLink: activity.SPFxTimelineLink,
                    acivityDate: activity.SPFxTimelineDate,
                    activityPictureUrl: activity.SPFxTimelinePicture,
                    activityDescription: activity.SPFxTimelineDescription,
                };

                returnTimelineActivities.push(timelineActivity);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }

        return returnTimelineActivities;
    }

    /**
     * Adds timeline activity to SP list.
     * @param listTitle 
     * @param newTimelineActivity 
     */
    public async addTimelineActivity(listTitle: string, newTimelineActivity: ITimelineActivity) {
        try {
            let linkUrl = newTimelineActivity.acivityLink["Url"] ? newTimelineActivity.acivityLink["Url"] : newTimelineActivity.acivityLink;
            let picUrl = newTimelineActivity.activityPictureUrl["Url"] ? newTimelineActivity.activityPictureUrl["Url"] : newTimelineActivity.activityPictureUrl;

            await sp.web.lists.getByTitle(listTitle).items.add({
                Title: newTimelineActivity.activityTitle,             
                SPFxTimelineDate: newTimelineActivity.acivityDate,
                SPFxTimelinePicture: {
                    "__metadata": { type: "SP.FieldUrlValue" },
                    Description: newTimelineActivity.activityTitle,
                    Url: picUrl,
                },
                SPFxTimelineLink: {
                    "__metadata": { type: "SP.FieldUrlValue" },
                    Description: newTimelineActivity.activityTitle,
                    Url: linkUrl,
                },  
                SPFxTimelineDescription: newTimelineActivity.activityDescription
            });
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    /**
     * Updates timeline activity to SP list by id.
     * @param listTitle 
     * @param updateTimelineActivity 
     */
    public async updateTimelineActivity(listTitle: string, updateTimelineActivity: ITimelineActivity) {
        try {
            let linkUrl = updateTimelineActivity.acivityLink["Url"] ? updateTimelineActivity.acivityLink["Url"] : updateTimelineActivity.acivityLink;
            let picUrl = updateTimelineActivity.activityPictureUrl["Url"] ? updateTimelineActivity.activityPictureUrl["Url"] : updateTimelineActivity.activityPictureUrl;

            let updateItem: any = {
                Title: updateTimelineActivity.activityTitle,               
                SPFxTimelineDate: updateTimelineActivity.acivityDate,
                SPFxTimelinePicture: {
                    "__metadata": { type: "SP.FieldUrlValue" },
                    Description: updateTimelineActivity.activityTitle,
                    Url: picUrl,
                },
                SPFxTimelineLink: {
                    "__metadata": { type: "SP.FieldUrlValue" },
                    Description: updateTimelineActivity.activityTitle,
                    Url: linkUrl,
                },                
                SPFxTimelineDescription: updateTimelineActivity.activityDescription
            };

            await sp.web.lists.getByTitle(listTitle).items.getById(updateTimelineActivity.id).update(updateItem).then((value:any) => {
                console.log(value);               
            });
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    /**
     * Deletes timeline activity from SP list.
     * @param listTitle 
     * @param deleteTimelineActivity 
     */
    public async deleteTimelineActivity(listTitle: string, deleteTimelineActivity: ITimelineActivity) {
        try {
            await sp.web.lists.getByTitle(listTitle).items.getById(deleteTimelineActivity.id).delete();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}
