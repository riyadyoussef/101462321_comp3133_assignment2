import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideApollo } from 'apollo-angular';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { inject } from '@angular/core';
import { environment } from './environments/environment.prod'; // ✅ Use environment value

const provideApolloClient = () => {
  const httpLink = inject(HttpLink);

  // ✅ Use production backend URL from environment config
  const uri = environment.apiUrl;

  // ✅ Attach JWT token from localStorage
  const authLink = setContext(() => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = ApolloLink.from([authLink, httpLink.create({ uri })]);

  const apolloOptions: ApolloClientOptions<any> = {
    cache: new InMemoryCache(),
    link,
  };

  return apolloOptions;
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(provideApolloClient),
  ]
}).catch(err => console.error(err));
