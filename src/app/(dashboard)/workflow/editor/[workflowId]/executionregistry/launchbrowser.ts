import puppeteer from "puppeteer";
import { EnvironmentExecution } from "./type";
import { LaunchBrowser } from "../../_task/launchbrowser";
import { LogLevel } from "./type"; // Assuming LogLevel enum is defined or imported here

export default async function LaunchBrowserExecution(
  environment: EnvironmentExecution<typeof LaunchBrowser>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    if (!websiteUrl) {
      environment.setLog("Website URL is required but not provided.", LogLevel.ERROR);
      return false;
    }

    const browser = await puppeteer.launch({
      headless: true
    });

    if (!browser) {
      
      environment.setLog("Failed to launch Puppeteer browser.", LogLevel.ERROR);
      return false;
    }

    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);

    environment.setPage(page);
    environment.setLog(`Successfully navigated to ${websiteUrl}`, LogLevel.INFO);

    return true;
  } catch (error:any) {
    console.error("An error occurred in LaunchBrowserExecution",error)
    environment.setLog(
      `An error occurred in LaunchBrowserExecution: ${error.message}`,
      LogLevel.ERROR
    );
    return false;
  }
}
