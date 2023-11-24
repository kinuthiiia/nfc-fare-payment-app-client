// prettier-ignore
import axios from "axios";

const consumerKey = "GGb3LkPhiAcbgCERSTGjzTkC5FVGoqWR";
const consumerSecret = "TLaXItISaRx4QjkG";
const shortcode = "174379"; // for till number , put the store number
const passkey =
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; // will be sent via email during moving to production
const transactionType = "CustomerPayBillOnline"; // "CustomerBuyGoodsOnline" for a till number

const generateToken = async (req, res, next) => {
  // Your middleware logic here
  console.log("Running middleware");

  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${consumerKey}:${consumerSecret}`
          ).toString("base64")}`,
        },
      }
    )
    .then(({ data }) => {
      req.token = data?.access_token;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};

const initiateSTK = async (req, res) => {
  console.log("Running main fxn");
  const { amount, phoneNumber } = req.body;

  // Get timestamp
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  // Get passkey
  const password = Buffer.from(shortcode + passkey + timestamp).toString(
    "base64"
  );

  await axios
    .post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortcode /* store number for a till */,
        Password: password,
        Timestamp: timestamp,
        TransactionType: transactionType,
        Amount: parseInt(amount),
        PartyA: `254${phoneNumber.substring(1)}`,
        PartyB: shortcode,
        PhoneNumber: `254${phoneNumber.substring(1)}`,
        CallBackURL: "https://0b44-196-216-91-104.ngrok.io/api/callback",
        AccountReference: `254${phoneNumber.substring(0)}`,
        TransactionDesc: "Payment of X",
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then(({ data }) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err.message);
    });
};

export default function handler(req, res) {
  generateToken(req, res, () => {
    initiateSTK(req, res);
  });
}
