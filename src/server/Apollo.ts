import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-fastify';
import { isProduction } from '../constants';

export default class Apollo {
  private server!: ApolloServer;

  constructor() {
    this.setup();
  }

  private async setup() {
    const gateway = this.createGateway();
    this.server = new ApolloServer({
      gateway,
    });
  }

  private createGateway() {
    const { USER_SERVICE_URL, DATA_SERVICE_URL } = process.env;
    const gateway = new ApolloGateway({
      serviceList: [
        { name: 'user', url: USER_SERVICE_URL },
        { name: 'data', url: DATA_SERVICE_URL },
      ],
      debug: !isProduction,
      __exposeQueryPlanExperimental: !isProduction,
    });
    return gateway;
  }

  async start() {
    try {
      await this.server.start();
    } catch (e) {
      console.log('apollo server start crash');
      console.error(e);
    }
  }

  createHandler() {
    return this.server.createHandler();
  }
}
