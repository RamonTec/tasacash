import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ratesSchema = new Schema({
    currency: String,
    weightedAverageBuy: Number,
    minbuy: Number,
    maxbuy: Number,
    buyVolume : Number,
    minsell: Number,
    maxsell: Number,
    weightedAverageSell: Number,
    sellVolume: Number,
    volumeBTC: Number,
    date: Date
},{collection: 'rates' });

const vesSchema = new Schema({
    tid: Number,
    currency: String,
    price: Number,
    amount: Number,
    date: String,
    epoch: Number 
},{collection: 'ves' });

const usdSchema = new Schema({
    tid: Number,
    currency: String,
    price: Number,
    amount: Number,
    date: String,
    epoch: Number
},{collection: 'usd'});

const eurSchema = new Schema({
    tid: Number,
    currency: String,
    price: Number,
    amount: Number,
    date: String,
    epoch: Number
},{collection: 'eur'});
 
module.exports = mongoose.model('rates', ratesSchema);
