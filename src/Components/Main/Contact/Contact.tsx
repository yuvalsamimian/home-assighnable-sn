/*
Lead Generation Function Option:

async function generateLead(data: ContactForm) {
   try {
       const response = await axios.post('your-api-endpoint/leads', {
           name: data.name,
           email: data.email,
           subject: data.subject,
           message: data.message,
           timestamp: new Date(),
           source: 'contact_form',
           status: 'new',
           metadata: {
               userAgent: navigator.userAgent,
               pageSource: window.location.pathname,
               submissionTime: new Date().toISOString()
           }
       });
       
       if (response.status === 201) {
           console.log('Lead generated successfully:', response.data);
           return true;
       }
       return false;
   } catch (error) {
       console.error('Error generating lead:', error);
       return false;
   }
}

// Usage in onSubmit:
const onSubmit = async (data: ContactForm) => {
   const leadGenerated = await generateLead(data);
   if (leadGenerated) {
       alert("Thank you for your message! We'll get back to you soon.");
       reset();
   } else {
       alert("There was an error submitting your message. Please try again.");
   }
};
*/

import { useForm } from "react-hook-form";
import "./Contact.css";

interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

    const onSubmit = (data: ContactForm) => {
        console.log(data);
        alert("Thank you for your message! We'll get back to you soon.");
        reset();
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            
            <div>
                <h2>Get in Touch</h2>
                <p>We'd love to hear from you!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span>Name is required</span>}
                    </p>

                    <p>
                        <input
                            type="email"
                            placeholder="Your Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === "required" && <span>Email is required</span>}
                    </p>

                    <p>
                        <input
                            type="text"
                            placeholder="Subject"
                            {...register("subject", { required: true })}
                        />
                        {errors.subject && <span>Subject is required</span>}
                    </p>

                    <p>
                        <textarea
                            placeholder="Your Message"
                            rows={5}
                            {...register("message", { required: true })}
                        ></textarea>
                        {errors.message && <span>Message is required</span>}
                    </p>

                    <p>
                        <button type="submit">Send Message</button>
                    </p>
                </div>
            </form>

            <div className="connect-info">
                <div>
                    <h3>Email</h3>
                    <p>support@tvshowsexplorer.com</p>
                </div>

                <div>
                    <h3>Social Media</h3>
                    <p>Follow us on: Twitter • Instagram • Facebook</p>
                </div>

                <div>
                    <h3>Office Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                </div>
            </div>
        </div>
    );
}

export default Contact;