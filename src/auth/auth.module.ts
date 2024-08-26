import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'secretKey',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'), // Usa la variable del .env
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
