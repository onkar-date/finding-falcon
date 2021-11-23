import { MissionComponent } from './../mission/mission.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: MissionComponent
          }
        ])
      ],
      declarations: [ ResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test startAgain method', () => {
    component.startAgain()
    expect(component).toBeTruthy();
  });
  it('should test clearConfetti method', () => {
    component.clearConfetti();
    const canvasEle = document.getElementById('my-canvas');
    expect(canvasEle.style.zIndex).toEqual('unset');
  });
});
