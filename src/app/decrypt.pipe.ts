import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {
  secretKey = "MohanSecretKey";

  transform(value: string): string {
    return CryptoJS.AES.decrypt(value, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

}
