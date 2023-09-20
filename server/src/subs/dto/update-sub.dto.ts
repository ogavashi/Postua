import { PartialType } from '@nestjs/swagger';
import { CreateSubDto } from './create-sub.dto';

export class UpdateSubDto extends PartialType(CreateSubDto) {}
