const puppeteer = require('puppeteer');
const fs = require('fs');

const DATA_DIR = './screenshot-test/data/';
const CLIENT_URL = 'http://localhost:9000/';
const SERVER_URL = 'http://localhost:9095/'
const viewPort_1080 = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
}

const apiAccount = fs.readFileSync(`${DATA_DIR}api-account.json`).toString();
const apiAccountToken = fs.readFileSync(`${DATA_DIR}api-account-token.json`).toString();
const apiV1Info = fs.readFileSync(`${DATA_DIR}api-v1-info.json`).toString();

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

it('Home Page 1920*1080', async () => {
  let numbersLevels = fs.readFileSync(`${DATA_DIR}private-utils-numbers-levels.json`).toString();
  let numbersMain = fs.readFileSync(`${DATA_DIR}private-utils-numbers-main.json`).toString();

  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    switch (url) {
      case `${SERVER_URL}api/account`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: apiAccount
        });
        break;
      case `${SERVER_URL}api/account/tokens`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: apiAccountToken
        });
        break;
      case `${SERVER_URL}api/private/utils/numbers/main/`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: numbersMain
        });
        break;
      case `${SERVER_URL}api/private/utils/numbers/levels/`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: numbersLevels
        });
        break;
      case `${SERVER_URL}api/v1/info`:
        request.respond(
          {
            status: 200,
            contentType: 'application/json',
            body: apiV1Info
          }
        );
        break;
      default:
        request.continue();
    }
  });
  await page.goto(`${CLIENT_URL}`);
  await page.evaluate(() => {
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

it('Caner Gene Page 1920*1080', async () => {
  let geneList = fs.readFileSync(`${DATA_DIR}utils-cancerGeneList.json`).toString();
  let allCuratedGenes = fs.readFileSync(`${DATA_DIR}utils-allCuratedGenes.json`).toString();

  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    // if (url.includes('recaptcha'))
    //   request.abort();
    // else{
      switch (url) {
        case `${SERVER_URL}api/account`:
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: apiAccount
          });
          break;
        case `${SERVER_URL}api/account/tokens`:
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: apiAccountToken
          });
          break;
        case `${SERVER_URL}api/v1/info`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: apiV1Info
            }
          );
          break;
        case `${SERVER_URL}api/v1/utils/cancerGeneList`:
            request.respond(
              {
                status: 200,
                contentType: 'application/json',
                body: geneList
              }
            );
            break;
        case `${SERVER_URL}api/v1/utils/allCuratedGenes`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: allCuratedGenes
            }
          );
          break;
        default:
          request.continue();
      }
    // }
  });
  await page.goto(`${CLIENT_URL}cancerGenes`);
  await page.evaluate(() => {
    localStorage.setItem('oncokb-user-token', '4db8f2d2-fa32-453e-ab72-3ee58ef0352b');
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}cancerGenes`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

it('User Setting Page 1920*1080', async () => {

  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    // if (url.includes('recaptcha'))
    //   request.abort();
    // else
    //   request.continue();
    switch (url) {
      case `${SERVER_URL}api/account`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: apiAccount
        });
        break;
      case `${SERVER_URL}api/account/tokens`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: apiAccountToken
        });
        break;
      default:
        request.continue();
    }
  });
  await page.goto(`${CLIENT_URL}account/settings`);
  await page.evaluate(() => {
    localStorage.setItem('oncokb-user-token', '4db8f2d2-fa32-453e-ab72-3ee58ef0352b');
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}account/settings`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot({fullPage: true});
  expect(image).toMatchImageSnapshot();
});

it('Actionable Gene Page 1920*1080', async () => {
  let levels = fs.readFileSync(`${DATA_DIR}private-utils-evidences-levels.json`).toString();
  let tumorTypes = fs.readFileSync(`${DATA_DIR}private-utils-tumorTypes.json`).toString();

  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    // if (url.includes('recaptcha'))
    //   request.abort();
    // else{
      switch (url) {
        case `${SERVER_URL}api/account`:
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: apiAccount
        });
        break;
        case `${SERVER_URL}api/account/tokens`:
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: apiAccountToken
          });
          break;
        case `${SERVER_URL}api/v1/info`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: apiV1Info
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/evidences/levels`:
            request.respond(
              {
                status: 200,
                contentType: 'application/json',
                body: levels
              }
            );
            break;
        case `${SERVER_URL}api/private/utils/tumorTypes`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: tumorTypes
            }
          );
          break;
        default:
          request.continue();
      }
    // }
  });
  await page.goto(`${CLIENT_URL}actionableGenes`);
  await page.evaluate(() => {
    localStorage.setItem('oncokb-user-token', '4db8f2d2-fa32-453e-ab72-3ee58ef0352b');
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}actionableGenes`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot({fullPage: true});
  expect(image).toMatchImageSnapshot();
});

it('Gene Page ABL1 1920*1080', async () => {
  let gene = fs.readFileSync(`${DATA_DIR}private-utils-numbers-gene-ABL1.json`).toString();
  let geneQuery = fs.readFileSync(`${DATA_DIR}api-v1-genes-ABL1.json`).toString();
  let bio = fs.readFileSync(`${DATA_DIR}api-private-search-variants-bio-ABL1.json`).toString();
  let sampleCount = fs.readFileSync(`${DATA_DIR}api-private-utils-portalAlterationSampleCount.json`).toString();
  let summary = fs.readFileSync(`${DATA_DIR}api-v1-evidences-ABL1-summary.json`).toString();
  let background = fs.readFileSync(`${DATA_DIR}api-v1-evidences-ABL1-background.json`).toString();
  let clinical = fs.readFileSync(`${DATA_DIR}api-private-search-variants-cli-ABL1.json`).toString();
  
  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    if (url.includes('recaptcha'))
      request.abort();
    else{
      switch (url) {
        case `${SERVER_URL}api/v1/info`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: apiV1Info
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/numbers/gene/ABL1`:
            request.respond(
              {
                status: 200,
                contentType: 'application/json',
                body: gene
              }
            );
            break;
        case `${SERVER_URL}api/v1/genes/lookup?query=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: geneQuery
            }
          );
          break;
        case `${SERVER_URL}api/private/search/variants/biological?hugoSymbol=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: bio
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/portalAlterationSampleCount`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: sampleCount
            }
          );
          break;
        case `${SERVER_URL}api/v1/evidences/lookup?hugoSymbol=ABL1&evidenceTypes=GENE_SUMMARY`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: summary
            }
          );
          break;
        case `${SERVER_URL}api/v1/evidences/lookup?hugoSymbol=ABL1&evidenceTypes=GENE_SUMMARY`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: summary
            }
          );
          break;
        case `${SERVER_URL}api/v1/evidences/lookup?hugoSymbol=ABL1&evidenceTypes=GENE_BACKGROUND`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: background
            }
          );
          break;
        case `${SERVER_URL}api/private/search/variants/clinical?hugoSymbol=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: clinical
            }
          );
          break;
        default:
          request.continue();
      }
    }
  });
  await page.goto(`${CLIENT_URL}gene/ABL1`);
  await page.evaluate(() => {
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}gene/ABL1`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot({fullPage: true});
  expect(image).toMatchImageSnapshot();
});

it('Alteration Page BCR-ABL1 Fusion 1920*1080', async () => {
  let gene = fs.readFileSync(`${DATA_DIR}private-utils-numbers-gene-ABL1.json`).toString();
  let geneQuery = fs.readFileSync(`${DATA_DIR}api-v1-genes-ABL1.json`).toString();
  let bio = fs.readFileSync(`${DATA_DIR}api-private-search-variants-bio-ABL1.json`).toString();
  let clinical = fs.readFileSync(`${DATA_DIR}api-private-search-variants-cli-ABL1.json`).toString();
  let tumorTypes = fs.readFileSync(`${DATA_DIR}private-utils-tumorTypes.json`).toString();
  let annotation = fs.readFileSync(`${DATA_DIR}api-private-utils-variantAnnotation-ABL1-BCR.json`).toString();
  
  const page = await browser.newPage();
  await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
  page.on('request', (request) => {
    let url = request.url()
    if (url.includes('recaptcha'))
      request.abort();
    else{
      switch (url) {
        case `${SERVER_URL}api/v1/info`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: apiV1Info
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/numbers/gene/ABL1`:
            request.respond(
              {
                status: 200,
                contentType: 'application/json',
                body: gene
              }
            );
            break;
        case `${SERVER_URL}api/v1/genes/lookup?query=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: geneQuery
            }
          );
          break;
        case `${SERVER_URL}api/private/search/variants/biological?hugoSymbol=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: bio
            }
          );
          break;
        case `${SERVER_URL}api/private/search/variants/clinical?hugoSymbol=ABL1`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: clinical
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/tumorTypes`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: tumorTypes
            }
          );
          break;
        case `${SERVER_URL}api/private/utils/variantAnnotation?hugoSymbol=ABL1&referenceGenome=GRCh37&alteration=BCR-ABL1%20Fusion`:
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: annotation
            }
          );
          break;
        default:
          request.continue();
      }
    }
  });
  await page.goto(`${CLIENT_URL}gene/ABL1/BCR-ABL1%20Fusion`);
  await page.evaluate(() => {
    localStorage.setItem('localdev', 'true');
  });
  await page.goto(`${CLIENT_URL}gene/ABL1/BCR-ABL1%20Fusion`);
  await page.setViewport(viewPort_1080);
  await page.waitFor(2000);
  const image = await page.screenshot({fullPage: true});
  expect(image).toMatchImageSnapshot();
});

afterAll(async () => {
  await browser.close();
});