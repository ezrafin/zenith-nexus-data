import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DiscussionModerationRequest {
  discussionId: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  category: string;
  tags?: string[];
  symbol?: string;
  assetType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: DiscussionModerationRequest = await req.json();
    
    const tagsText = data.tags && data.tags.length > 0 
      ? data.tags.join(', ') 
      : 'None';
    
    const assetInfo = data.symbol && data.assetType
      ? `${data.symbol} (${data.assetType})`
      : 'None';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Discussion Pending Moderation
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Discussion ID:</strong> ${data.discussionId}</p>
          <p style="margin: 5px 0;"><strong>Author:</strong> ${data.authorName} (${data.authorEmail})</p>
          <p style="margin: 5px 0;"><strong>Category:</strong> ${data.category}</p>
          <p style="margin: 5px 0;"><strong>Tags:</strong> ${tagsText}</p>
          <p style="margin: 5px 0;"><strong>Asset:</strong> ${assetInfo}</p>
          <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Title:</h3>
          <p style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 0;">
            ${data.title}
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Content:</h3>
          <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px; white-space: pre-wrap; max-height: 400px; overflow-y: auto;">
            ${data.content}
          </div>
        </div>

        <div style="margin: 30px 0; padding: 20px; background-color: #e7f3ff; border-radius: 5px; text-align: center;">
          <p style="margin: 0 0 15px 0; color: #333;">
            <strong>Please review this discussion and approve or reject it in the admin panel.</strong>
          </p>
          <a href="${Deno.env.get('SITE_URL') || 'https://investopatronus.com'}/admin/moderation" 
             style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Go to Moderation Panel
          </a>
        </div>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
          This is an automated notification from Investo Patronus moderation system.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Investo Patronus <info@investopatronus.com>",
      to: ["info@investopatronus.com"],
      subject: `New Discussion Pending Moderation: ${data.title.substring(0, 50)}${data.title.length > 50 ? '...' : ''}`,
      html: htmlContent,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Failed to send email');
    }

    console.log("Moderation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-discussion-moderation-email function:", error);
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

