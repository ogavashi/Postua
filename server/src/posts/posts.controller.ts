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
import { PageOptionsDto } from 'src/page/dto/page-options.dto';
import { PageDto } from 'src/page/dto/page.dto';

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
  findAll(@Query() pageOptionsDto: PageOptionsDto, @UserId() id?: number) {
    return this.postsService.findAll(pageOptionsDto, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/popular')
  @ApiResponse({ type: PageDto<PostDto> })
  popular(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('period') period: string = 'today',
    @UserId() id?: number,
  ) {
    return this.postsService.popular(pageOptionsDto, period, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/fresh')
  @ApiResponse({ type: PageDto<PostDto> })
  fresh(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('rating') rating: string = 'from5',
    @UserId() id?: number,
  ) {
    return this.postsService.fresh(pageOptionsDto, rating, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/saved')
  get(@Query() pageOptionsDto: PageOptionsDto, @UserId() id: number) {
    return this.postsService.saved(pageOptionsDto, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/user/:userId')
  profile(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('userId') id: string,
    @UserId() userId?: number,
  ) {
    return this.postsService.userProfile(pageOptionsDto, +id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId?: number) {
    return this.postsService.findOne(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/category/:category')
  getByCategory(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('category') category: string,
    @UserId() userId?: number,
  ) {
    return this.postsService.getByCategory(pageOptionsDto, category, userId);
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
