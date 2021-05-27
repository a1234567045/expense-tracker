const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: String,
  date: string,
  amount: string,
  totalAmount: string,
})
module.exports = mongoose.model('Record', recordSchema)