import { Module, Global } from '@nestjs/common';
import { AdminJwtServiceStrategy } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
  ],

  providers: [AdminJwtServiceStrategy],
  exports: [JwtModule],
})
export class JwtLocalModule {}
