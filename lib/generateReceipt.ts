import * as Print from "expo-print";

export type ReceiptData = {
  amount: string;
  transferId: string;
  date: string;
  recipientName: string;
};

export async function generateReceiptPdf(data: ReceiptData) {
  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9fafb; margin: 0;">

        <div style="max-width: 500px; margin: auto; background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="text-align: center; margin-bottom: 8px;">
            <h2 style="color: #2563EB; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">
              Credora
            </h2>
            <p style="color: #6B7280; font-size: 13px; margin: 4px 0 0;">
              Transaction Receipt
            </p>
          </div>

          <!-- Status badge -->
          <div style="text-align: center; margin: 16px 0;">
            <span style="background: #DCFCE7; color: #16A34A; font-size: 13px; font-weight: 600; padding: 6px 18px; border-radius: 999px; display: inline-block;">
              ✓ &nbsp;Transfer Successful
            </span>
          </div>

          <!-- Amount hero -->
          <div style="text-align: center; padding: 20px 0 24px;">
            <p style="color: #6B7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px;">
              Amount Sent
            </p>
            <p style="font-size: 40px; font-weight: 700; color: #111827; margin: 0; letter-spacing: -0.5px;">
              ₦${data.amount}
            </p>
          </div>

          <!-- Perforated divider -->
          <div style="border-top: 2px dashed #E5E7EB; margin: 0 -8px 24px;"></div>

          <!-- Detail rows -->
          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
            <span style="color: #6B7280; font-size: 13px;">Recipient</span>
            <span style="font-size: 13px; font-weight: 600; color: #111827;">${data.recipientName}</span>
          </div>

          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
            <span style="color: #6B7280; font-size: 13px;">Transfer ID</span>
            <span style="font-size: 13px; font-weight: 600; color: #111827; word-break: break-all; text-align: right; max-width: 60%;">
              ${data.transferId}
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F3F4F6;">
            <span style="color: #6B7280; font-size: 13px;">Date & Time</span>
            <span style="font-size: 13px; font-weight: 600; color: #111827;">${data.date}</span>
          </div>

          <div style="display: flex; justify-content: space-between; padding: 12px 0;">
            <span style="color: #6B7280; font-size: 13px;">Status</span>
            <span style="font-size: 13px; font-weight: 600; color: #16A34A;">SUCCESS</span>
          </div>

          <!-- Footer -->
          <div style="border-top: 1px solid #F3F4F6; margin-top: 16px; padding-top: 16px; text-align: center;">
            <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
              Thank you for banking with Credora.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;

  return await Print.printToFileAsync({ html });
}
