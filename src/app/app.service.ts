import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = {};

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  public getLocations() {
    return [
      {
        index: 0,
        name: 'Bei Jing',
        value: 'Bei Jing',
        selected: false,
        weather: {
          logo: 'icon-rain',
          text: 'Rainy',
          temperature: '26.2°C',
          wet: '50%',
        },
        quality: {
          PSI: {
            name: 'PSI',
            value: 50,
            description: 'Warning',
            color: 'gray'
          },
          RAIN: {
            name: 'RAIN',
            value: 10,
            description: 'mm'
          },
          DENGUE: {
            name: 'DENGUE',
            value: 2,
            color: 'gray'
          }
        }
      }, {
        index: 1,
        name: 'Singapore',
        value: 'Singapore',
        selected: false,
        weather: {
          logo: 'icon-sun',
          text: 'Sunny',
          temperature: '27.2°C',
          wet: '60%'
        },
        quality: {
          PSI: {
            name: 'PSI',
            value: 10,
            description: 'Perfect',
            color: 'green'
          },
          RAIN: {
            name: 'RAIN',
            value: 55,
            description: 'mm'
          },
          DENGUE: {
            name: 'DENGUE',
            value: 1,
            color: 'green'
          }
        }
      }
      , {
        index: 2,
        name: 'Current',
        value: 'Current Location',
        selected: false,
        weather: {
          logo: 'icon-cloudy2',
          text: 'Cloudy',
          temperature: '29.2°C',
          wet: '73%'
        },
        quality: {
          PSI: {
            name: 'PSI',
            value: 23,
            description: 'Good',
            color: 'green'
          },
          RAIN: {
            name: 'RAIN',
            value: 0,
            description: 'mm'
          },
          DENGUE: {
            name: 'DENGUE',
            value: 3,
            color: 'lightblue'
          }
        }
      }
    ]
  }

  public getCurrentLocation() {
    return this.getLocations()[2];
  }
}
