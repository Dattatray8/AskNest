import dotenv from "dotenv";
dotenv.config();
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, otp) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL,
      subject: "QuerySphere Password Reset OTP",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden;">
          
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                QuerySphere
              </h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                Password Reset Request
              </h2>
              
              <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                We received a request to reset your QuerySphere account password. Use the verification code below to proceed:
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <div style="background: linear-gradient(135deg, #f6f8fb 0%, #edf2f7 100%); border: 2px dashed #cbd5e0; border-radius: 8px; padding: 24px; display: inline-block;">
                      <p style="margin: 0 0 8px 0; color: #718096; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                        Your OTP Code
                      </p>
                      <p style="margin: 0; color: #2d3748; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                        ${otp}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin: 24px 0;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  ⚠️ <strong>Security Notice:</strong> This code expires in <strong>5 minutes</strong>. Never share it with anyone, including QuerySphere staff.
                </p>
              </div>
              
              <p style="margin: 24px 0 0 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">
                Need help? Contact us at <a href="mailto:${process.env.EMAIL}" style="color: #667eea; text-decoration: none;">${process.env.EMAIL}</a>
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                © 2025 QuerySphere. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        
        <p style="margin: 20px 0 0 0; color: #a0aec0; font-size: 12px; text-align: center; max-width: 600px;">
          This email was sent to ${to}. If you received this by mistake, please disregard it.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      replyTo: process.env.EMAIL,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    });
    console.log("Professional email sent successfully!");
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error);
  }
};

export default sendMail;
