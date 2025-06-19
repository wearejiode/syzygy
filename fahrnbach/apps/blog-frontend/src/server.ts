import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './main.server';
import { APP_BASE_HREF } from '@angular/common';

const DIST_FOLDER = join(process.cwd(), 'dist/apps/cloudflare/blog-frontend/browser');

const app = express();

app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
  });
});

function run(): void {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

export * from './main.server';
