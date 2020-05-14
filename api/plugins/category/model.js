'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    description: { type: String },
    feature_image: { type: String },
    seo: {type: Schema.Types.ObjectId, ref:'Seo',autopopulate: true},
    status: { type: Number , required: true }, //1 publish, 2 unpublish, 0 deleted
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Category', modelSchema);
