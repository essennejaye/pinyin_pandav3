const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

const api = express.Router();

api.get('/', async (req, res) => {
  try {
    const doc = new GoogleSpreadsheet(
      '1nXxK9Xjg6Wuif700IF7Z4tbK_QBwiZgZQ543R0mPTU0'
    );
    doc.useApiKey(process.env.API_KEY);
    await doc.loadInfo();
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    console.log(rows[0].pinyin);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

module.exports = api;
