let puppeteer = require("puppeteer")
let minimist = require("minimist")
let fs = require("fs");
const { join } = require("path");

let configJson = fs.readFileSync("config.json" ,"utf-8" );
let config = JSON.parse(configJson);

let url = "https://www.hackerrank.com/"

run();

async function run() {
    let browser = await puppeteer.launch({
       headless: false,
       args:[
           '--start-maximized'
       ],
       defaultViewport: null
    });
    let page = await browser.newPage();

    page.goto(url)
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");
    
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']" , config.username , {delay: 30});

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='password']" , config.password , { delay: 30});

    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    await page.waitForSelector("a[href='/contests']");
    await page.click("a[href='/contests']");

    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");
    
    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

    await page.waitFor(3000);

    await page.waitForSelector("li[data-tab='moderators']");
    await page.click("li[data-tab='moderators']");
    
    await page.waitForSelector("input[id='moderator']");
    await page.type("input[id='moderator']" , config.moderaters , {delay: 30});

    await page.waitForSelector("button[class='btn moderator-save']");
    await page.click("button[class='btn moderator-save']");
    
}


