import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOption';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
        ): Board {
            return this.boardsService.createBoard(createBoardDto)
    }

    @Get('/:id')
    getBoardId(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id)
    }

    @Patch(':id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}
