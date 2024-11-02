import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWNPRZmb5ktbqzivjQLa4gOeTWD3JucJE',
  authDomain: 'pizza-poll-test.firebaseapp.com',
  projectId: 'pizza-poll-test',
  storageBucket: 'pizza-poll-test.firebasestorage.app',
  messagingSenderId: '240146972741',
  appId: '1:240146972741:web:76d3695d9a389729bc632c',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
