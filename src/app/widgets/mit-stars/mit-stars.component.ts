import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-mit-stars',
  templateUrl: './mit-stars.component.html',
  styleUrls: ['./mit-stars.component.scss']
})
export class MitStarsComponent implements OnInit {
  public rateStar:any;
  @Input() starNum:any;
  constructor() { }

  ngOnInit() {
    console.log(this.starNum)
    this.setStyle(this.starNum);
  }

  setStyle(num){
    if(num>=90){
      this.rateStar = 100 + '%';
    }else if(num >= 80 && num < 90){
      this.rateStar = 80 + '%';
    }
    else if(num >= 70 && num < 80){
      this.rateStar = 60 + '%';
    }
    else if(num >= 60 && num < 70){
      this.rateStar = 40 + '%';
    }
    else if(num < 60){
      this.rateStar = 20 + '%';
    }
  }
}
