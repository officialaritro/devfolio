import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactFormEmailProps {
  name: string
  email: string
  subject: string
  message: string
  type: 'confirmation' | 'notification'
}

export default function ContactFormEmail({
  name,
  email,
  subject,
  message,
  type,
}: ContactFormEmailProps) {
  const isConfirmation = type === 'confirmation'

  return (
    <Html>
      <Head />
      <Preview>
        {isConfirmation
          ? `Thank you for your message, ${name}!`
          : `New Contact Form Submission from ${name}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isConfirmation
              ? `Thank you for your message, ${name}!`
              : `New Contact Form Submission`}
          </Heading>

          {!isConfirmation &&
            <Section style={section}>
              <Text style={text}>
                <strong>Name:</strong> {name}
              </Text>
              <Text style={text}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={text}>
                <strong>Subject:</strong> {subject}
              </Text>
              <Hr style={hr} />
              <Text style={text}>
                <strong>Message:</strong>
              </Text>
              <Text style={text}>{message}</Text>
            </Section>
          }

          {isConfirmation && (
            <Text style={footer}>
              I&apos;ll get back to you as soon as possible!
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1 = {
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  color: '#484848',
  textAlign: 'center' as const,
}

const section = {
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '4px',
}

const text = {
  margin: '0 0 12px',
  lineHeight: '1.5',
  color: '#3c4149',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginTop: '20px',
  textAlign: 'center' as const,
}

