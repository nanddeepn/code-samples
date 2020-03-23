declare interface ITreeViewWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TreeExpandTitle: string;
  TreeCollapseTitle: string;
}

declare module 'TreeViewWebPartStrings' {
  const strings: ITreeViewWebPartStrings;
  export = strings;
}
