/**
 * Created by Housseini  Maiga on 6/5/2017.
 */
import {Pipe} from '@angular/core';

@Pipe({
  name: 'formattext'
})
export class FormatTextPipe {
  transform(value, args) {
    let urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;
    // let urlRegex2 = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/g;
    // let underlineRegex = /(\_{1}[^\_<>]+\_{1})/g;
    let underlineRegex = /(\_{1}[^\_]+\_{1})/g;
    // let boldRegex = /(\*{1}[^\*<>]+\*{1})/g;
    let boldRegex = /(\*{1}[^\*]+\*{1})/g;
    // let italicRegex = /(\/{1}[^\/<>]+\/{1})/g;
    let italicRegex = /(\/{1}[^\/]+<\/([a-z]+)>[^\/]*\/{1})|(\/{1}[^\/<>]+\/{1})/g;
    // let italicRegex = /(^\/{1}[^\/]+\/{1})|([\s]\/{1}[^\/<>]+\/{1})/g;
    // let strikeRegex = /(\~{1}[^\~<>]+\~{1})/g;
    let strikeRegex = /(\~{1}[^\~]+\~{1})/g;

    let codeIndentRegex = /(\#{1}[^\~]+\#{1})/g;

    // <\/([a-z]+)>
    // <([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)


    return value
      .replace(urlRegex, function (url) {
        let url2 = url.replace(/\//g , function (d) {
          return '===='
        });
        return '<a target="_blank" href="' + url2 + '">' + url2 + '</a>';
      }).replace(boldRegex, function (str) {
        let newStr = str.substr(1, str.length - 2);
        // console.log(str,newStr);
        return '<b>' + newStr + '</b>';
      })
      .replace(underlineRegex, function (str) {
        let newStr = str.substr(1, str.length - 2);
        // console.log(str,newStr);
        return '<u>' + newStr + '</u>';
      })
      .replace(strikeRegex, function (str) {
        let newStr = str.substr(1, str.length - 2);
        // console.log(str,newStr);
        return '<s>' + newStr + '</s>';
      })
      .replace(italicRegex, function (str) {
        let newStr = str.substr(1, str.length - 2);
        // console.log(str,newStr);
        return '<i>' + newStr + '</i>';
      })
      .replace(codeIndentRegex, function (str) {
        let newStr = str.substr(1, str.length - 2);
        console.log(str,newStr);
        return  '<pre> <span style="font-family:Courier">' + newStr + '</span></pre>';
      })
      .replace(/====/g, function (d) {
        return '/';
      });
  }
}
