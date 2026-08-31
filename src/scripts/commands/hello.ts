import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '../../app/app.module';
import { AbstractScript } from '../abstract-script';

/**
 * Minimal example script — run with:
 *   npm run script hello
 *
 * Copy this file as a starting point for a new script: extend
 * AbstractScript, pass it the Nest module your script needs (for DI), and
 * implement execute().
 */
class HelloScript extends AbstractScript {
  constructor() {
    super('HelloScript', AppModule);
  }

  protected async execute(app: INestApplicationContext): Promise<void> {
    const configService = app.get(ConfigService);
    this.logger.log(
      `Hello from a Nest script! webUrl is configured as: ${configService.get('webUrl')}`,
    );
  }
}

export async function run(): Promise<void> {
  await new HelloScript().run();
}
