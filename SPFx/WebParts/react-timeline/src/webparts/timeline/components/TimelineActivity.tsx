import * as React from 'react';
import styles from './Timeline.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITimelineActivity } from "../../../models";
import { Card,  ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights } from '@uifabric/styling';
import { Icon, IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles } from 'office-ui-fabric-react';
import {ContextualMenuItemType} from 'office-ui-fabric-react/lib/ContextualMenu';
import { Layer, IconButton, IButtonProps } from 'office-ui-fabric-react';
export interface IActivityProps {
    activity: ITimelineActivity;
}



export default class TimelineActivity extends React.Component<IActivityProps,{}> {
     
   
    public render(): React.ReactElement<IActivityProps> {
       
        const siteTextStyles: ITextStyles = {
        root: {
            color: '#025F52',
            fontWeight: FontWeights.semibold,
        },
    };
        
        const descriptionTextStyles: ITextStyles = {
            root: {
                color: '#333333',
                fontWeight: FontWeights.regular,
            },
        };
        const helpfulTextStyles: ITextStyles = {
            root: {
                color: '#333333',
                fontWeight: FontWeights.regular,
            },
        };
        const iconStyles: IIconStyles = {
            root: {
                color: '#0078D4',
                fontSize: 16,
                fontWeight: FontWeights.regular,
            },
        };
        const footerCardSectionStyles: ICardSectionStyles = {
            root: {
                alignSelf: 'stretch',
                borderLeft: '1px solid #F3F2F1',
            },
        };

        const sectionStackTokens: IStackTokens = { childrenGap: 20 };
        const cardTokens: ICardTokens = { childrenMargin: 12 };
        const footerCardSectionTokens: ICardSectionTokens = { padding: '0px 0px 0px 12px' };

        const { activity } = this.props;
        
        return (
            <Stack tokens={sectionStackTokens}>
                <p></p>

                <Card aria-label="Clickable horizontal card " horizontal 
                  
                   tokens={cardTokens}>
                    <IconButton id='ContextualMenuButton1'                      
                        text=''
                        width='30'
                        split={false}
                        iconProps={{ iconName: 'MoreVertical' }}
                        style={{float:"right"}}
                        menuIconProps={{ iconName: '' }}
                        menuProps={{
                            shouldFocusOnMount: true,
                            items: [
                                {
                                    key: 'Edit',
                                    name: 'Edit',
                                    onClick: () => console.log('Edit Item ID'+activity.id)
                                },
                                {
                                    key: 'divider_1',
                                    itemType: ContextualMenuItemType.Divider
                                },
                                {
                                    key: 'Delete',
                                    name: 'Delete',
                                    onClick: () => console.log('Delete Item ID' + activity.id) 
                                 }                             
                            ]
                        }} />
                    <Card.Item fill>
                        <Image src="https://placehold.it/180x135" alt="Placeholder image." />
                    </Card.Item>
                    <Card.Section>
                        <Text variant="small" styles={siteTextStyles}>
                            {
                                activity.acivityLink ? <a href={activity.acivityLink} target="_blank">{activity.activityTitle}</a> : activity.activityTitle
                            }
                        </Text>
                        <Text styles={descriptionTextStyles}>                            
                            {activity.activityDescription}
                        </Text>
                        <Text variant="small" styles={helpfulTextStyles}>                            
                            {activity.acivityDate}
                        </Text>
                    </Card.Section>
                    <Card.Section styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>                       
                        <Icon iconName="MoreVertical" styles={iconStyles} />
                    </Card.Section>
                </Card>
               
            </Stack>
        );
    }

   

  

   
}
