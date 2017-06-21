import { Injectable } from '@angular/core';
let fielddata = [[0, 50], [20, 60], [45, 90], [50, 93], [55, 94], [65, 90], [75, 80]
  , [80, 75], [100, 60], [125, 50], [150, 53], [175, 40], [199.5, 30]];
let minMax = [[55, 94], [199.5, 30]];
let fielddata1 = [[0, 100], [20, 115], [45, 95], [50, 80], [55, 70], [65, 63], [75, 65]
  , [80, 70], [100, 75], [125, 60], [150, 53], [175, 40], [199.5, 30]];
let minMax1 = [[20, 115], [199.5, 30]];
let fielddata2 = [[0, 58], [17.61, 69.39], [31.70, 78.17], [46.81, 83.61], [61.12, 80.43], [75.90, 71.22], [97.07, 60.87]
  , [116.17, 57.26], [136.17, 64.87], [154.79, 75.39], [174.73, 65.87], [186.17, 52.17], [199.5, 30]];
let minMax2 = [[46.81, 83.61], [199.5, 30]];
let fielddata3 = [[0, 50], [20.53, 57.43], [35.95, 60.51], [48.93, 65.43], [61.38, 74.12], [69.78, 82.30], [79.78, 86.41]
  , [90.63, 80.76], [105.05, 67.69], [122.60, 55.12], [146.01, 44.67], [176.06, 56.02], [199.5, 72.30]];
let minMax3 = [[79.78, 86.41], [146.01, 44.67]];
let fielddata4 = [[0, 90], [20, 57], [35.96, 43.85], [55.05, 34.67], [68.3, 30.54], [81.5, 29.10], [97.87, 28.72], [115.11, 42.95]
  , [131.65, 70.9], [148.40, 78.21], [163.82, 67.10], [176.06, 56.06], [199.5, 39]];
let minMax4 = [[0, 90], [97.87, 28.72]];

let fields = [fielddata, fielddata1, fielddata2, fielddata3, fielddata4];
let minMaxs = [minMax, minMax1, minMax2, minMax3, minMax4];
let fieldPromise = Promise.resolve(fields);

let sunLine = [[50, 0], [55, 23], [60.75, 44], [68.24, 63.46], [80.97, 83.78], [95, 98], [110, 105], [116, 105.80], [122.37, 105.50], [139.93, 100.50], [155.63, 91.86]
  , [177.10, 75.00], [197.56, 55.00], [200, 52]];
@Injectable()
export class WeatherService {
  // public getFileds() { return fieldPromise; }
  // public getFiled(id: number | string) {
  //   return fieldPromise
  //     .then(fields => fields.find(field => field.id === +id));
  // }
  public pxTime = {
    1: 3,
    50: 7,
    100: 11,
    150: 15,
    200: 19,
  }
  public meterRate = 10;
  public getMaxMinTemplate() {
    return {
      max: {
        time: [0, 0],
        timeUnit: ' am',
        meter: 0,
        meterUnit: ' m'
      },
      min: {
        time: [0, 0],
        timeUnit: ' am',
        meter: 0,
        meterUnit: ' m'
      }
    };
  }
  public getField(): Promise<any> {
    return new Promise<any>(resolve => {
      let result = this.getMaxMinTemplate();
      try {
        let index = Math.floor(Math.random() * 4);
        result['field'] = fields[index];
        result['minMaxPos'] = minMaxs[index];
      } catch (error) {
        result['field'] = fields[0];
        result['minMaxPos'] = minMaxs[0];
      } finally {
        result.max.time = this.convertToTimeFromPx(result['minMaxPos'][0][0]);
        result.min.time = this.convertToTimeFromPx(result['minMaxPos'][1][0]);
        if (Number(result.max.time[0]) > 12) {
          result.max.timeUnit = ' pm';
          result.max.time[0] = result.max.time[0] - 12;
        }
        if (Number(result.min.time[0]) > 12) {
          result.min.timeUnit = ' pm';
          result.min.time[0] = result.min.time[0] - 12;
        }
        result.max.meter = this.convertToMeterFromPx(result['minMaxPos'][0][1]);
        result.min.meter= this.convertToMeterFromPx(result['minMaxPos'][1][1]);
        resolve(result);
      }
    });
  }

  public getSunBaseLine() {
    return sunLine;
  }

  public convertToTimeFromPx(px) {
    let hourBetween = 4 * 60;
    let hourPx = 50;
    let nearest;
    let tmp;
    for (let near in this.pxTime) {
      if (!nearest) {
        let nearNum = Number(near);
        if (px === nearNum) {
          nearest = nearNum;
        } else if (px > nearNum) {
          tmp = nearNum;
        }
      }
    }
    if (Number(tmp) >= 0) {
      nearest = tmp;
    }
    let cal = (px % 50) * hourBetween / hourPx;
    let turnHour = Math.floor(cal / 60);
    let turnMin = Math.ceil(cal % 60);
    let turnResult = (this.pxTime[nearest] + turnHour) + ':' + turnMin;
    console.log('turnResult ' + turnResult);
    return [this.pxTime[nearest] + turnHour, turnMin];
  }

  public convertToMeterFromPx(px) {
    return Number(parseFloat((px / this.meterRate).toString()).toFixed(1));
  }
}
