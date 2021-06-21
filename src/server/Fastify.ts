import fastify, { FastifyInstance } from 'fastify';
import compress from 'fastify-compress';
import routes from '../routes';

export default class Fastify {
  private server!: FastifyInstance;

  constructor() {
    this.setup();
  }

  private setup() {
    this.server = fastify({ logger: true });
    this.server.register(compress);
    this.server.register(routes, { prefix: '/api' });
  }

  async start() {
    try {
      await this.server.listen(process.env.PORT!);
    } catch (e) {
      this.server.log.error(e);
      process.exit(1);
    }
  }

  registerApollo(apolloHandler: (app: FastifyInstance) => Promise<void>) {
    this.server.register(apolloHandler);
  }
}
