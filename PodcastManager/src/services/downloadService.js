const axios = require('axios');
const fs = require('fs');
const fileDownload = require('js-file-download');

const axiosRequest = async (auth, url, dest) => {

    try {
        const results = await axios.get(url, {responseType: 'blob', onDownloadProgress: (env) => {
            console.log(`hello`)
            }});

        console.log(`axiosRequest results ${results}`);

        const x = fileDownload(results.data, dest);

        return x;
    } catch(err) {
        return err;
    }
};

const downloadFile = async (destination, fileName, url, auth) => {
    const filePath = `${destination}/${fileName}`;

    const file = fs.createWriteStream(filePath , {autoClose: true});

    try {
        const res = await axiosRequest(auth, url, destination);

        console.log(`downloadFile results ${res}`);

        res.data.pipe(file);

        return file.path;
    } catch (err) {
        console.log(`downloadFile error ${err}`);

        return err;
    }
};

module.exports = {
  downloadFile
};