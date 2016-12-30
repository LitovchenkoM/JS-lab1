var request = require('request');
var url = 'http://www.mosigra.ru/';
var emails = [];
var links = [];
links.push(url);
var url_new = links[0];
request(url_new, function (err, res, body) {
    if (err) throw err; // если ошибка выводи ошибку
    for (var j = 0; j < 10; j++) {
        url_new = links[j];
        var http = body.match(/<a href="(http\:\/\/[-+\w.\/$#%]+)\"/ig);
        for (var x in http) {
            var sub = http[x].substr(9, http[x].length - 10);
            if (sub.startsWith(url))
                if (!(links.includes(sub))) {
                    links.push(sub);
                }
        }
        var incomplete = body.match(/<a href="(\/[-+\w:\/#@$.]*)\"/ig);
        for (var x in incomplete) {
            url_new = url + incomplete[x].substr(10, incomplete[x].length - 11);
            if (!(links.includes(url_new))) {
                links.push(url_new);
            }
        }
        var email = body.match(/[a-zA-Z0-9][-_\w]+[.\w+]*\@[a-zA-Z0-9][-_a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}/ig); //i не различать заглавные и строчные, g -возврат массива
        for (var x in email) {
            if (!(emails.includes(email[x]))) {
                emails.push(email[x]);
                console.log(email[x]);
            }
            //else console.log('est takoy uge');
        }
    }
});