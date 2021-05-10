var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './ExpandCollapseWebPart.module.scss';
import * as strings from 'ExpandCollapseWebPartStrings';
var ExpandCollapseWebPart = /** @class */ (function (_super) {
    __extends(ExpandCollapseWebPart, _super);
    function ExpandCollapseWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpandCollapseWebPart.prototype.render = function () {
        var _this = this;
        this.enableExpandCollapse();
        this.domElement.innerHTML = "\n      <div class=\"" + styles.expandCollapse + "\">\n        <div class=\"" + styles.container + "\">\n          <div class=\"" + styles.row + "\">\n            <div class=\"" + styles.justifyContentEnd + "\">\n              <a href=\"#\" id=\"linkExpandAll\" style=\"display: none\" rel=\"noreferrer\" onClick=\"" + function () { _this.expandAll(); } + "\">Expand all</a>\n              <a href=\"#\" id=\"linkCollapseAll\" rel=\"noreferrer\" onClick=\"" + function () { _this.collapseAll(); } + "\">Collapse all</a>\n            </div>\n\n            <div id=\"tblAnnouncementDetails\">\n            </div>            \n            \n          </div>\n        </div>\n      </div>";
        this.getAnnouncementDetails();
        this._setButtonEventHandlers();
    };
    ExpandCollapseWebPart.prototype.getAnnouncementDetails = function () {
        var announcementItems = this.getAnnouncementItems();
        var html = "<div>";
        announcementItems.forEach(function (item) {
            html += "\n      <div class=\"" + styles.mainTable + "\">\n        <div class=\"" + styles.titleRow + "\">\n          <label>" + item.title + "</label>\n          <button type=\"button\" class=\"" + styles.buttonExpandCollapse + " collapsible\"}>\u25B2</button>\n        </div>\n        <div class=\"" + styles.descriptionRow + "\">\n          <label>" + item.description + "</label>\n        </div>\n      </div>";
        });
        html += '</div>';
        var announcementContainer = this.domElement.querySelector('#tblAnnouncementDetails');
        announcementContainer.innerHTML = html;
    };
    ExpandCollapseWebPart.prototype._setButtonEventHandlers = function () {
        var webPart = this;
        this.domElement.querySelector('#linkExpandAll').addEventListener('click', function () { webPart.expandAll(); });
        this.domElement.querySelector('#linkCollapseAll').addEventListener('click', function () { webPart.collapseAll(); });
    };
    ExpandCollapseWebPart.prototype.enableExpandCollapse = function () {
        var existCondition = setInterval(function () {
            if (document.getElementsByClassName("collapsible").length > 0) {
                var coll = document.getElementsByClassName("collapsible");
                for (var i = 0; i < coll.length; i++) {
                    coll[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.parentElement.nextElementSibling;
                        if (content.style.display === "block" || content.style.display === "") {
                            this.textContent = "▼";
                            content.style.display = "none";
                        }
                        else {
                            this.textContent = "▲";
                            content.style.display = "block";
                        }
                    });
                }
                clearInterval(existCondition);
            }
        }, 100);
    };
    ExpandCollapseWebPart.prototype.expandAll = function () {
        if (document.getElementsByClassName("collapsible").length > 0) {
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                var content = coll[i].parentElement.nextElementSibling;
                coll[i].textContent = "▲";
                content.style.display = "block";
            }
        }
        var linkCollapseAll = document.getElementById("linkCollapseAll");
        var linkExpandAll = document.getElementById("linkExpandAll");
        if (typeof linkCollapseAll !== "undefined" && typeof linkExpandAll !== "undefined") {
            linkCollapseAll.style.display = "block";
            linkExpandAll.style.display = "none";
        }
    };
    ExpandCollapseWebPart.prototype.collapseAll = function () {
        if (document.getElementsByClassName("collapsible").length > 0) {
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                var content = coll[i].parentElement.nextElementSibling;
                coll[i].textContent = "▼";
                content.style.display = "none";
            }
        }
        var linkCollapseAll = document.getElementById("linkCollapseAll");
        var linkExpandAll = document.getElementById("linkExpandAll");
        if (typeof linkCollapseAll !== "undefined" && typeof linkExpandAll !== "undefined") {
            linkCollapseAll.style.display = "none";
            linkExpandAll.style.display = "block";
        }
    };
    ExpandCollapseWebPart.prototype.getAnnouncementItems = function () {
        var announcementItems = [
            { title: "What is a product key?", description: "A product key is a 25-character code that comes with a Microsoft Office product. The product key allows you to install and activate the Office product on your PC." },
            { title: "Where do I find my Office product key?", description: "Your product key is 25 characters and is found in different locations depending on how you acquired your Office product." },
            { title: "How long does it take to download?", description: "Download times vary by location, internet connection speed and the size of the Office product you are downloading. It is recommended only high-speed broadband connections are used to download your file(s)." },
            { title: "What happens after I download?", description: "After the download has completed, go to the location that you saved the file at and double click on the new icon to start the installation." },
            { title: "What if the download stops or is interrupted before it is complete?", description: "If you become disconnected while files are being downloaded through your web browser, reconnect to the internet and retry your download." }
        ];
        return announcementItems;
    };
    Object.defineProperty(ExpandCollapseWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ExpandCollapseWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ExpandCollapseWebPart;
}(BaseClientSideWebPart));
export default ExpandCollapseWebPart;
//# sourceMappingURL=ExpandCollapseWebPart.js.map