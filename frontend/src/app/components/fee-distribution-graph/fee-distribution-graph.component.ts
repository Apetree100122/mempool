import { OnChanges, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-fee-distribution-graph',
  templateUrl: './fee-distribution-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeeDistributionGraphComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: any;
  @Input() height: number | string = 210;
  @Input() top: number | string = 20;
  @Input() right: number | string = 22;
  @Input() left: number | string = 30;

  rateUnitSub: Subscription;
  weightMode: boolean = false;
  mempoolVsizeFeesOptions: any;
  mempoolVsizeFeesInitOptions = {
    renderer: 'svg'
  };

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
    this.rateUnitSub = this.stateService.rateUnits$.subscribe(rateUnits => {
      this.weightMode = rateUnits === 'wu';
      if (this.data) {
        this.mountChart();
      }
    });
  }

  ngOnChanges() {
    this.mountChart();
  }

  mountChart() {
    this.mempoolVsizeFeesOptions = {
      grid: {
        height: '210',
        right: '20',
        top: '22',
        left: '30',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: '#ffffff66',
            opacity: 0.25,
          }
        },
        axisLabel: {
          formatter: (value) => {
            return Math.floor(this.weightMode ? value / 4 : value);
          }
        },
      },
      series: [{
        data: this.data,
        type: 'line',
        label: {
          show: true,
          position: 'top',
          color: '#ffffff',
          textShadowBlur: 0,
          formatter: (label: any) => {
            if (this.weightMode) {
              return Math.floor(label.data / 4);
            } else {
              return Math.floor(label.data);
            }
          },
        },
        smooth: true,
        lineStyle: {
          color: '#D81B60',
          width: 4,
        },
        itemStyle: {
          color: '#b71c1c',
          borderWidth: 10,
          borderMiterLimit: 10,
          opacity: 1,
        },
        areaStyle: {
          color: '#D81B60',
          opacity: 1,
        }
      }]
    };
  }

  ngOnDestroy(): void {
    this.rateUnitSub.unsubscribe();
  }
}
