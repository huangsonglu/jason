import { Injectable } from '@angular/core';
export class Hero {
  constructor(public id: number, public name: string) { }
}
let fielddata = [[0, 50], [20, 60], [45, 90], [50, 93], [55, 94], [65, 90], [75, 80]
                , [80, 75], [100, 60], [125, 50], [150, 53], [175, 40], [199.5, 30]];
let minMax = [[55, 94], [199.5, 30]];
let fielddata1 = [[0, 100], [20, 115], [45, 95], [50, 80], [55, 70], [65, 63], [75, 65]
                , [80, 70], [100, 75], [125, 60], [150, 53], [175, 40], [199.5, 30]];
let minMax1 = [[20, 115], [199.5, 30]];
let fielddata2 = [[0, 58], [17.61, 69.39], [31.70, 78.17], [46.81, 83.61], [61.12, 80.43], [75.90, 71.22], [97.07, 60.87]
                , [116.17, 57.26], [136.17, 64.87], [154.79, 75.39], [174.73, 65.87], [186.17, 52.17], [199.5, 30]];
let minMax2 = [[46.81, 83.61], [199.5, 30]];
let fielddata3 = [[0, 50], [20.53,57.43], [35.95,60.51], [48.93,65.43], [61.38,74.12], [69.78,82.30], [79.78,86.41]
                , [90.63,80.76], [105.05,67.69], [122.60,55.12], [146.01,44.67], [176.06,56.02], [199.5, 72.30]];
let minMax3 = [[79.78,86.41], [146.01,44.67]];
let fielddata4 = [[0, 90], [20, 57], [35.96,43.85], [55.05,34.67], [68.3,30.54], [81.5,29.10], [97.87,28.72], [115.11,42.95]
                , [131.65,70.9], [148.40,78.21], [163.82,67.10], [176.06,56.06], [199.5, 39]];
let minMax4 = [[0, 90], [97.87,28.72]];

let fields = [fielddata, fielddata1, fielddata2, fielddata3, fielddata4];
let minMaxs = [minMax, minMax1, minMax2, minMax3, minMax4];
let fieldPromise = Promise.resolve(fields);
@Injectable()
export class WeatherService {
  // public getFileds() { return fieldPromise; }
  // public getFiled(id: number | string) {
  //   return fieldPromise
  //     .then(fields => fields.find(field => field.id === +id));
  // }
  public pxTime = {
    1 : 3,
    50 : 7,
    100 : 11,
    150 : 15,
    200 : 19,
  }
  public getField() : Promise<any> {
    return new Promise<any>(resolve => {
      let result = {};
      try {
        let index = Math.floor(Math.random() * 4);
        result['field'] = fields[index];
        result['minMax'] = minMaxs[index];
        result['maxTime'] = this.convertToTimeFromPx(result['minMax'][0][0]);
        result['minTime'] = this.convertToTimeFromPx(result['minMax'][1][0]);
        resolve(result);
      } catch (error) {
        result['field'] = fields[0];
        result['minMax'] = minMaxs[0];
        result['maxTime'] = this.convertToTimeFromPx(result['minMax'][0][0]);
        result['minTime'] = this.convertToTimeFromPx(result['minMax'][1][0]);
        resolve(result);
      }
    });
  }

  public convertToTimeFromPx(px) {
    let hourBetween = 4 * 60;
    let hourPx = 50;
    let nearest;
    let tmp;
    for(let near in this.pxTime) {
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

  }
}
