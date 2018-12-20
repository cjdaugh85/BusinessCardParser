'use strict';

const rssService = require('./services/rssService');
const authService = require('./services/authorizationService');
const downloadService = require('./services/downloadService');
const fsService = require('./services/fsService');
const randomString = require('randomstring');

const dest = __dirname + '/downloads';

const onErr = (fnName, err) => {
    console.error(`${fnName} ERROR ${JSON.stringify(err, null, 2)}`);
    return err;
};

const onSuccess = (fnName, results) => {
    console.log(`${fnName} Results ${JSON.stringify(results, null, 2)}`);
    return results;
};

const queryRss = async () => {
    const methodName = 'queryRss';

    rssService.query('https://www.f4wradio.com/feed/wor.rss')
        .then((res) => {
            return onSuccess(methodName, res);
        }).catch((err) => {
        return onErr(methodName, err);
    });
};

const download = async () => {
    const auth = {
        username: 'zzz',
        password: 'xxx'
    };

    let url = `https://${auth.username}:${auth.password}@f4wradio.com/podcast/121718wo.mp3`;

    const fileLocation = await downloadService.downloadFile(dest, `${randomString.generate(7)}.mp3`, url, auth);

    return fileLocation;
};

const run = async () => {
    console.log(`Process Starting`);
    fsService.emptyDir(dest);
    // const queryResults = await queryRss();
    const fileLocation = await download();

    console.log(`Process Finished`);

    return fileLocation;
};

run().then((results) => {
    console.log('Complete!');
    process.exit(0)
}).catch((err) => {
    console.log(`Final Results: ${JSON.stringify(err, null, 2)}`);
    process.exit(2)
});



