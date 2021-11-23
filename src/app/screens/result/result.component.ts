import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ConfettiGenerator from 'confetti-js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: [],
})
export class ResultComponent implements OnInit {
  public confetti: ConfettiGenerator;
  planetName: string = null;
  timeTaken: number = null;
  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      this.planetName = paramMap.get('planet');
      this.timeTaken = Number(paramMap.get('time'));
    });
  }

  ngOnInit(): void {
    this.showConfetti();
  }

  showConfetti() {
    const canvasEle = document.getElementById('my-canvas');
    if (canvasEle) {
      canvasEle.style.zIndex = '999';
    }
    var confettiSettings = { target: 'my-canvas' };
    this.confetti = new ConfettiGenerator(confettiSettings);
    this.confetti.render();
    setTimeout(() => {
      this.clearConfetti();
    }, 3000); // Stop confetti after 3 seconds
  }

  clearConfetti() {
    const canvasEle = document.getElementById('my-canvas');
    if (canvasEle) {
      canvasEle.style.zIndex = 'unset';
    }
    this.confetti?.clear();
  }

  startAgain() {
    this.router.navigate(['mission']);
  }

}
