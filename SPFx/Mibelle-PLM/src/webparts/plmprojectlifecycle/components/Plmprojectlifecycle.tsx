import * as React from 'react';
import type { IPlmprojectlifecycleProps } from './IPlmprojectlifecycleProps';
import ApplicationPhaseForm from './ApplicationPhaseForm';

export default class Plmprojectlifecycle extends React.Component<IPlmprojectlifecycleProps> {
  public render(): React.ReactElement<IPlmprojectlifecycleProps> {
    

    return (
     <ApplicationPhaseForm />
    );
  }
}
