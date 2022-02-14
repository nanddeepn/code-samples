import * as React from 'react';
import styles from './PnPPagination.module.scss';
import { IPnPPaginationProps } from './IPnPPaginationProps';
import { IPnPPaginationState } from './IPnPPaginationState';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISPItem } from '../models/ISPItem';
import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";

const pageSize: number = 5;

export default class PnPPagination extends React.Component<IPnPPaginationProps, IPnPPaginationState> {
  constructor(props: IPnPPaginationProps) {
    super(props);

    this.state = {
      allItems: [],
      paginatedItems: []
    };
  }

  public componentDidMount(): void {
    const items: ISPItem[] = this.getSPListItems();
    this.setState({ allItems: items, paginatedItems: items.slice(0, pageSize) });
  }

  public render(): React.ReactElement<IPnPPaginationProps> {
    return (
      <div className={styles.pnPPagination}>
        <div className={styles.container}>
          <div className={styles.row}>
            {
              this.state.paginatedItems.map((item) =>
                <div>{item.title}</div>
              )
            }
            <Pagination
              currentPage={1}
              totalPages={(this.state.allItems.length / pageSize) - 1}
              onChange={(page) => this._getPage(page)}
              limiter={3}
            />
          </div>
        </div>
      </div>
    );
  }

  private _getPage(page: number) {
    // round a number up to the next largest integer.
    const roundupPage = Math.ceil(page);

    this.setState({
      paginatedItems: this.state.allItems.slice(roundupPage * pageSize, (roundupPage * pageSize) + pageSize)
    });
  }

  public getSPListItems(): ISPItem[] {
    const spItems: ISPItem[] = [
      { title: "stove", description: "completely" },
      { title: "rich", description: "know" },
      { title: "composed", description: "explain" },
      { title: "said", description: "simply" },
      { title: "sum", description: "bear" },
      { title: "bowl", description: "exclaimed" },
      { title: "help", description: "drive" },
      { title: "pie", description: "wore" },
      { title: "grade", description: "saw" },
      { title: "butter", description: "personal" },
      { title: "family", description: "being" },
      { title: "occur", description: "gather" },
      { title: "push", description: "industry" },
      { title: "earth", description: "wooden" },
      { title: "went", description: "able" },
      { title: "milk", description: "divide" },
      { title: "art", description: "truck" },
      { title: "arrive", description: "step" },
      { title: "taught", description: "throat" },
      { title: "connected", description: "went" },
      { title: "charge", description: "meet" },
      { title: "having", description: "attached" },
      { title: "expression", description: "sit" },
      { title: "dear", description: "cattle" },
      { title: "closely", description: "immediately" },
      { title: "those", description: "skin" },
      { title: "shore", description: "lake" },
      { title: "meant", description: "answer" },
      { title: "down", description: "correctly" },
      { title: "pair", description: "equipment" },
      { title: "deal", description: "blanket" },
      { title: "garage", description: "hay" },
      { title: "cattle", description: "view" },
      { title: "heavy", description: "moving" },
      { title: "throat", description: "locate" },
      { title: "motor", description: "serve" },
      { title: "gun", description: "alone" },
      { title: "situation", description: "far" },
      { title: "worse", description: "general" },
      { title: "until", description: "globe" },
      { title: "tent", description: "pile" },
      { title: "dot", description: "naturally" },
      { title: "theory", description: "score" },
      { title: "dinner", description: "underline" },
      { title: "solid", description: "gain" },
      { title: "allow", description: "region" },
      { title: "joined", description: "vowel" },
      { title: "form", description: "as" },
      { title: "any", description: "swung" },
      { title: "excited", description: "shine" },
      { title: "enter", description: "dirty" },
      { title: "pile", description: "supply" },
      { title: "piano", description: "help" }
    ];

    return spItems;
  }
}
