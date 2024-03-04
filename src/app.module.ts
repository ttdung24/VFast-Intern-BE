import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './configs/database/database.module';
import typeOrmConfig from './configs/database/typeOrm.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAccessTokenGuard } from './modules/auth/guard/jwt-access-token.guard';
import { FilesModule } from './modules/files/files.module';
import { MailModule } from './modules/mail/mail.module';
import { PerrmisionsGuard } from './modules/permission/guard/permissions.guard';
import { PermissonModule } from './modules/permission/permission.module';
import { ProductModule } from './modules/products/product.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/users/user.module';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      cache: true,
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    ProductModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissonModule,
    MailModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PerrmisionsGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
