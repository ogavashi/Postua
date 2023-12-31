import { Controller, UseGuards, Get, Query } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { CustomJwtAuthGuard } from 'src/auth/guards/custom.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get()
  create(@UserId() id: number, @Query('search') search: string) {
    return this.searchService.search(search, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/category')
  byCategory(
    @UserId() id: number,
    @Query('search') search: string,
    @Query('category') category: string,
  ) {
    return this.searchService.searchByCategory(search, category, id);
  }

  @ApiBearerAuth()
  @UseGuards(CustomJwtAuthGuard)
  @Get('/category/tag')
  byTag(
    @UserId() id: number,
    @Query('tag') tag: string,
    @Query('filter') filter: string,
  ) {
    return this.searchService.searchByTag(tag, filter, id);
  }
}
