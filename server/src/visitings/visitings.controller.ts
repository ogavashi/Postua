import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { VisitingsService } from './visitings.service';
import { AddVisitingDto } from './dto/addVisiting.dto';

@ApiTags('visitings')
@Controller('visitings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class VisitingsController {
  constructor(private readonly visitingsService: VisitingsService) {}

  @Post()
  @ApiBody({ type: AddVisitingDto })
  create(@UserId() id: number, @Body() data: AddVisitingDto) {
    return this.visitingsService.visit(data.postId, id);
  }
}
