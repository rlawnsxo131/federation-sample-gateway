import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-fastify';
import isProduction from '../lib/isProduction';

export default class Apollo {
  private server!: ApolloServer;

  constructor() {
    this.setup();
  }

  private async setup() {
    const gateway = this.createGateway() as any; // fuck typing apollo gateway..
    this.server = new ApolloServer({
      gateway,
      subscriptions: false,
    });
  }

  private createGateway() {
    const { USER_SERVER_URL, DATA_SERVER_URL } = process.env;
    const gateway = new ApolloGateway({
      serviceList: [
        { name: 'user', url: USER_SERVER_URL },
        { name: 'data', url: DATA_SERVER_URL },
      ],
      __exposeQueryPlanExperimental: !isProduction(),
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
