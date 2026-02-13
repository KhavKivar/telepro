import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const resendFromEmail =
  import.meta.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const contactToEmail =
  import.meta.env.CONTACT_TO_EMAIL || "teleprochile@gmail.com";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requeridos" }),
      { status: 400 },
    );
  }

  if (!import.meta.env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Falta configurar RESEND_API_KEY" }),
      { status: 500 },
    );
  }

  const { data, error } = await resend.emails.send({
    from: `Telepro Web <${resendFromEmail}>`,
    to: contactToEmail,
    replyTo: email,
    subject: `Contacto Web: ${subject}`,
    html: `
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong><br/>${message}</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true, data }), { status: 200 });
};
