const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { promisify } = require('util')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const GoogleSpreadSheet = require('google-spreadsheet')
const credentials = require('./bugtracker.json')

//configs
const docId = process.env.DOC_ID
const worksheetIndex = 0
const sendGridKey = process.env.sendGridKey


app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request, response) => {
  response.render('home')
})

app.post('/', async (request, response) => {

  try {
    const doc = new GoogleSpreadSheet(docId)
    await promisify(doc.useServiceAccountAuth)(credentials)
    const info = await promisify(doc.getInfo)()
    const worksheet = info.worksheets[worksheetIndex]
    await promisify(worksheet.addRow)({
      name: request.body.name, 
      email: request.body.email, 
      issueType: request.body.issueType,
      source: request.query.source || 'direct',
      howToReproduce: request.body.howToReproduce, 
      expectedOutput: request.body.expectedOutput, 
      receiveOutput: request.body.receiveOutput,
      userAgent: request.body.userAgent,
      userDate: request.body.userDate
    })

    // se for critico

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs

    if(request.body.issueType === 'CRITICAL') {
      sgMail.setApiKey(sendGridKey);
      const msg = {
        to: 'andre.luiz@gec.inatel.br',
        from: 'andre.luiz@gec.inatel.br',
        subject: `BUG critíco reportado por ${request.body.name}`,
        text: `O usuário ${request.body.name} reportou um problema.`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      await sgMail.send(msg);
    }


    response.render("sucesso")
  } catch (err) {
    response.send('Erro ao enviar formulário!')
    console.log(err)
  }
})

app.listen(3000, (err) => {
  if (err) {
    console.log("Aconteceu um erro", err)
  } else {
    console.log("BugTracker rodando na porta http://localhost:3000")
  }
})