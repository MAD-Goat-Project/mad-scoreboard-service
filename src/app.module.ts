import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConfigService } from './config/keycloak-config.service';
import { AppConfigModule } from './config/app-config.module';
import { MongoProviderModule } from './providers/mongo/mongo.provider.module';
import { PointsModule } from './resources/points/points.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    MongoProviderModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [AppConfigModule],
    }),
    PointsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*    {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: ResourceGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RoleGuard,
        },*/
  ],
})
export class AppModule {}
