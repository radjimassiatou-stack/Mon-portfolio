import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Tous les champs sont requis." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("GMAIL_USER ou GMAIL_APP_PASSWORD non configuré.");
    return res.status(500).json({ ok: false, error: "Service e-mail non configuré." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Portfolio] Nouveau message de ${name}`,
      html: `
        <div style="font-family:monospace;background:#0a0a0a;color:#e0e0e0;padding:24px;border-radius:8px;border:1px solid #b400ff">
          <h2 style="color:#b400ff;margin:0 0 16px">[ Nouveau message depuis le portfolio ]</h2>
          <p><strong style="color:#7fff00">De&nbsp;&nbsp;&nbsp;:</strong> ${name}</p>
          <p><strong style="color:#7fff00">E-mail :</strong> <a href="mailto:${email}" style="color:#b400ff">${email}</a></p>
          <hr style="border-color:#333;margin:16px 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur envoi e-mail:", err);
    res.status(500).json({ ok: false, error: "Échec de l'envoi de l'e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
