import * as React from 'react';
import styles from './FluentUiCheckbox.module.scss';
import { IFluentUiCheckboxProps } from './IFluentUiCheckboxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICheckboxInput } from './ICheckboxInput';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const options: ICheckboxInput[] = [
  { ID: 1, Title: 'Apple' },
  { ID: 2, Title: 'Banana' },
  { ID: 3, Title: 'Fig' },
  { ID: 4, Title: 'Grape' },
  { ID: 5, Title: 'Kiwi' },
  { ID: 6, Title: 'Melon' },
  { ID: 7, Title: 'Orange' },
  { ID: 8, Title: 'Pineapple' }
];

// Used to add spacing between checkboxes
const stackTokens = { childrenGap: 10 };

export default class FluentUiCheckbox extends React.Component<IFluentUiCheckboxProps, {}> {
  public render(): React.ReactElement<IFluentUiCheckboxProps> {
    return (
      <div className={styles.fluentUiCheckbox}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Fluent UI Checkbox</span>
              {
                options.map((checkBoxItem: ICheckboxInput) => {
                  return (
                    <Stack tokens={stackTokens}>
                      <Checkbox label={checkBoxItem.Title} title={checkBoxItem.Title} onChange={this._onChange} />
                      <span></span>
                    </Stack>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _onChange(ev: React.FormEvent<HTMLInputElement>, isChecked: boolean) {
    console.log(`The option ${ev.currentTarget.title} has been changed to ${isChecked}.`);
  }
}
