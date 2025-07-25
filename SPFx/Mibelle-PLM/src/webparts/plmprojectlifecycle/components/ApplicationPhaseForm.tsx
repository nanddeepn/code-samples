import * as React from 'react';
import {
  TextField,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
  Stack,
  ProgressIndicator,
  Label,
  Checkbox
} from '@fluentui/react';

interface IApplicationPhaseFormState {
  projectName: string;
  description: string;
  goals: string;
  sku: string;
  currency: string;
  respons: string;
  team: string;
  step: number;
}

const currencyOptions: IDropdownOption[] = [
  { key: 'usd', text: 'USD' },
  { key: 'eur', text: 'EUR' },
  { key: 'inr', text: 'INR' }
];

const responsOptions: IDropdownOption[] = [
  { key: 'user1', text: 'User 1' },
  { key: 'user2', text: 'User 2' }
];

const teamOptions: IDropdownOption[] = [
  { key: 'teamA', text: 'Team A' },
  { key: 'teamB', text: 'Team B' }
];

export default class ApplicationPhaseForm extends React.Component<{}, IApplicationPhaseFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      projectName: '',
      description: '',
      goals: '',
      sku: '',
      currency: '',
      respons: '',
      team: '',
      step: 1
    };
  }

  private onTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string, field?: keyof IApplicationPhaseFormState): void => {
    if (field && newValue !== undefined) {
      this.setState({

      });
    }
  };

  private onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, field?: keyof IApplicationPhaseFormState): void => {
    if (field && option) {
      this.setState({

      });
    }
  };

  private onNext = (): void => {
    // Increment step (for now, placeholder)
    this.setState({ step: 2 });
  };

  private onSaveDraft = (): void => {
    console.log("Saved Draft:", this.state);
  };

  private onSubmit = (): void => {
    console.log("Submitted:", this.state);
  };

  render(): React.ReactNode {
    const { projectName, description, goals, sku, currency, respons, team, step } = this.state;
    const percentComplete = step / 4;

    return (
      <Stack tokens={{ childrenGap: 15 }} styles={{ root: { maxWidth: 600 } }}>
        <Label style={{ fontSize: 20, fontWeight: 'bold' }}>Application Phase</Label>

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Label>Application</Label>
          <Label disabled>Concept</Label>
          <Label disabled>Realisation</Label>
          <Label disabled>Closing</Label>
        </Stack>

        <TextField
          label="Project name"
          value={projectName}
          onChange={(e, val) => this.onTextChange(e, val, 'projectName')}
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e, val) => this.onTextChange(e, val, 'description')}
          multiline
          rows={4}
        />

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <TextField
            label="Goals"
            value={goals}
            onChange={(e, val) => this.onTextChange(e, val, 'goals')}
          />
          <TextField
            label="SKU"
            value={sku}
            onChange={(e, val) => this.onTextChange(e, val, 'sku')}
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Dropdown
            label="Currency"
            selectedKey={currency}
            options={currencyOptions}
            onChange={(e, opt) => this.onDropdownChange(e, opt, 'currency')}
          />
          <Dropdown
            label="Responσx" // as per screenshot typo
            selectedKey={respons}
            options={responsOptions}
            onChange={(e, opt) => this.onDropdownChange(e, opt, 'respons')}
          />
        </Stack>

        <Dropdown
          label="Responsible team"
          selectedKey={team}
          options={teamOptions}
          onChange={(e, opt) => this.onDropdownChange(e, opt, 'team')}
        />

        <Stack tokens={{ childrenGap: 10 }} style={{ marginTop: 10 }}>
          <Checkbox label="Please fill out all required fields" checked disabled />

          <ProgressIndicator
            label={`Step ${step} of 4`}
            percentComplete={percentComplete}
            barHeight={8}
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DefaultButton text="Save draft" onClick={this.onSaveDraft} />
          <PrimaryButton text="Next" onClick={this.onNext} />
          <DefaultButton text="Submit for approval" onClick={this.onSubmit} />
        </Stack>
      </Stack>
    );
  }
}
