#!/usr/bin/env node
import path from 'path';

import { Logger } from '@nestjs/common';

/**
 * Entry point for one-off/maintenance scripts that need the app's DI
 * container but don't need an HTTP server.
 *
 * Usage: npm run script <script-name>
 */

const logger = new Logger('ScriptRunner');

async function bootstrap() {
  const scriptName = process.argv[2];
  if (!scriptName) {
    logger.error('Usage: npm run script <script-name>');
    process.exit(1);
  }

  const scriptPath = path.resolve(__dirname, 'commands', scriptName);

  let scriptModule: { run?: () => Promise<void> };
  try {
    // A dynamic `import()` here would go through Node's native ESM resolver
    // (which ts-node's CJS require-hook doesn't patch), so it can't resolve
    // an extensionless .ts path the way `require()` can.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    scriptModule = require(scriptPath);
  } catch {
    logger.error(`Script "${scriptName}" was not found under src/scripts/commands/`);
    process.exit(1);
  }

  if (typeof scriptModule.run !== 'function') {
    logger.error(`Script "${scriptName}" does not export a run() function`);
    process.exit(1);
  }

  await scriptModule.run();
}

bootstrap();
