const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_cn: { type: String, required: true },
  iconClass: { type: String, require: true }
})

module.exports = mongoose.model('Category', categorySchema)