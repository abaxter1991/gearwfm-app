import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// TODO: Setup the sales email address and set the following values to environment variables
const email = 'sales@gearwfm.com'
const pass = ''

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'gearwfm.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: pass,
    },
})

export async function POST(request: NextRequest) {
    const data = await request.json()

    if (!data || !data.name || !data.email || !data.subject) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }

    try {
        await transporter.sendMail({
            from: email,
            to: data.email,
            subject: data.subject,
            // TODO: Create the email template
            // html: EmailHtml(data),
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 400 })
    }
}
