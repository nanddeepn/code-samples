// Represents attributes of timeline activity
export interface ITimelineActivity {
    id: number;
    acivityLink: string;
    acivityDate: Date;
    activityPictureUrl: string;
    activityDescription: string;
}

export interface ITimelineActivityCollection {
    value: ITimelineActivity[];
}