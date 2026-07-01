



const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("EMAIL ERROR:", err);
  } else {
    console.log("EMAIL SERVER READY ✅");
  }
});

async function sendOrderEmail(toEmail, orderData) {
  try {
    const {
      orderId,
      fullName,
      status,
      totalAmount,
      deliveryFee,
      address,
      city,
      items,
    } = orderData;

    const itemsHTML = (items || []).map(item => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd">Rs. ${item.subtotal}</td>
      </tr>
    `).join("");

    await transporter.sendMail({
      from: `"Fitzo Store" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `Order ${status} #${orderId}`,
      html: `
        <h2>Hello ${fullName || "Customer"} 👋</h2>
        <p>Your order <b>#${orderId}</b> is now <b>${status}</b></p>

        <table style="border-collapse:collapse">
          ${itemsHTML}
        </table>

        <h3>Total: Rs. ${totalAmount}</h3>
      `,
    });

    console.log("EMAIL SENT ✅");
  } catch (err) {
    console.log("EMAIL SEND ERROR ❌:", err);
  }
}

module.exports = sendOrderEmail;