const hide = require('create-nodew-exe');
const upx = require('upx')({ best : true , overlayCopy	: true }); // see options below
const { exec } = require('pkg');


( async () => {

    await exec([ 'app.js', '--target', 'node13-win-x64', '--output', 'app.exe' ]) ;
    
    /*await hide({
        src: './app.exe',
        dst: './HoneyGain.exe',
    })*/

    await upx('./app.exe')
        .output('Compressed.exe')
        .start().then(function (stats) {
            console.log(stats);
        }).catch(function (err) {
            console.log(err);
        })

})();