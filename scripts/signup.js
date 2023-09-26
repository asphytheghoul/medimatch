const puppeteer = require("puppeteer")
//puppeteer
async function mg1(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://rapidapi.com/auth/sign-up?referral=/hub")
    await page.waitForTimeout(250)
    await page.close();
    await browser.close();
}