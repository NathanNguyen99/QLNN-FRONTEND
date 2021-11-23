import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe',
  pure: false
})
export class MomentPipe implements PipeTransform {

  constructor() { }

  transform(value: string, dateFormat: string): any {

    if (moment(value, moment.ISO_8601, true).isValid())
      return moment(value).format(dateFormat);

      // if (this.isValidDate(value))
      //   return moment(value).format(dateFormat);
      // else
        return value;
    }

    isValidDate(value: any): boolean {
      var dateWrapper = new Date(value);
      return !isNaN(dateWrapper.getDate());
  }
}