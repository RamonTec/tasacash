import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  tid: Number,
  currency: String,
  price: Number,
  amount: Number,
  date: String,
  epoch: Number
});

const chandleSchema = new Schema({
  currency: String,
  opening: Number,
  closing: Number,
  min: Number,
  max: Number,
  volume: Number,
  date: String
});

const usd = new Schema({
  price: Number,
  date: String
});

export function searchTid(ordened, coin) {
  const search = currency.find({ tid: ordened, currency: coin });
  return search.then(res => {
    if (res.length == 0) {
      return 1;
    }
  });
}

export function searchForDate() {
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  let currency = ["ves", "usd", "eur", "rub", "cny"];

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  let today = yyyy + "-" + mm + "-" + dd;

  currency.forEach(element => {
    const search = currencyChandle.find({ date: today, currency: element });
    return search.then(res => {
      if (res.length == 0) {
        searchInCurrencies(element).then(async res => {
          console.log(res);
          const rates = new currencyChandle({
            currency: element,
            opening: res.uno.opening,
            closing: res.uno.closing,
            min: res.dos.min,
            max: res.dos.max,
            volume: res.tres,
            date: today
          });
          await rates.save();
        });
      } else if (res.length > 0) {
        console.log("ACTUALIZANDO");
        searchInCurrencies(element)
          .then(async res => {
            console.log(res);
            await currencyChandle.updateOne(
              { date: today, currency: element },
              {
                $set: {
                  min: res.dos.min,
                  max: res.dos.max,
                  closing: res.uno.closing,
                  volume: res.tres
                }
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  });
}

export function searchInCurrencies(coin) {
  let fecha = new Date();
  let opening =
    fecha.getFullYear() +
    "-" +
    (fecha.getMonth() + 1) +
    "-" +
    fecha.getDate() +
    " 00:00:00";
  let closing =
    fecha.getFullYear() +
    "-" +
    (fecha.getMonth() + 1) +
    "-" +
    fecha.getDate() +
    " 23:59:00";
  let volumeDateToday =
    fecha.getFullYear() +
    "-" +
    (fecha.getMonth() + 1) +
    "-" +
    fecha.getDate() +
    " " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  let dateToday = new Date(volumeDateToday);
  let myDate = dateToday.valueOf() / 1000.0;

  let epoch1 = new Date(opening);
  let epoch2 = new Date(closing);
  let myEpoch1 = epoch1.valueOf() / 1000.0;
  let myEpoch2 = epoch2.valueOf() / 1000.0;
  let obj = 0;
  let obj1 = 0;
  let max = 0;
  let completed = {};
  let vol = 0;

  const searchOpening = currency
    .find({
      $and: [
        { currency: coin, epoch: { $gte: myEpoch1 } },
        { epoch: { $lte: myEpoch2 } }
      ]
    })
    .sort({ epoch: 1 })
    .limit(1);
  return searchOpening
    .then(res => {
      if (res.length !== 0) {
        return res;
      }
    })
    .then(resp => {
      const searchClosing = currency
        .find({
          $and: [
            { currency: coin, epoch: { $gte: myEpoch1 } },
            { epoch: { $lte: myEpoch2 } }
          ]
        })
        .sort({ epoch: -1 })
        .limit(1);
      return searchClosing.then(element => {
        obj = {
          opening: resp[0].price,
          closing: element[element.length - 1].price
        };
      });
    })
    .then(() => {
      const searchClosing = currency
        .find({
          $and: [
            { currency: coin, epoch: { $gte: myEpoch1 } },
            { epoch: { $lte: myEpoch2 } }
          ]
        })
        .sort({ price: -1 })
        .limit(1);
      return searchClosing.then(element => {
        max = element[0].price;
      });
    })
    .then(() => {
      const searchClosing = currency
        .find({
          $and: [
            { currency: coin, epoch: { $gte: myEpoch1 } },
            { epoch: { $lte: myEpoch2 } }
          ]
        })
        .sort({ price: 1 })
        .limit(1);
      return searchClosing.then(element => {
        obj1 = {
          max: max,
          min: element[0].price
        };
      });
    })
    .then(() => {
      let volume = currency.aggregate([
        {
          $match: {
            $and: [
              { epoch: { $lte: myDate } },
              { epoch: { $gte: myDate - 86400000 }, currency: coin }
            ]
          }
        },
        { $group: { _id: null, sum: { $sum: "$amount" } } }
      ]);

      return volume
        .then(volumen => {
          vol = volumen[0].sum;
          return (completed = {
            uno: obj,
            dos: obj1,
            tres: vol,
            cuatro: coin
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

export const currency = mongoose.model("currency", schema);
export const currencyChandle = mongoose.model("currencyChandle", chandleSchema);
export const priceUsd = mongoose.model("priceusd", usd);
