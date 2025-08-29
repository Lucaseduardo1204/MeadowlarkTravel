const portfinder = require("portfinder");
const puppeteer = require("puppeteer");

const app = require("../meadowlark");

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

// Aqui utilizamos os hooks beforeEach e afterEach do Jest para iniciar nosso servidor
// antes de cada teste e interrompe-lo apos o teste. Tambem poderia ser utilizado beforeAll
// e afterAll para nao iniciar e interromper o servidor a cada teste, o que aceleraria porem
// nao teriamos um ambiente "limpo" pra cada teste

test("home page links to about page", async () => {
  const browser = await puppeteer.launch(); // estamos utilizando await liberalmente para tornar o teste mais facil de ler e gravar
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    //Encapsulamos a navegacao e o clique juntos em uma chamada a promisse.all para evitar condicoes race de acordo com a documentacao do Puppeteer
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});

//Condicao RACE: ocorre quando duas ou mais threads acessam dados compartilhados e tentam efetuar alteracoes ao mesmo tempo

// Documentacao do Puppeter: https://pptr.dev
