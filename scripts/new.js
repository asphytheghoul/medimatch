const puppeteer = require("puppeteer");

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function mg1() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.1mg.com/drugs-all-medicines?label=S");
  await page.waitForTimeout(250);

  const medHref = await page.evaluate(() => {
    let arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push(
        document
          .querySelectorAll(".style__product-card___1gbex")
          [i].firstChild.getAttribute("href")
      );
    }

    return arr;
  });

  await page.close();
  await browser.close();
  return medHref;
}

async function mg2(ending) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2100 });
  await page.goto("https://www.1mg.com" + ending);
  await page.waitForTimeout(250);

  const obj = await page.evaluate(() => {
    let name = document.querySelector(
      ".DrugHeader__title-content___2ZaPo"
    ).innerText;
    return { Name: name };
  });

  const obj2 = await page.evaluate(async () => {
    let size = document.querySelectorAll(
      ".style__container___3DB0z div img"
    ).length;
    await new Promise((resolve) => setTimeout(resolve, 250));
    try {
      let url = document
        .querySelectorAll(".card-slide img")
        [size - 2].getAttribute("src");
    } catch (e) {
      console.log(e);
    }

    return { URL: url };
  });

  await page.close();
  await browser.close();
  return {
    Name: obj.Name,
    URL: obj2.URL,
  };
}

async function scrapeData() {
  let arrayOfValues = await mg1();
  let results = [];

  for (let i = 0; i < 10; i++) {
    let obj = await mg2(arrayOfValues[i]);
    results.push(obj);
    await sleep(500);
  }

  console.log(results);
}

scrapeData();
