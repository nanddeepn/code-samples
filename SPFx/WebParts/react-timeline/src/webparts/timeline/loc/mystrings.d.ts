declare interface ITimelineWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
  LayoutFieldLabel: string;
  PositionFieldLabel: string;
}

declare module 'TimelineWebPartStrings' {
  const strings: ITimelineWebPartStrings;
  export = strings;
}
