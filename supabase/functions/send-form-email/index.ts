import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormEmailRequest {
  type: 'job_application' | 'contact' | 'bug_report';
  data: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: FormEmailRequest = await req.json();
    
    let subject = '';
    let htmlContent = '';
    
    switch (type) {
      case 'job_application':
        subject = `Job Application: ${data.position} - ${data.fullName}`;
        htmlContent = `
          <h2>New Job Application</h2>
          <p><strong>Position:</strong> ${data.position}</p>
          <p><strong>Full Name:</strong> ${data.fullName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
          ${data.cvUrl ? `<p><strong>CV:</strong> <a href="${data.cvUrl}">Download CV</a></p>` : ''}
          ${data.links && data.links.length > 0 ? `
            <p><strong>Links:</strong></p>
            <ul>
              ${data.links.map((link: string) => `<li><a href="${link}">${link}</a></li>`).join('')}
            </ul>
          ` : ''}
        `;
        break;
        
      case 'contact':
        subject = `Contact Form: ${data.subject}`;
        htmlContent = `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `;
        break;
        
      case 'bug_report':
        subject = `Bug Report from ${data.userName}`;
        htmlContent = `
          <h2>Bug Report</h2>
          <p><strong>Reporter:</strong> ${data.userName} (${data.userEmail})</p>
          <p><strong>User ID:</strong> ${data.userId}</p>
          <p><strong>Page URL:</strong> ${data.pageUrl || 'Not provided'}</p>
          <p><strong>Browser:</strong> ${data.browser || 'Not provided'}</p>
          <p><strong>Description:</strong></p>
          <p>${data.description}</p>
          <p><strong>Steps to Reproduce:</strong></p>
          <p>${data.steps || 'Not provided'}</p>
          <p><strong>Expected Behavior:</strong></p>
          <p>${data.expected || 'Not provided'}</p>
          <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
        `;
        break;
        
      default:
        throw new Error('Invalid form type');
    }

    const emailResponse = await resend.emails.send({
      from: "Investo Patronus <onboarding@resend.dev>",
      to: ["support@investopatronus.com"],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-form-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
