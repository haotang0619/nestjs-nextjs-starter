import { INestApplicationContext, Logger, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

/**
 * Base class for scripts under `commands/`. Handles the boilerplate every
 * script needs (bootstrapping/closing the app context, consistent logging,
 * a non-zero exit code on failure) so a script only has to implement
 * `execute()`.
 *
 * This intentionally does NOT prescribe input/output file conventions or
 * CLI argument parsing — add that yourself in a script (or factor it out
 * once two scripts actually need the same shape) if/when a script needs it.
 */
export abstract class AbstractScript {
  protected readonly logger: Logger;

  constructor(
    protected readonly name: string,
    private readonly appModule: Type<any>,
  ) {
    this.logger = new Logger(name);
  }

  async run(): Promise<void> {
    const startTime = Date.now();
    this.logger.log(`Starting ${this.name}...`);

    const app = await NestFactory.createApplicationContext(this.appModule);
    try {
      await this.execute(app);
      this.logger.log(`${this.name} completed in ${Date.now() - startTime}ms`);
    } catch (error) {
      this.logger.error(`${this.name} failed: ${error.message}`, error.stack);
      process.exitCode = 1;
    } finally {
      await app.close();
    }
  }

  /**
   * Main business logic of the script. `app` is a DI context (no HTTP
   * server) scoped to the module passed to the constructor.
   */
  protected abstract execute(app: INestApplicationContext): Promise<void>;
}
