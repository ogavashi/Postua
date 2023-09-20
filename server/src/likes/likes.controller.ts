import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { LikesService } from './likes.service';
import { AddLikeDto } from './dto/addLike.dto';

@ApiTags('likes')
@Controller('likes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiBody({ type: AddLikeDto })
  create(@UserId() id: number, @Body() data: AddLikeDto) {
    return this.likesService.like(data.postId, id);
  }
}
