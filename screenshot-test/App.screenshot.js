const puppeteer = require('puppeteer');
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
describe('screenshot test', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });
  var fs =require('fs');
  var json = fs.readFileSync('./screenshot-test/test.json').toString();
  it('Home Page', async () => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);// Handle UnhandledPromiseRejectionWarning: Error: Request Interception is not enabled! 
    page.on('request', (request) => {
      let url = request.url()
      switch(url){
        case "http://localhost:9095/api/private/utils/numbers/main/":
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: '{"gene":682,"alteration":5723,"tumorType":122,"drug":100,"level":[]}'
          });
          break;
        case "http://localhost:9095/api/private/utils/numbers/levels/":
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: json
          });
          break;
        case "http://localhost:9095/api/v1/info":
          request.respond(
            {
              status: 200,
              contentType: 'application/json',
              body: '{"oncoTreeVersion":"oncotree_2019_12_01","ncitVersion":"19.03d","levels":[{"levelOfEvidence":"LEVEL_1","description":"FDA-recognized biomarker predictive of response to an FDA-approved drug in this indication","htmlDescription":"<span><b>FDA-recognized</b> biomarker predictive of response to an <b>FDA-approved</b> drug <b>in this indication</b></span>","colorHex":"#33A02C"},{"levelOfEvidence":"LEVEL_2","description":"Standard care biomarker recommended by the NCCN or other expert panels predictive of response to an FDA-approved drug in this indication","htmlDescription":"<span><b>Standard care</b> biomarker recommended by the NCCN or other expert panels predictive of response to an <b>FDA-approved drug</b> in this indication</span>","colorHex":"#1F78B4"},{"levelOfEvidence":"LEVEL_2A","description":"Standard care biomarker recommended by the NCCN or other expert panels predictive of response to an FDA-approved drug in this indication","htmlDescription":"<span><b>Standard care</b> biomarker recommended by the NCCN or other expert panels predictive of response to an <b>FDA-approved drug</b> in this indication</span>","colorHex":"#1F78B4"},{"levelOfEvidence":"LEVEL_2B","description":"","htmlDescription":"","colorHex":"#80B1D3"},{"levelOfEvidence":"LEVEL_3A","description":"Compelling clinical evidence supports the biomarker as being predictive of response to a drug in this indication","htmlDescription":"<span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of response to a drug <b>in this indication</b> but neither biomarker and drug are standard of care</span>","colorHex":"#984EA3"},{"levelOfEvidence":"LEVEL_3B","description":"Standard care or investigational biomarker predictive of response to an FDA-approved or investigational drug in another indication","htmlDescription":"<span><b>Standard care</b> or <b>investigational</b> biomarker predictive of response to an <b>FDA-approved</b> or <b>investigational</b> drug in another indication</span>","colorHex":"#BE98CE"},{"levelOfEvidence":"LEVEL_4","description":"Compelling biological evidence supports the biomarker as being predictive of response to a drug","htmlDescription":"<span><b>Compelling biological evidence</b> supports the biomarker as being predictive of response to a drug but neither biomarker and drug are standard of care</span>","colorHex":"#424242"},{"levelOfEvidence":"LEVEL_R1","description":"Standard care biomarker predictive of resistance to an FDA-approved drug in this indication","htmlDescription":"<span><b>Standard of care</b> biomarker predictive of <b>resistance</b> to an <b>FDA-approved</b> drug <b>in this indication</b></span>","colorHex":"#EE3424"},{"levelOfEvidence":"LEVEL_R2","description":"Compelling clinical evidence supports the biomarker as being predictive of resistance to a drug","htmlDescription":"<span><b>Compelling clinical evidence</b> supports the biomarker as being predictive of <b>resistance</b> to a drug</span>","colorHex":"#F79A92"}],"dataVersion":{"version":"","date":""},"apiVersion":"v1.2.0","publicInstance":false}'
            }
          );
          break;
        default:
          request.continue();
      }
    });
    await page.goto('http://localhost:9000/');
    await page.evaluate(() => {
      localStorage.setItem('oncokb-user-token', '4db8f2d2-fa32-453e-ab72-3ee58ef0352b');
      localStorage.setItem('localdev', 'true');
    });
    await page.goto('http://localhost:9000/');
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await timeout(2000);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});