import { Req, Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, InternalServerErrorException } from '@nestjs/common';
// decorador de OpenAPI para agrupar los endpoints en Swagger UI
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'; 

import { CamerasService } from './cameras.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';

@Controller('cameras')
@ApiTags('Cameras') // agrupar los endpoints para una etiqueta en Swagger UI

export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cámara '})
  async create(@Body() createCameraDto: CreateCameraDto) {
    return await this.camerasService.create(createCameraDto);
  }

  // incluir un parámetro con un objeto Request para acceder a los parámetros de la consulta en la URL
  @Get()
  @ApiOperation({ summary: "Obtener todas las cámaras con filtros opcionales "})
  async findAll(@Query() query: any) {
    return await this.camerasService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cámara por ID' })
  @ApiResponse({ status: 200, description: 'Cámara encontrada' })
  @ApiResponse({ status: 404, description: 'Cámara no encontrada' })
  async findOne(@Param('id') id: string) {
    try{
      const camera = await this.camerasService.findOne(id);
      if (!camera){
        throw new NotFoundException(`Cámara con ID ${id} no encontrada`);
      }
      return camera;
    } catch (error) {
      throw new InternalServerErrorException("Error al obtener la cámara")
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Eliminar una cámara por ID' })
  async update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return await this.camerasService.update(id, updateCameraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cámara por ID' })
  async remove(@Param('id') id: string) {
    return await this.camerasService.remove(id);
  }
}
