import * as React from 'react';
import styles from './Header.module.scss';
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IHeaderProps {
    context: ApplicationCustomizerContext;
}

export class Header extends React.Component<IHeaderProps, {}> {
    constructor(props: IHeaderProps) {
        super(props);

        this.state = {
            panelOpen: false
        };
    }

    public componentWillUnmount() {
        console.log('Unmounting the header component.');
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div className={styles.header}>
                <span>Current page:{this.props.context.pageContext.legacyPageContext.serverRequestPath}</span>
            </div>
        );
    }
}