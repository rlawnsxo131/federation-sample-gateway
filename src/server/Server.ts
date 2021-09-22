import Apollo from './Apollo';
import Fastify from './Fastify';
import initializeEnvironment from '../lib/initializeEnvironment';

export default class Server {
  private server!: Fastify;

  constructor() {
    this.setup();
  }

  private setup() {
    initializeEnvironment();
    this.server = new Fastify();
  }

  async start() {
    const apollo = new Apollo();
    await apollo.start();
    this.server.registerApollo(apollo.createHandler());
    await this.server.start();
  }
}
