import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchResult: Result[];
  label = 'Play';
  audio: HTMLAudioElement;
  id: number;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.src = '../assets/music/Dil Diyan Gallan - 320Kbps.mp3';
  }

  onButtonClick(value) {
    if (value === 'Pause') {
      this.label = 'Play';
      this.audio.pause();
    } else {
      this.label = 'Pause';
      this.audio.play();
    }
  }

  searchItem(val) {
    this.http.get<ItunesSearchResponse>(`https://itunes.apple.com/search?term=${val}&media=music`)
      .subscribe(res => {
        this.searchResult = res.results.filter(
          obj => obj.trackName.toLowerCase().includes(val.toLowerCase())
        );
        console.log(res);
      });
  }

  onSongSelect(song: Result, id) {
    this.audio.src = song.previewUrl;
    this.onButtonClick('Play');
    this.id = id;
  }

}
