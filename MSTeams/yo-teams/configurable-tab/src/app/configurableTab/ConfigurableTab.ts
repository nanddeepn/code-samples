import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/configurableTab/index.html")
@PreventIframe("/configurableTab/config.html")
@PreventIframe("/configurableTab/remove.html")
export class ConfigurableTab {
}
