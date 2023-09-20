import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { AddDislikeDto } from './dto/addDisike.dto';
import { DislikesService } from './dislikes.service';

@ApiTags('dislikes')
@Controller('dislikes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DislikesController {
  constructor(private readonly dislikesService: DislikesService) {}

  @Post()
  @ApiBody({ type: AddDislikeDto })
  create(@UserId() id: number, @Body() data: AddDislikeDto) {
    return this.dislikesService.dislike(data.postId, id);
  }
}
