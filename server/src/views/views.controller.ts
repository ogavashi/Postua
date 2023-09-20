import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { ViewsService } from './views.service';
import { AddViewDto } from './dto/addView.dto';

@ApiTags('views')
@Controller('views')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ViewsController {
  constructor(private readonly likesService: ViewsService) {}

  @Post()
  @ApiBody({ type: AddViewDto })
  create(@UserId() id: number, @Body() data: AddViewDto) {
    return this.likesService.view(data.postId, id);
  }
}
