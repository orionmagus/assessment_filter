import { Server } from 'miragejs';
import data from './assets/data.json'
export function makeServer() {
  // setup mirage server
  let server = new Server({
    routes() {
      this.namespace = '/fakeApi';
      this.get('/platforms', () => data.dplatforms);
      this.get('/games', () => data.dgames);
      this.passthrough((request) => {
        return !request.url.includes('/fakeApi');
      });
    },
  });

  return server;
}
