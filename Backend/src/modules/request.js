import { LocalBitcoin } from "../modules/unaunth.js";
import { currency, searchTid, priceUsd } from "../models/currency.js";

export function query(j) {
  let currency = ["ves", "usd", "eur", "rub", "cny"];

  if (j <= currency.length - 1) {
    console.log(currency[j]);
    let enlace = `/bitcoincharts/${currency[j]}/trades.json`;
    console.log(enlace);
    let instancia = new LocalBitcoin(enlace);
    const consulta = instancia.request(enlace);

    consulta
      .then(async result => {
        if (result !== undefined) {
          let i = 0;
          const results = result.data;
          console.log(currency.length);
          save(results, i, currency[j]);
          j++;
          query(j);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export function order(results) {
  const object = results;
  const obj = object.sort(function(a, b) {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }

    return 0;
  });

  return obj;
}

export function save(results, i, coin) {
  let ordened = 0;
  if (i <= results.length - 1) {
    ordened = order(results);

    ordened.forEach(ordened => {
      const unixEpochTimeMS = ordened.date * 1000;
      const d = new Date(unixEpochTimeMS);
      const strDate = d.toLocaleString();

      searchTid(ordened.tid, coin)
        .then(async res => {
          if (res == 1) {
            const rates = new currency({
              tid: ordened.tid,
              currency: coin,
              price: ordened.price,
              amount: ordened.amount,
              date: strDate,
              epoch: ordened.date
            });
            await rates.save();
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
export async function saveUsdInBtc(price, date) {
  const rates = new priceUsd({ price: price, date: date });
  await rates.save();
}
export function usd() {
  let enlace = `/api/equation/btc_in_usd`;
  console.log(enlace);
  let instancia = new LocalBitcoin(enlace);
  instancia.request(enlace).then(res => {
    console.log(res.data.data);
    saveUsdInBtc(res.data.data, Date.now());
  });
}

/* export function consulta() {
  let equation = [
    "usd_in_ves",
    "usd_in_eur",
    "usd_in_rub",
    "usd_in_cny",
    "btc_in_usd"
  ];

  if (j <= equation.length - 1) {
    console.log(equation[j]);
    let equationenlace = `/api/equation/${equation[j]}/`;
    console.log(enlace);
    let instancia = new LocalBitcoin(enlace);
    const consulta = instancia.request(enlace);

    consulta
      .then(async result => {
        if (result !== undefined) {
          let i = 0;
          const results = result.data;
          console.log(equation.length);
          save(results, i, equation[j]);
          j++;
          query(j);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
 */
