import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { AddSavedDto } from './entities/dto/addSaved.dto';
import { SavedService } from './saved.service';

@ApiTags('saved')
@Controller('saved')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post()
  @ApiBody({ type: AddSavedDto })
  create(@UserId() id: number, @Body() data: AddSavedDto) {
    return this.savedService.save(data.postId, id);
  }
}
