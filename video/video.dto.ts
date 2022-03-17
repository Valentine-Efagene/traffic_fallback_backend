import { CreateAdDto } from './../ad/ad.dto';
export interface VideoDto {
  video_img: string,
  brand_img: string,
  message: string | CreateAdDto
}

export interface CreateVideoDto {
  video_img: string,
  brand_img: string,
  message: string
}

export interface PatchVideoDto extends Partial<CreateVideoDto> { }