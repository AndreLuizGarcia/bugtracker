# BugTracker

A node.js project to get user reports about bug's on a specific project.

Modules used in this project: 

- [Express](https://expressjs.com/pt-br/)
- [Path Dirname](https://nodejs.org/api/path.html#path_path_dirname_path)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original)
- [SgMail](https://www.npmjs.com/package/@sendgrid/mail)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [GoogleSpreadSheet](https://www.npmjs.com/package/google-spreadsheet)
- [ejs](https://www.npmjs.com/package/ejs)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all necessary modules to run bugtracker.

```bash
npm install
```

## Local settings

This project has `DOC_ID` and `sendGridKey` as local variables wich is necessary to set in a .env file.

`DOC_ID` is a string that contains a key from `GoogleSpreadSheet` and `sendGridKey` is a string that contains a key from [sendgrid](https://sendgrid.com/marketing/sendgrid-services-pt/).

This project has a `bugtracker.json` file that contains my credentials from Google Cloud Platform, this is necessary to access the Google Drive API. You can get this file on your services account on GCP.

## Run
Just run `npm start` on your terminal in root folder.

## How it looks like?

![](https://github.com/AndreLuizGarcia/bugtracker/blob/master/assets/screen.png)

## License
[MIT](https://choosealicense.com/licenses/mit/)