import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/share/filter/http-exception.filter';
import { TranformInterceptor } from 'src/share/interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';
// import * as passport from 'passport';

export default function (app: INestApplication) {
  const configService = new ConfigService();
  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    credentials: true,
  });

  // Versoning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    prefix: 'api/v',
  });

  // Interceptor
  app.useGlobalInterceptors(new TranformInterceptor());

  // Pipe
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Exception fiiters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Cookie
  app.use(cookieParser());

  //Session
  // app.use(
  //   session({
  //     secret: configService.get<string>('SESSION_KEY'),
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  // Swagger
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('VFast Intern BE')
      .setDescription('API documents')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
