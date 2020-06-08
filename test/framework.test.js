'use strict';

const mock = require('egg-mock');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: true,
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('framework-example_123456')
      .expect(200);
  });

  it('should GET /isios with iOS', () => {
    return app.httpRequest()
      .get('/isios')
      .set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1')
      .expect(200)
      .expect('isIOS: true');
  });

  it('should GET /isios with non iOS', () => {
    return app.httpRequest()
      .get('/isios')
      .expect(200)
      .expect('isIOS: false');
  });
});

