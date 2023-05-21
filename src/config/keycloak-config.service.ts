import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    const configService = new ConfigService();

    return {
      authServerUrl: configService.get('KC_SERVER_URL'),
      realm: configService.get('KC_REALM'),
      clientId: configService.get('KC_CLIENT_ID'),
      secret: configService.get('KC_SECRET'),
      cookieKey: 'KEYCLOAK_JWT',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
