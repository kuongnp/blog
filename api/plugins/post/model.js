'use strict';
//follow here: https://docs.ghost.org/api/content/#pages
//https://codex.wordpress.org/images/2/25/WP4.4.2-ERD.png

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    excerpt: { type: String },
    content: { type: String, required: true },
    status: { type: Number , required: true }, //1 publish, 2 unpublish, 0 deleted
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    published_at: { type: Date },
    is_page: { type: Boolean, default: false },
    feature_image: { type: String },
    featured: { type : Boolean, default: false },
    seo: {type: Schema.Types.ObjectId, ref:'Seo',autopopulate: true},
    categories:[{type: Schema.Types.ObjectId, ref:'Category',autopopulate: true}],
    tags:[{type: Schema.Types.ObjectId, ref:'Tag',autopopulate: true}],
    authors:[{type: Schema.Types.ObjectId, ref:'User',autopopulate: true}],
    comments: [{type: Schema.Types.ObjectId, ref:'Comment',autopopulate: true}]

});

module.exports = mongoose.model('Post', modelSchema);
