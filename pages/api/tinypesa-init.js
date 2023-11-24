export default function handler(req, res) {
  var url = " https://tinypesa.com/api/v1/express/initialize";

  fetch(url, {
    body: "amount=1&msisdn=0748920306&account_no=200",
    headers: {
      Apikey: "64cf7d8ac543d",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => res.status(200).json(data));
}
