const handlers = require("../handlers");

// Estamos tentando nos certificar se a homepage esta sendo renderizada
test("home page renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

// Aqui verificamos se a pagina sobre esta sendo renderizada, esta tambem
// conta com uma previsao de sorte na forma de um string contendo pelo menos
// um caractere
test("about page renders with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test("404 handler renders", () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("404");
});

test("500 handler renders", () => {
  const err = new Error("some error");
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
});

// COBERTURA DE TESTES: O jest oferece alguma analise de cobertura de
// codigo automatizada. Para ver ate onde nosso codigo deve ser testado devemos utilizar
// o npm test -- --coverage
