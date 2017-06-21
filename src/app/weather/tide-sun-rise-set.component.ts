// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from './weather.service';
let echarts = require('echarts');
declare var $;
let tideBottom = 0;
const screenDiv = 767;
@Component({
  templateUrl: 'tide-sun-rise-set.component.html',
  selector: 'tide-sunrise-sunset',
  styleUrls: [
    './weather.component.css'
  ]
})
export class TideSunriseAndSunsetComponent implements OnInit, OnDestroy {
  public myChart;
  public symbolSize = 10;
  public minterval;
  public maxMin;
  constructor(
    private service: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.maxMin = this.service.getMaxMinTemplate();
  }
  ngOnInit() {
    this.myChart = echarts.init(document.getElementById('tide'));
    $('#tide').resize(() => {
      this.myChart.resize();
      setTimeout(() => {
        this.cal();
      }, 0);
    })
    $('.sidebar-toggle').bind('click', () => {
      if (window.innerWidth <= screenDiv) {
        setTimeout(() => {
          this.cal();
        }, 300);
      }
    })

    let option = this.getOption();

    setTimeout(() => {
      this.myChart.setOption({
        graphic: echarts.util.map(this.service.getSunBaseLine(), (item, dataIndex) => {
          return {
            type: 'circle',
            position: this.myChart.convertToPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: this.symbolSize / 2
            },
            invisible: true,
            z: 100
          };
        })
      });
    }, 0);

    window.addEventListener('resize', () => {
      this.myChart.setOption({
        graphic: echarts.util.map(this.service.getSunBaseLine(), (item, dataIndex) => {
          return {
            type: 'circle',
            position: this.myChart.convertToPixel('grid', item)
          };
        })
      });
      this.myChart.resize();
      setTimeout(() => {
        this.cal();
      }, 0);
    });

    this.myChart.setOption(option);
    this.cal();
  }

  public getOption() {
    return {
      title: {
        text: '27th December',
        textStyle: {
          fontSize: 30,
          fontWeight: 'bolder',
          color: '#666666'
        },
        x: 'center'
      },
      tooltip: {
        triggerOn: 'none',
        formatter: function (params) {
          return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
        }
      },
      grid: {
        left: 0, right: 0, bottom: tideBottom
      },
      xAxis: {
        min: 0,
        max: 200,
        splitLine: {
          show: false
        },
        type: 'value',
        show: false,
        axisLine: { onZero: false }
      },
      yAxis: {
        min: 0,
        max: 200,
        show: false,
        splitLine: {
          show: false
        },
        type: 'value',
        axisLine: { onZero: false }
      },
      series: [
        {
          id: 'b',
          type: 'line',
          smooth: true,
          symbolSize: 0,
          itemStyle: {
            normal: {
              areaStyle: { type: 'default', color: '#aae1f6' },
              color: '#aae1f6',
              borderWidth: 0
            }
          },
          data: []
        },
        {
          id: 'a',
          type: 'line',
          smooth: true,
          symbolSize: 0,
          data: this.service.getSunBaseLine(),
          itemStyle: {
            normal: {
              color: '#ff9f30',
              lineStyle: {
                color: '#ff9f30',
                width: '5'
              }
            },
          }
        }
      ]
    }
  }

  public calculatePos(str, pos, time) {
      let demowindow = $(`#${str}`);
      let position = this.myChart.convertToPixel('grid', pos);
      demowindow.css('display', 'block');
      demowindow.css('height', window.innerWidth <= screenDiv ? 60 : 80);
      demowindow.css('width', window.innerWidth <= screenDiv ? 100 : 120);
      let selfWidth = demowindow.outerWidth();
      let left = position[0] - selfWidth / 2;
      demowindow.css('left', left);
      let mBottom = ($('#tide').height() || 0) - position[1] + ($('.tide-sun-footer').height() || 0);
      demowindow.css('bottom', mBottom - demowindow.height() / 2);
    }
    public matchBottomTime(posfrom, posto) {
      let sunfrom = $(`#sunfrom`);
      let sunto = $(`#sunto`);
      let sunfromWidth = sunfrom.outerWidth();
      let sunfromTo = sunto.outerWidth();
      let positionFrom = this.myChart.convertToPixel('grid', posfrom);
      let positionTo = this.myChart.convertToPixel('grid', posto);
      sunfrom.css('display', 'block');
      sunfrom.css('margin-left', positionFrom[0] - sunfromWidth / 2);
      sunto.css('display', 'block');
      sunto.css('margin-left', positionTo[0] - positionFrom[0] - sunfromWidth / 2 - sunfromTo / 2);
      let cursor = $('#cursor');
      cursor.css('display', 'block');

      let marginbottom = $('.tide-sun-footer').height() || 0;
      cursor.css('left', positionTo[0] - 20);
      cursor.css('bottom', marginbottom);
      let line = $('#line');
      line.css('display', 'block');
      line.css('left', positionTo[0] - 1);
      line.css('bottom', marginbottom);
      line.css('height', ($('#tide').height() || 0) - 100);
    }
    public markSun(pos) {
      let sun = $(`#sun`);
      let position = this.myChart.convertToPixel('grid', pos);
      sun.css('display', 'block');
      sun.css('height', window.innerWidth <= screenDiv ? 60 : 80);
      sun.css('width', window.innerWidth <= screenDiv ? 60 : 80);
      let selfWidth = sun.outerWidth();
      let left = position[0] - selfWidth / 2;
      sun.css('left', left);
      let mBottom = ($('#tide').height() || 0) - position[1] + ($('.tide-sun-footer').height() || 0);
      sun.css('bottom', mBottom - sun.height() / 2);
    }


    public cal() {
      this.markSun([110, 105]);
      this.matchBottomTime([50, 0], [110, 105]);
      this.getFieldData();
      this.clearMInterval();
      this.minterval = setInterval(() => {
        this.getFieldData();
      }, 5 * 1000);
    }

    public getFieldData() {
      this.service.getField().then(result => {
          this.maxMin = result;
          let option = this.getOption();
          option.series[0].data = result['field'];
          this.myChart.setOption(option);
          this.calculatePos('top', result['minMaxPos'][0], this.maxMin.max.time);
          this.calculatePos('bottom', result['minMaxPos'][1], this.maxMin.min.time);
      })
    }

    public clearMInterval() {
      if (this.minterval) {
        try {
          clearInterval(this.minterval);
        } catch (error) {

        }
      }
    }

    public ngOnDestroy() {
      this.clearMInterval();
    }

}
