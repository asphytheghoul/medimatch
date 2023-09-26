// // Scrape images from a 1mg website using headless chrome

const { retry } = require("async");
const puppeteer = require("puppeteer");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const path = require("path");
// // const { func } = require("prop-types");
// const { get } = require("http");

// const dir = "images";

// async function getImageLinks(medName) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1440, height: 2100 });
//   await page.goto("https://www.1mg.com/drugs-all-medicines?label=" + medName);
//   // Sleep for 5 seconds

//   const medHref = await page.evaluate(() => {
//     document
//       .querySelector(".style_horizontal-card__1Zwmt")
//       .firstChild.getAttribute("href");
//   });

//   await page.screenshot({ path: "example.png" });
//   await page.close();

//   console.log(medHref);
//   // await page.goto("https://www.1mg.com/drugs" + medHref);

//   // const page2 = await browser.newPage();
//   // //www.1mg.com/drugs/kefmax-200mg-tablet-418283 => EXAMPLE

//   // await page2.goto("https://www.1mg.com" + medHref);
//   // await page2.screenshot({ path: "example2.png" });
//   // const obj = await page2.evaluate(() => {
//   //   const substitueName = document.querySelector(
//   //     ".SubstituteItem_name__PH8Al"
//   //   ).firstChild;
//   //   const substituePrice = document.querySelector(
//   //     ".SubstituteItem_unit-price__MIbLo"
//   //   ).innerHTML;
//   //   const substitueDiscountFactor = document.querySelector(
//   //     ".SubstituteItem_save-text__1DPP8"
//   //   ).firstChild.innerText;
//   //   const secondLastImage = document
//   //     .querySelectorAll(".card-slide img")[3]
//   //     .getAttribute("src");

//   //   return {
//   //     Name: medName,
//   //     URL: secondLastImage,
//   //   };
//   // });
//   // page2.close();
//   browser.close();
//   // return obj;
// }

// getImageLinks("c").then((value) => {
//   console.log(value);
// });
// // console.log(objectThing);
// // Store links in a file
// function storeLinks(links) {
//   const data = JSON.stringify(links);
//   fs.writeFileSync("links.json", data);
// }

// async function mg1(medName) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1440, height: 2100 });
//   await page.goto("https://www.1mg.com/search/all?name=" + medName);
//   const medHref = await page.evaluate(() => {
//     document
//       .querySelector(".style_horizontal-card__1Zwmt")
//       .firstChild.getAttribute("href");
//   });
//   page.close();

//   const page2 = await browser.newPage();
//   // https://www.1mg.com/drugs/kefmax-200mg-tablet-418283 => EXAMPLE
//   await page2.goto("https://www.1mg.com/drugs" + medHref);
//   await page2.evaluate(() => {
//     const substitueName = document.querySelector(
//       ".SubstituteItem_name__PH8Al"
//     ).firstChild;
//     const substituePrice = document.querySelector(
//       ".SubstituteItem_unit-price__MIbLo"
//     ).innerHTML;
//     const substitueDiscountFactor = document.querySelector(
//       ".SubstituteItem_save-text__1DPP8"
//     ).firstChild.innerText;
//     // const medDescription =

//     return {
//       Name: medName,
//       URL: medHref,
//     };
//   });
// }

// mg1("Crocin").then((value) => {
//   console.log(value);
// });

async function mg1(medName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.setViewport({ width: 1440, height: 2100 });
  await page.goto("https://www.1mg.com/drugs-all-medicines?label=S");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "example.png" });

  // const arr = [];
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

  // Add the href to the array using a for loop for 25 time

  console.log(medHref);
  // const medHref = await page.evaluate(() => {
  //   document
  //     .querySelector(".style_horizontal-card__1Zwmt")
  //     .firstChild.getAttribute("href");
  // });
  // page.close();
  // console.log(medHref);
  // return medHref;
  await page.close();
  await browser.close();
  return medHref;
}

async function mg2(ending) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2100 });
  await page.goto("https://www.1mg.com" + ending);
  await page.waitForTimeout(2000);
  // await page.screenshot({ path: "drugs.png" });

  // const arr = [];
  // a;
  const obj = await page.evaluate(async () => {
    let url;
    let name = document.querySelector(
      ".DrugHeader__title-content___2ZaPo"
    ).innerText;
    // Sleep for 2 seconds
    return {
      Name: name,
    };
  });

  // await page.click(".style__next-arrow___2E8t5");
  await page.waitForTimeout(500);
  // await page.click(".style__next-arrow___2E8t5");
  await page.waitForTimeout(3000);

  const obj2 = await page.evaluate(async () => {
    let size = document.querySelectorAll(
      ".style__container___3DB0z div img"
    ).length;
    await new Promise((resolve) => setTimeout(resolve, 100));
    let url = document
      .querySelectorAll(".card-slide img")
      [size - 2].getAttribute("src");
    return {
      URL: url,
    };
  });

  // Add the href to the array using a for loop for 25 time

  console.log(obj2);
  // const medHref = await page.evaluate(() => {
  //   document
  //     .querySelector(".style_horizontal-card__1Zwmt")
  //     .firstChild.getAttribute("href");
  // });
  // page.close();
  // console.log(medHref);
  // return medHref;
  await page.close();
  await browser.close();
  return {
    Name: obj.Name,
    URL: obj2.URL,
  };
}

// mg2("/drugs/cheston-cold-tablet-63785").then((value) => {
//   console.log("VALUE IS" + JSON.stringify(value));
// });
// const array = []
mg1().then(async (value) => {
  let arrayofvalues = value;
  console.log(arrayofvalues);
  // array.push(arrayofvalues)
  for (let i = 0; i < 25; i++) {
    mg2(arrayofvalues[i]).then((value) => {
      // array.push(value)
      console.log("**************\n");
      // console.log(array)
      // console.log("&&&&&&&&&&&\n")
      console.log(value);
      console.log("**************\n");
      // Timeout of 500 ms
    });
    // Timeout 500 msa
    await new Promise((resolve) => setTimeout(resolve, 7000));
  }
});
