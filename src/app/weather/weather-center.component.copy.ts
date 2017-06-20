// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, forwardRef, Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Hero, WeatherService } from './weather.service';
import { AppState } from './../app.service';
import { MainComponent } from './../main/main.component';
let echarts = require('echarts');
var myChart;
declare var $;
var data = [[50, 0], [55, 23], [60.75, 44], [68.24, 63.46], [80.97, 83.78], [95, 98], {
  value: [110, 105],
  symbol: 'image://../assets/img/sun.png',
  symbolSize: 50
}, [116, 105.80], [122.37, 105.50], [139.93, 100.50], [155.63, 91.86]
  , [177.10, 75.00], [197.56, 55.00], [200, 52]];
var fielddata = [[0, 50], [20, 60], [45, 90], [50, 93], [55, 94], [65, 90], [75, 80], [80, 75], [100, 60], [125, 50], [150, 53], [175, 40], [200, 30]];
var tideBottom = 0;
@Component({
  templateUrl: 'weather-center.component.html',
  styleUrls: [
    './weather.component.css'
  ]
})
export class WeatherCenterComponent implements OnInit {
  public homeControl: MainComponent;
  constructor(
    private service: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
    public appState: AppState,
    public injector: Injector
  ) {
    try {
      this.homeControl = this.injector.get(forwardRef(() => MainComponent));
      this.homeControl.registerOnMenuclick(() => {
        // var cursor = $('#cursor');
        // var line = $('#line');
        // cursor.css('display', 'none');
        // line.css('display', 'none');
      })
    } catch (error) {

    }
  }
  ngOnInit() {
    myChart = echarts.init(document.getElementById('tide'));
    $('#tide').resize(() => {
      myChart.resize();
      setTimeout(function () {
        calculatePos('top', [50, 93]);
        calculatePos('bottom', [200, 30]);
        matchBottomTime([50, 0], [110, 105]);
      }, 0);
    })
    $('.sidebar-toggle').bind('click', function() {
      console.log('~~~~~~~~~~~~~~')
      if (window.innerWidth <= 767) {
        setTimeout(function () {
          calculatePos('top', [50, 93]);
          calculatePos('bottom', [200, 30]);
          matchBottomTime([50, 0], [110, 105]);
        }, 1000);
      }
    })
    var symbolSize = 10;
    let option = {
      title: {
        text: '27th December',
        textStyle: {
          fontSize: 30,
          fontWeight: 'bolder',
          color: 'gray'
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
        max: 150,
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
              areaStyle: { type: 'default', color: '#87cae0' },
              color: '#87cae0',
              borderWidth: 0
            }
          },
          data: fielddata
        },
        {
          id: 'a',
          type: 'line',
          smooth: true,
          symbolSize: 0,
          data: data,
          itemStyle: {
            normal: {
              color: '#da911e',
              lineStyle: {
                color: '#da911e',
                width: '5'
              }
            },
          }
        }
      ]
    };


    setTimeout(function () {
      // Add shadow circles (which is not visible) to enable drag.
      myChart.setOption({
        graphic: echarts.util.map(data, function (item, dataIndex) {
          return {
            type: 'circle',
            position: myChart.convertToPixel('grid', item),
            shape: {
              cx: 0,
              cy: 0,
              r: symbolSize / 2
            },
            invisible: true,
            z: 100
          };
        })
      });
    }, 0);

    window.addEventListener('resize', updatePosition);
    function updatePosition() {
      myChart.setOption({
        graphic: echarts.util.map(data, function (item, dataIndex) {
          return {
            position: myChart.convertToPixel('grid', item)
          };
        })
      });
      myChart.resize();
      setTimeout(function() {
        calculatePos('top', [50, 93]);
        calculatePos('bottom', [200, 30]);
        matchBottomTime([50, 0], [110, 105]);
      }, 0);
    }
    myChart.setOption(option);
    function calculatePos(str, pos) {
      var demowindow = $(`#${str}`);
      var position = myChart.convertToPixel('grid', pos);
      demowindow.css('display', 'block');
      demowindow.css('height', window.innerWidth <= 767 ? 60 : 80);
      demowindow.css('width', window.innerWidth <= 767 ? 100 : 120);
      var selfWidth = demowindow.outerWidth();
      console.log($('.main-header').outerHeight());

      // var top = ($('.root').height() || 0) + ($('.main-header').outerHeight()) + ($('.headerline').height() || 0);
      // top += $('.ss-fn').is(":visible") ? ($('.ss-fn').height() || 0) : 0;

      // var menuwidth = $('.main-sidebar').outerWidth() || 0;
      // var left = position[0] + menuwidth - selfWidth / 2;
      // if (window.innerWidth <= 767) {
      //   left -= menuwidth;
      // }
      var left = position[0] - selfWidth / 2;
      demowindow.css('left', left);
      var mBottom = ($('#tide').height() || 0) - position[1] + ($('.tide-sun-footer').height() || 0);
      // demowindow.css('top', position[1] + top - demowindow.height() / 2);
      console.log('bottom ' + position[1] + ',left ' + mBottom);

      demowindow.css('bottom', mBottom - demowindow.height() / 2);
    }
    function matchBottomTime(posfrom, posto) {
      var sunfrom = $(`#sunfrom`);
      var sunto = $(`#sunto`);
      var sunfromWidth = sunfrom.outerWidth();
      var sunfromTo = sunto.outerWidth();
      var positionFrom = myChart.convertToPixel('grid', posfrom);
      var positionTo = myChart.convertToPixel('grid', posto);
      // console.log(positionFrom[0] + ',' + positionTo[0]);
      sunfrom.css('display', 'block');
      sunfrom.css('margin-left', positionFrom[0] - sunfromWidth / 2);
      sunto.css('display', 'block');
      sunto.css('margin-left', positionTo[0] - positionFrom[0] - sunfromWidth / 2 - sunfromTo / 2);
      var cursor = $('#cursor');
      cursor.css('display', 'block');
      // var top = ($('.root').height() || 0) + ($('.main-header').outerHeight()) + ($('.headerline').height() || 0) + ($('#tide').height() || 0);
      // top += $('.ss-fn').is(":visible") ? ($('.ss-fn').height() || 0) : 0;

      var marginbottom = $('.tide-sun-footer').height() || 0;
      // var menuwidth = $('.main-sidebar').outerWidth() || 0;
      // var bottomleft = positionTo[0] + menuwidth;

      // if (window.innerWidth <= 767) {
      //   bottomleft -= menuwidth;
      // }
      cursor.css('left', positionTo[0] - 20);
      // cursor.css('top', top - 20);
      cursor.css('bottom', marginbottom);
      var line = $('#line');
      line.css('display', 'block');
      line.css('left', positionTo[0] - 1);
      // line.css('top', top - ($('#tide').height() || 0) + 100 - 20);
      line.css('bottom', marginbottom);
      line.css('height', ($('#tide').height() || 0) - 100);
    }
    calculatePos('top', [50, 93]);
    calculatePos('bottom', [200, 30]);
    matchBottomTime([50, 0], [110, 105]);
  }



  public onResize(event) {
    myChart.resize();
    myChart.setOption({
      graphic: echarts.util.map(data, function (item, dataIndex) {
        return {
          position: myChart.convertToPixel('grid', item)
        };
      })
    });
  }

}
