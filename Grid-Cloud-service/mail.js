const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'tu-correo-electronico@tudominio.com',
      pass: 'tu-contraseña'
    }
  });

  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Hubo un error al enviar el mensaje.');
    } else {
      console.log('El mensaje ha sido enviado:', info.response);
      res.status(200).send('El mensaje ha sido enviado.');
    }
  });
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000.'));
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const data = {
    from: email,
    to: 'info.gridmine@gmail.com',
    subject: subject,
    text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`
  };

  fetch('/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => alert('El mensaje ha sido enviado.'))
  .catch(() => alert('Hubo un error al enviar el mensaje.'));
});
