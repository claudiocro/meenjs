'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

if (!ArticleSchema.options.toJSON) ArticleSchema.options.toJSON = {};
ArticleSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;

  ret.user = ret.user.id;
  //delete ret.user;
}

if (!ArticleSchema.options.toObject) ArticleSchema.options.toObject = {};
ArticleSchema.options.toObject.transform = function (doc, ret, options) {
  ret._id = ret.id;
  delete ret.id;
}


mongoose.model('Article', ArticleSchema);
