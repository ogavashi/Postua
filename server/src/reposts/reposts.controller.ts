import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

import { RepostsService } from './reposts.service';
import { AddRepostDto } from './dto/addRepost.dto';

@ApiTags('reposts')
@Controller('reposts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RepostsController {
  constructor(private readonly repostsService: RepostsService) {}

  @Post()
  @ApiBody({ type: AddRepostDto })
  create(@UserId() id: number, @Body() data: AddRepostDto) {
    return this.repostsService.repost(data.postId, id);
  }
}
