import Apollo from './Apollo';
import Fastify from './Fastify';
import envConfig from '../lib/env';

export default class Server {
  private server!: Fastify;

  constructor() {
    this.setup();
  }

  private setup() {
    envConfig();
    this.server = new Fastify();
  }

  async start() {
    const apollo = new Apollo();
    await apollo.start();
    this.server.registerApollo(apollo.createHandler());
    await this.server.start();
  }
}
