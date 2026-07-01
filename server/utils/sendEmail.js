

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderEmail(toEmail, orderData) {
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

  const safeItems = items || [];

  const itemsHTML = safeItems.map(item => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd">${item.name}</td>
      <td style="padding:8px; border:1px solid #ddd">${item.quantity}</td>
      <td style="padding:8px; border:1px solid #ddd">Rs. ${item.subtotal}</td>
    </tr>
  `).join("");

  await transporter.sendMail({
    from: `"Fitzo Store" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Order ${status} #${orderId}`,
    html: `
      <div style="font-family:sans-serif; max-width:600px; margin:auto">

        <h2>Hello ${fullName || "Customer"} 👋</h2>

        <p>Your order <b>#${orderId}</b> is now: <b>${status}</b></p>

        <table width="100%" style="border-collapse:collapse; margin-top:15px">
          <tr style="background:#f5f5f5">
            <th style="border:1px solid #ddd; padding:8px">Product</th>
            <th style="border:1px solid #ddd; padding:8px">Qty</th>
            <th style="border:1px solid #ddd; padding:8px">Subtotal</th>
          </tr>
          ${itemsHTML}
        </table>

        <p><b>Delivery Fee:</b> Rs. ${deliveryFee || 0}</p>
        <h3>Total: Rs. ${totalAmount}</h3>

        <p><b>Address:</b> ${address || "N/A"}, ${city || "N/A"}</p>

        <hr/>
        <p style="color:gray; font-size:12px">
          Thank you for shopping with Fitzo ❤️
        </p>

      </div>
    `,
  });
}

module.exports = sendOrderEmail;