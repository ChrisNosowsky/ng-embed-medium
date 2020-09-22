import { Component, Output, EventEmitter, Input } from "@angular/core";
import { NgMediumService } from "../services/ng-medium.service";
import { Feed } from "../models/feed";
import { NgMediumStyles } from "../models/ngMediumStyles";
import { NonNullAssert } from '@angular/compiler';

@Component({
  selector: "ng-medium-feed",
  templateUrl: "./ng-medium-feed.component.html",
  styles: []
})
export class NgMediumFeedComponent {
  @Output()
  errorStream = new EventEmitter<Error>();
  @Input()
  set feedUrl(feedUrl: string) {
    this.fetchFeed(feedUrl);
  }
  private _styles: NgMediumStyles;
  @Input()
  set styles(styles: NgMediumStyles) {
    const completedStyles = this.appendDefaultStyles(styles);
    this._styles = completedStyles;
  }
  get styles(): NgMediumStyles {
    return this._styles;
  }

  feed: Feed;
  final_title: string = '';

  constructor(private service: NgMediumService) {
    this._styles = this.appendDefaultStyles(null);
  }

  private fetchFeed(url: string): void {
    this.service.fetchFeed(url).then(
      res => {this.feed = res
              this.final_title = this.feed.title.slice(0, -9)
        },
      err => this.errorStream.emit(err)
    );
  }

  private appendDefaultStyles(input: NgMediumStyles): NgMediumStyles {
    const defaultStyle: NgMediumStyles = {
      feedContainer: {
        "text-align": "center"
      },
      feedTitle: {
        "font-size": "2rem",
        padding: "2em",
        "font-family": "Arial"
      },
      allItemsContainer: {
        display: "flex",
        "flex-wrap": "wrap",
        "font-family": "Arial"
  
      },
      itemContainer: {
        width: "32%",
        height: "30em",
        display: "flex",
        "flex-direction": "column",
        margin: "0em 0.4em",
        overflow: "hidden"
      },
      itemThumbnailContainer: {
        display: "flex",
        "justify-content": "space-evenly",
      },
      itemThumbnail: {
        padding: "0.8em 0em",
        width: "100%",
        height: "300px",
        "object-fit": "cover"
      },
      itemTitle: {
        "font-size": "18px",
        "margin-bottom": "0em",
        "min-height": "3em"
      },
      itemAuthor: {
        "display": "grid",
        "align-content": "end",
        color: "#A9A9A9",
        "font-size": "14px",
        "text-align": "left",
      },
      itemLink: {
        "text-decoration": "none",
        color: "black"
      }
    };

    if (input) {
      Object.keys(defaultStyle).forEach(section => {
        if (input[section]) {
          defaultStyle[section] = input[section];
        }
      });
    }

    return defaultStyle;
  }
}
