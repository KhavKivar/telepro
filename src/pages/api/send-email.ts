import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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

  const { data, error } = await resend.emails.send({
    from: `${name} <${email}>`,
    to: `permisossubtel@gmail.com`,
    subject: `Contacto Web: ${subject}`,
    html: `<p>De: ${email}</p><p>Mensaje: ${message}</p>`,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true, data }), { status: 200 });
};
