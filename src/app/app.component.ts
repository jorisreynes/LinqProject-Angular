import { Component } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/game.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChessGameAnalyzer.IU';

  gamesResult = new Game();
  numberOfGames = 0;
  totalNumberOfGames: number = 0;

  //selectedValue = 'option1';

  constructor(private gameService: GameService, private http: HttpClient) {}

  ngOnInit(): void {}

  // For select opening
  selectedOpening = 'All openings';
  onSelectedOpening(opening: string, color: string): void {
    //this.selectedOpening = opening;
    //alert(this.selectedOpening + ' ' + this.selectedColor);
    this.getGames(opening, color);
  }

  // For select opening
  selectedColor = 'All games';
  onSelectedColor(opening: string, color: string): void {
    //this.selectedColor = color;
    //alert(this.selectedOpening + ' ' + this.selectedColor);
    this.getGames(opening, color);
  }

  getGames(opening: string, color: string): void {
    // call the service
    //alert(opening + ' ' + color);
    this.gameService
      //.getGames(this.selectedOpening, this.selectedColor)
      .getGames(opening, color)
      .subscribe((result) => {
        this.gamesResult = result;
        this.totalNumberOfGames =
          result.numberOfGamesWonWithWhite +
          result.numberOfGamesDrawnWithWhite +
          result.numberOfGamesLostWithWhite +
          result.numberOfGamesWonWithBlack +
          result.numberOfGamesDrawnWithBlack +
          result.numberOfGamesLostWithBlack;
      });
  }

  // For upload file
  fileName = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);

      const upload$ = this.http.post(
        'https://localhost:7170/api/upload',
        formData
      );
      upload$.subscribe();
    }
  }
}
