import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => 
    initializeApp({"projectId":"saladejuegos-d6690","appId":"1:428303329446:web:1f6436cb6827663cbdec67","storageBucket":
    "saladejuegos-d6690.appspot.com","apiKey":"AIzaSyCR1nZylwBjqENwWfU146FpguTCPb5BNec","authDomain":"saladejuegos-d6690.firebaseapp.com","messagingSenderId":"428303329446"}))), 
    importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
