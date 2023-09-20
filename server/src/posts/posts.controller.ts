import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { PostDto } from './dto/post.dto';
import { CustomJwtAuthGuard } from 'src/auth/guards/custom.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@UserId() id: number, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(id, createPostDto);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get()
  findAll(@UserId() id?: number) {
    return this.postsService.findAll(id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/popular')
  @ApiResponse({ type: PostDto })
  popular(@Query('period') period: string = 'today', @UserId() id?: number) {
    return this.postsService.popular(period, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId?: number) {
    console.log(userId);
    return this.postsService.findOne(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserId() userId: number,
  ) {
    return this.postsService.update(+id, updatePostDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: number) {
    return this.postsService.remove(+id, userId);
  }
}
