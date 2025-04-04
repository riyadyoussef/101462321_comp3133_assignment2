import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [ApolloModule, HttpClientModule],
})
export class GraphQLModule {}

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: 'http://localhost:4000/graphql', // 🔁 Replace with deployed URL in production
      withCredentials: false,
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class ApolloConfigModule {}
