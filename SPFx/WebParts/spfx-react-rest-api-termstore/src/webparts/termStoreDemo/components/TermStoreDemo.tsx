import * as React from 'react';
import styles from './TermStoreDemo.module.scss';
import { ITermStoreDemoProps } from './ITermStoreDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { CompoundButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
// @pnp/sp imports  
import { sp } from "@pnp/sp";
import "@pnp/sp/taxonomy";
import { ITermStoreInfo } from "@pnp/sp/taxonomy";
import { ITermGroupInfo } from "@pnp/sp/taxonomy";
import { ITermSetInfo } from "@pnp/sp/taxonomy";
import { ITermInfo } from "@pnp/sp/taxonomy";

//https://github.com/pnp/pnpjs/blob/f9ebea90f25d369d771ada99723e66000e88d41b/docs/sp/taxonomy.md

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };



export default class TermStoreDemo extends React.Component<ITermStoreDemoProps, {}> {

  public render(): React.ReactElement<ITermStoreDemoProps> {

    return (
      <div className={styles.termStoreDemo}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>SharePoint REST API v2 (TermStore)</p>

              <Separator />
              <p className={styles.description}>Term Store</p>
              <Stack horizontal tokens={stackTokens}>
                <CompoundButton id="accessTermStoreData" secondaryText="Access term store data" onClick={this.accessTermStoreData}>
                  Term Store
                </CompoundButton>
              </Stack>

              <Separator />
              <p className={styles.description}>Term Groups</p>
              <Stack horizontal tokens={stackTokens}>
                <CompoundButton secondaryText="List term groups" onClick={this.listTermGroups}>
                  Term Groups
                </CompoundButton>
                <CompoundButton primary secondaryText="Get By Id" onClick={this.getTermGroupById}>
                  Term Group
                </CompoundButton>
              </Stack>


              <Separator />
              <p className={styles.description}>Term Sets</p>
              <Stack horizontal tokens={stackTokens}>
                <CompoundButton secondaryText="List term groups" onClick={this.listTermSets}>
                  Term Sets
                </CompoundButton>
                <CompoundButton primary secondaryText="Get By Id" onClick={this.getTermSetById}>
                  Term Set
                </CompoundButton>
              </Stack>

              <Separator />
              <p className={styles.description}>Terms</p>
              <Stack horizontal tokens={stackTokens}>
                <CompoundButton secondaryText="List terms" onClick={this.listTerms}>
                  Terms
                </CompoundButton>
                <CompoundButton primary secondaryText="Get By Id" onClick={this.getTermById}>
                  Term
                </CompoundButton>
              </Stack>
              <Separator />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Term Store
  private async accessTermStoreData() {
    // get term store data
    const info: ITermStoreInfo = await sp.termStore();
    console.log(info);
    alert("Id: " + info.id + "\nName: " + info.name);
  }

  // Term Group
  private async listTermGroups() {
    // get term groups data
    const info: ITermGroupInfo[] = await sp.termStore.termGroups();
    console.log(info);

    let termGroups: string = "";
    for (let i: number = 0; i < info.length; i++) {
      termGroups += "\nid: " + info[i].id + ", Name: " + info[i].name;
    }
    alert(termGroups);

    // seems to get the same information
    const info2: ITermGroupInfo[] = await sp.termStore.groups();
    console.log(info2);
  }

  private async getTermGroupById() {
    // get term groups data
    const info: ITermGroupInfo = await sp.termStore.termGroups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4")();
    console.log(info);
    alert("Id: " + info.id + "\nName: " + info.name);

    const info2: ITermGroupInfo = await sp.termStore.groups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4")();
    console.log(info2);
  }

  // Term Sets
  private async listTermSets() {
    // get term set data
    const info: ITermSetInfo[] = await sp.termStore.termGroups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").termSets();
    console.log(info);

    let termsSets: string = "";
    for (let i: number = 0; i < info.length; i++) {
      termsSets += "\nid: " + info[i].id + ", Name: " + info[i].localizedNames[0].name;
    }
    alert(termsSets);

    // seems to get the same information
    const info2: ITermSetInfo[] = await sp.termStore.groups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").sets();
    console.log(info2);
  }

  private async getTermSetById() {
    // get term set data
    const info: ITermSetInfo = await sp.termStore.termGroups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").termSets.getById("d3b73083-75f7-4dcf-a27b-24da354aee19")();
    console.log(info);
    alert("Id: " + info.id + "\nName: " + info.localizedNames[0].name);

    const info2: ITermSetInfo = await sp.termStore.groups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").sets.getById("d3b73083-75f7-4dcf-a27b-24da354aee19")();
    console.log(info2);
  }

  // Terms
  private async listTerms() {
    // get term set data
    const info: ITermInfo[] = await sp.termStore.termGroups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").termSets.getById("d3b73083-75f7-4dcf-a27b-24da354aee19").terms();
    console.log(info);

    let terms: string = "";
    for (let i: number = 0; i < info.length; i++) {
      terms += "\nid: " + info[i].id + ", Name: " + info[i].labels[0].name;
    }
    alert(terms);

    // seems to get the same information
    const info2: ITermInfo[] = await sp.termStore.groups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").sets.getById("d3b73083-75f7-4dcf-a27b-24da354aee19").terms();
    console.log(info2);
  }

  private async getTermById() {
    // get term data
    const info: ITermInfo = await sp.termStore.termGroups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").termSets.getById("d3b73083-75f7-4dcf-a27b-24da354aee19").terms.getById("30b00236-4ab6-44cf-835c-e25c574f0d54")();
    console.log(info);
    alert("Id: " + info.id + "\nName: " + info.labels[0].name);

    // seems to get the same information
    const info2: ITermInfo = await sp.termStore.groups.getById("267b4a59-8f88-48ba-bde1-0625593d0af4").sets.getById("338666a8-1111-2222-3333-f72471314e72").terms.getById("30b00236-4ab6-44cf-835c-e25c574f0d54")();
    console.log(info2);
  }
}
