import * as React from 'react';
import styles from './ParentChildCall.module.scss';
import { IParentChildCallProps } from './IParentChildCallProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, Label, PrimaryButton } from 'office-ui-fabric-react';

export interface IChildProps {
    childTitle: string;
    parentCallback: (childData: string) => void;
}

export interface IChildState {
    Title: string;
}

export default class Child extends React.Component<IChildProps, IChildState> {
    constructor(props: IChildProps) {
        super(props);

        this.state = {
            Title: ""
        };

        // Bind control events
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    public render(): React.ReactElement<IChildProps> {
        const { Title } = this.state;

        return (
            <div className={styles.parentChildCall}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Child Component</span>
                            <p className={styles.description}>Data from Parent: {escape(this.props.childTitle)}</p>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField
                                label="Title"
                                required
                                value={Title}
                                onChange={this.onTitleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <PrimaryButton
                                onClick={this.onSave}>
                                Send to Parent
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onTitleChange = (ev: any, newText: string): void => {
        this.setState({ Title: newText });
    }

    private onSave(): void {
        this.props.parentCallback("Hello " + this.state.Title);
    }
}
