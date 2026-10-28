/* AJ Job Seekers – Application Tips: guided training content (6 modules, each = Learn → Practise → Check).
   Runs on the same engine as Career Guides (scripts/career-guides.js) and reads window.CG_DATA. */
(function (root) {
  'use strict';

  var h = function (text) { return { t: 'h', text: text }; };
  var p = function (text) { return { t: 'p', text: text }; };
  var ul = function (items) { return { t: 'ul', items: items }; };
  var ol = function (items) { return { t: 'ol', items: items }; };
  var tip = function (title, text) { return { t: 'tip', title: title, text: text }; };
  var ex = function (title, text) { return { t: 'ex', title: title, text: text }; };
  var warn = function (title, text) { return { t: 'warn', title: title, text: text }; };
  var tpl = function (title, text, note) { return { t: 'tpl', title: title, text: text, note: note }; };
  var table = function (head, rows) { return { t: 'table', head: head, rows: rows }; };
  var qz = function (q, o, a, e) { return { q: q, o: o, a: a, e: e }; };
  var chips = function (key, label, options, max) { return { kind: 'chips', key: key, label: label, options: options, max: max }; };
  var text = function (key, label, ph) { return { kind: 'text', key: key, label: label, ph: ph }; };
  var area = function (key, label, ph) { return { kind: 'area', key: key, label: label, ph: ph }; };
  var sel = function (key, label, options) { return { kind: 'select', key: key, label: label, options: options }; };

  var MODULES = [

    /* ------------------------------------------------------------ 1 */
    {
      id: 'advert', title: 'Read the advert and choose wisely', minutes: 20,
      goal: 'Decode a job advert, decide whether to apply, spot fake adverts and plan exactly what the employer wants to see.',
      intro: 'Strong applications begin before you write a single word. Most rejected applications fail because the applicant did not read the advert carefully: they missed a requirement, ignored an instruction or sent the same document to every employer. In this module you will learn to read an advert like a recruiter.',
      blocks: [
        h('Break the advert into parts'),
        table(['Part of the advert', 'What to look for', 'Why it matters'], [
          ['Job title and employer', 'Is the employer real and named? Is the title clear?', 'Fake adverts often hide the employer’s name'],
          ['Summary and duties', 'The main tasks you would do every day', 'Your letter must show you can do these'],
          ['Requirements', 'Qualifications, experience, skills, licences', 'Screeners check these first'],
          ['Essential versus desirable', 'Words like “must”, “required” (essential) and “preferred”, “an advantage” (desirable)', 'You can apply with most, but not all, of the desirable ones'],
          ['How to apply', 'Email address, online form, documents requested, subject line', 'Not following instructions is a common reason for rejection'],
          ['Deadline and location', 'Closing date, time and where the job is based', 'Late applications are usually ignored']
        ]),
        h('Highlight the keywords'),
        p('Employers, and the software many of them use to sort applications, look for words from the advert. Underline the skills, tools and qualifications that appear. If the advert says “customer service”, “record keeping” and “Microsoft Excel”, those exact words should appear, truthfully, in your CV and cover letter.'),
        ex('Quick example', 'Advert: “Administrative Assistant: manage the manager’s diary, prepare minutes, maintain records, answer calls. Required: Diploma in Business Administration, 1 year’s experience, Microsoft Office. Preferred: knowledge of procurement.”\nYour must-haves checklist: diploma ✓, one year experience ✓, Microsoft Office ✓. Gap: procurement (mention a related task, or willingness to learn).'),
        h('Should you apply?'),
        ul([
          'If you meet the essential requirements and most of the others, apply.',
          'If you meet about two thirds and can show that you learn quickly, it can still be worth applying.',
          'If you are missing a legal or licensing requirement, such as a professional registration, do not waste your time on that vacancy.',
          'Quality beats quantity: a tailored application to a role you fit is better than ten generic ones.'
        ]),
        h('Check that the vacancy is genuine'),
        warn('Warning signs of a fake advert', 'The employer is not named or cannot be found. It asks for money for “registration”, “training”, “uniform”, “medical” or “processing”. It promises very high pay for little work or a visa abroad. It uses a free email address that does not match the company, or asks you to continue only on private chat. It has many spelling mistakes or pressures you to reply immediately.'),
        ul([
          'Search for the organisation and look for an official website and contact details.',
          'Confirm the vacancy on the organisation’s own channels.',
          'Never send your ID, bank or Ghana Card numbers to someone you have not verified.'
        ]),
        tip('Keep a copy of every advert', 'Adverts disappear after the deadline. Save a screenshot or copy so you can prepare for the interview later and remember exactly what was promised.')
      ],
      activity: {
        title: 'Decode a real advert',
        prompt: 'Choose a real vacancy, for example from the Jobs page on this site, and complete the following.',
        fields: [
          text('role', 'The role I am applying for', 'e.g. Administrative Assistant at ABC Ltd'),
          text('deadline', 'Deadline and how to apply', 'e.g. 30 November by email to hr@abc.com'),
          area('musts', 'The essential requirements (must-haves) in the advert', 'e.g. Diploma in Business Administration, 1 year experience, Microsoft Office'),
          area('match', 'For each requirement, my evidence or experience', 'e.g. Diploma: BA, 2022. Experience: internship at Sample Ltd…'),
          chips('verified', 'What I checked to make sure the vacancy is genuine (up to 5)', ['Employer is real and named', 'Official website or page found', 'No fee requested', 'Email matches the organisation', 'Deadline and instructions are clear', 'Vacancy confirmed on official channel', 'Contact person identified'], 5)
        ]
      },
      quiz: [
        qz('What is the best thing to do with the requirements in an advert?', ['Ignore them', 'Match each one to your own evidence and use its keywords truthfully', 'Copy the whole advert into your CV', 'Only read the title'], 1, 'Showing evidence for each requirement and using the advert’s keywords makes your application easy to approve.'),
        qz('An advert asks you to pay a “processing fee” before an interview. What should you do?', ['Pay quickly', 'Treat it as a likely scam, verify the employer and do not pay', 'Pay half', 'Share your Ghana Card'], 1, 'Genuine employers do not charge applicants. Fees are a warning sign of fraud.'),
        qz('The advert says “preferred: knowledge of procurement” and you have none. What is sensible?', ['Do not apply under any circumstances', 'Apply if you meet the essential requirements, and mention related experience or readiness to learn', 'Claim you know procurement', 'Wait for another advert'], 1, 'Preferred items are an advantage, not a barrier. Never claim skills you do not have.')
      ],
      takeaways: ['Read adverts closely: duties, requirements, instructions and deadline.', 'Match each essential requirement with evidence and use the advert’s keywords truthfully.', 'Verify the employer and never pay to apply.'],
      links: [{ t: 'Browse current vacancies', href: 'jobs.html' }]
    },

    /* ------------------------------------------------------------ 2 */
    {
      id: 'docs', title: 'Prepare your application documents', minutes: 25,
      goal: 'Get your CV, certificates and references ready, and tailor your documents to each role.',
      intro: 'A complete, well-organised set of documents saves you time and shows professionalism. When a vacancy appears, you want to be ready to apply within hours, not days. This module shows you what to prepare and how to adapt it for each job.',
      blocks: [
        h('Your application pack'),
        table(['Document', 'Tips'], [
          ['CV or resume', 'One to two pages, clean layout, tailored to the role. Use the Resume page on this site to build one'],
          ['Cover letter', 'One page, written for the specific job. Module 3 shows you how'],
          ['Certificates and transcripts', 'Clear scans or photographs in one folder. Send only what is asked for'],
          ['Identification', 'Keep scans ready, but send ID documents only when an official employer asks and after you have verified them'],
          ['References', 'Two people, such as a lecturer or supervisor, who agreed and know your work. Keep their phone and email ready'],
          ['Portfolio or work samples', 'For creative, technical or teaching roles, a few relevant samples as links or attachments'],
          ['Professional photo (if requested)', 'Plain background, neat dress, clear face. Do not use social media or cropped group photos']
        ]),
        h('Tailor your CV in 15 minutes'),
        ol([
          'Open the advert and list its top five skills or requirements.',
          'Change your summary at the top so it mentions the role and your two strongest matches.',
          'Move the most relevant experience and achievements to the top of each section.',
          'Use the same keywords as the advert, wherever they are true.',
          'Remove details that do not help for this role.',
          'Re-read for accuracy and spelling.'
        ]),
        ex('Before and after: CV summary', 'Before: “Hardworking graduate looking for a job.”\nAfter: “Business Administration graduate with one year of office experience in records and customer service, skilled in Microsoft Office and diary management, seeking an Administrative Assistant role at ABC Ltd.”'),
        h('Format and file basics'),
        ul([
          'Save documents as PDF unless the employer asks for Word. PDFs keep their layout on every phone and computer.',
          'Name files clearly: Ama-Mensah-CV.pdf, Ama-Mensah-Cover-Letter.pdf, not “CV final final 2.docx”.',
          'Keep each file small, ideally under 2 MB, and combine certificates into one PDF if the employer allows.',
          'Use a standard font such as Arial or Calibri at size 10 to 12, and leave space around the text.',
          'Open every file on your phone before sending, to be sure it looks right and is readable.'
        ]),
        h('Honesty rules'),
        warn('Never lie on your application', 'Do not invent qualifications, dates, titles or numbers, and do not use someone else’s certificates. Employers check, and dishonesty can cancel an offer or end a career later. Present your real experience as well as you can.'),
        h('Gaps and weaknesses'),
        p('If you have a gap in your history, state it briefly and positively, for example “2022–2023: full-time study for professional certificate” or “family responsibilities”. If you lack experience, put the skills you gained in school, volunteering and projects in the foreground.'),
        h('Contact details'),
        ul([
          'Use a professional email address based on your name.',
          'Use a phone number you answer, with a polite voicemail or caller tune.',
          'Make sure your location and availability are clear.'
        ])
      ],
      activity: {
        title: 'Get your application pack ready',
        prompt: 'Tick what you already have, then tailor your CV for the role you chose in Module 1.',
        fields: [
          chips('ready', 'Which documents are ready? (choose all that apply)', ['CV', 'Cover letter template', 'Certificates in one folder', 'Transcript', 'ID scan', 'Two references agreed', 'Portfolio or samples', 'Professional email address'], 8),
          area('tailor', 'Three changes I will make to my CV for this role', '1. Rewrite the summary to mention… 2. Move… 3. Add the keyword…'),
          text('filename', 'How I will name my files', 'e.g. Ama-Mensah-CV.pdf'),
          text('referees', 'My two referees', 'e.g. Mr Boateng (lecturer), Mrs Owusu (supervisor)')
        ]
      },
      quiz: [
        qz('What is the best way to adapt your CV for a job?', ['Use the same CV for everyone', 'Match the summary, keywords and top achievements to the advert, honestly', 'Make it five pages long', 'Add skills you do not have'], 1, 'Tailoring helps the reader see quickly that you fit, as long as everything is true.'),
        qz('Which file name is best?', ['document1.docx', 'CV final final 2.docx', 'Ama-Mensah-CV.pdf', 'New.jpg'], 2, 'A clear PDF name with your own name is professional and easy to find.'),
        qz('You have a gap in your work history. What should you do?', ['Hide it by changing dates', 'State it briefly and positively and focus on what you learned or did', 'Leave out all dates', 'Blame a former employer'], 1, 'Honesty and a positive explanation work better than concealment, which can be discovered.')
      ],
      takeaways: ['Keep a complete, organised application pack ready.', 'Tailor your summary and top achievements to each advert, honestly.', 'Use clear PDFs and file names, and check them on your phone.'],
      links: [{ t: 'Build your resume', href: 'resume.html' }]
    },

    /* ------------------------------------------------------------ 3 */
    {
      id: 'cover', title: 'Write a winning cover letter', minutes: 30,
      goal: 'Write a clear one-page cover letter that connects your experience to the employer’s needs.',
      intro: 'A cover letter is your chance to speak directly to the employer. It should not repeat your CV. It should explain why you want this job, why you fit it and how you will add value. A short, specific letter beats a long, general one every time.',
      blocks: [
        h('The four-paragraph structure'),
        table(['Paragraph', 'What to include', 'Length'], [
          ['1. Opening', 'The role you are applying for, where you found it and a one-sentence summary of why you fit', '2–3 lines'],
          ['2. Evidence', 'Your strongest match to the main requirement, with a specific achievement and a number if possible', '4–6 lines'],
          ['3. Fit and motivation', 'A second strength and why you want this organisation. Show that you researched it', '3–5 lines'],
          ['4. Closing', 'Thank them, say you are available for interview and give your contact details', '2–3 lines']
        ]),
        h('Layout'),
        ul([
          'Your name and contact details at the top, then the date.',
          'The employer’s name and address, where known.',
          'A greeting: “Dear Mr Mensah”, or “Dear Hiring Manager” if no name is given. Try to find the name.',
          'A short subject line, such as “Application for Administrative Assistant”.',
          'Close with “Yours sincerely” if you used a name, or “Yours faithfully” if you wrote “Dear Sir or Madam”.',
          'Keep it to one page, in the same font as your CV.'
        ]),
        h('A complete example'),
        tpl('Cover letter example', 'Ama Mensah\n+233 24 000 0000 | ama.mensah@example.com | Accra\n\n28 October 2026\n\nThe Human Resources Manager\nABC Trading Ltd, Accra\n\nDear Madam,\n\nApplication for Administrative Assistant\n\nI am writing to apply for the Administrative Assistant position advertised on AJ Job Seekers. As a Business Administration graduate with a year of office experience in records and customer service, I believe I can contribute quickly to your team.\n\nIn my current role at Sample Trading Ltd, I manage schedules and correspondence for a team of twelve. When our filing system became slow, I introduced a simple digital records system that reduced search time by about 30 per cent. I also handle around 40 customer enquiries a day with a 95 per cent satisfaction rating, and I am skilled in Microsoft Word and Excel.\n\nI am drawn to ABC Trading because of your reputation for reliable service and your growth into new regions. I would value the chance to support that growth with the same organisation and attention to detail.\n\nThank you for considering my application. I have attached my CV and would be glad to attend an interview at any time. You can reach me on 024 000 0000.\n\nYours faithfully,\nAma Mensah', 'Replace every detail with your own true information. Do not copy the example word for word.'),
        h('Make your letter stand out'),
        ul([
          'Be specific: name the role and the employer, and mention something real about them.',
          'Show results: “reduced”, “increased”, “organised”, with numbers where you can.',
          'Use the advert’s language to show you understand what they need.',
          'Focus on what you can do for them, not only what you want from them.',
          'Use a warm, professional tone and plain, positive words.'
        ]),
        h('Common mistakes'),
        table(['Mistake', 'Better approach'], [
          ['“To whom it may concern” and a generic letter', 'Use the name or role and write for this job'],
          ['Repeating the CV line by line', 'Tell one or two stories that prove your strongest points'],
          ['Too long, or only one line', 'One page, around 250 to 350 words'],
          ['Spelling errors or another company’s name', 'Proofread aloud and check the name'],
          ['Complaining about a previous employer', 'Stay positive and look forward'],
          ['Saying “I am hardworking” without proof', 'Show it with an example and a result']
        ]),
        tip('When there is no cover letter requested', 'If the advert does not ask for a cover letter, a short, polite email message that does the same job (see Module 4) still helps you stand out.')
      ],
      activity: {
        title: 'Draft your cover letter paragraphs',
        prompt: 'Write the three key paragraphs for the role you chose in Module 1. You will add the greeting and sign-off when you send it.',
        fields: [
          area('opening', 'Opening paragraph: the role, where you found it and why you fit', 'I am writing to apply for the… position advertised on… As a… with…, I believe…'),
          area('evidence', 'Evidence paragraph: your best achievement matching the main requirement, with a number', 'In my role at…, I… which resulted in…'),
          area('closing', 'Closing paragraph: thanks, availability and contact details', 'Thank you for considering my application. I would be glad to attend an interview… You can reach me on…'),
          text('whyem', 'One real reason you want to work for this organisation', 'e.g. Their reputation for training young staff')
        ]
      },
      quiz: [
        qz('What should the evidence paragraph of a cover letter contain?', ['Your date of birth', 'A specific achievement that matches the main requirement, with numbers if possible', 'A list of your hobbies', 'A complaint about unemployment'], 1, 'Specific, measurable evidence proves that you can do the job.'),
        qz('How long should a cover letter normally be?', ['Five pages', 'About one page', 'One word', 'Whatever you like'], 1, 'One page keeps the reader’s attention.'),
        qz('Which greeting is best?', ['“Hey”', '“To whom it may concern”, whenever possible', '“Dear Mr Mensah”, when you have found the name', '“Dear friend”'], 2, 'Using the right name shows effort and respect. Use “Dear Hiring Manager” only if you cannot find the name.')
      ],
      takeaways: ['Use four short paragraphs: opening, evidence, fit and closing.', 'Be specific, show results and write for this employer.', 'Keep it to one page and proofread.'],
      links: []
    },

    /* ------------------------------------------------------------ 4 */
    {
      id: 'submit', title: 'Apply by email or online form', minutes: 25,
      goal: 'Submit a clean, correct application by email or online form that follows the instructions exactly.',
      intro: 'A great CV and letter can still fail if the way you send them is careless. Wrong subject lines, missing attachments and mistakes on forms cost many people interviews. This module shows you how to apply correctly every time.',
      blocks: [
        h('Applying by email'),
        ol([
          'Send from a professional email address.',
          'Use the exact subject line from the advert, for example “Application: Administrative Assistant”. If none is given, write your own clear one.',
          'Write a short message in the body, with a greeting, one or two sentences and your sign-off.',
          'Attach the documents requested, named clearly, as PDFs unless asked otherwise.',
          'Check the recipient’s address, the spelling and the attachments before you press send.',
          'Send before the deadline, not at the last minute.'
        ]),
        tpl('Application email', 'Subject: Application: Administrative Assistant – Ama Mensah\n\nDear Hiring Manager,\n\nPlease find attached my CV and cover letter for the Administrative Assistant position advertised on AJ Job Seekers.\n\nI have one year of experience in records, scheduling and customer service, and I am skilled in Microsoft Office. I would welcome the opportunity to discuss how I can support your team.\n\nThank you for your time and consideration.\n\nYours sincerely,\nAma Mensah\n024 000 0000 | ama.mensah@example.com', 'If the advert gives a specific subject line or asks for extra details, follow it exactly.'),
        h('Applying through an online form'),
        ul([
          'Prepare your answers in a notepad first, then paste them in. This protects you from lost data and timeouts.',
          'Fill in every required field accurately: names must match your documents.',
          'Use keywords from the advert in descriptions of your experience, truthfully.',
          'Upload the right files in the requested formats and sizes.',
          'Save a copy or screenshot of your submission and any confirmation.',
          'Use a stable internet connection and a phone or computer with enough charge or battery.'
        ]),
        h('How software screens applications'),
        p('Many larger employers use tracking software that scans applications for keywords, dates and qualifications before a person sees them. To help it:'),
        ul([
          'Use simple formatting: standard headings, no complicated tables, text boxes or images with text.',
          'Use the job title and skills exactly as written in the advert, wherever true.',
          'Spell out terms: “Microsoft Excel”, not only “MS XL”.',
          'Keep dates and job titles consistent with your other documents.'
        ]),
        h('Proofread like a professional'),
        ul([
          'Read everything aloud. Your ear catches mistakes your eye misses.',
          'Check names, dates, phone numbers and the employer’s name.',
          'Use a spell checker, then ask a friend to read it once.',
          'Print or view it on a different device to see it fresh.'
        ]),
        h('Applying in person or by courier'),
        p('Some organisations still want printed applications. Use a clean, unfolded envelope or a plain folder, include a copy of each document, dress neatly if delivering, be polite to everyone and ask for a receipt or the name of the person who received it.'),
        warn('Keep your details safe', 'Send ID numbers, bank details or passport copies only when an official, verified employer needs them for a real stage of the process. Do not click on strange links or download files from unknown senders.')
      ],
      activity: {
        title: 'Prepare your submission',
        prompt: 'Get everything ready for the application you chose in Module 1.',
        fields: [
          text('subject', 'My email subject line', 'e.g. Application: Administrative Assistant – Ama Mensah'),
          area('email', 'The short email message I will send', 'Dear Hiring Manager, Please find attached my CV and cover letter for…'),
          chips('checks', 'My final checks before I press send (up to 6)', ['Correct recipient address', 'Subject line follows the advert', 'Documents attached and opened', 'Files named clearly', 'Names and dates checked', 'Read aloud for mistakes', 'Sent before the deadline', 'Screenshot or copy saved'], 6),
          text('when', 'When I will submit it', 'e.g. Thursday by 10 a.m., two days before the deadline')
        ]
      },
      quiz: [
        qz('What should you do before pressing send on an application email?', ['Nothing, just send', 'Check the recipient, subject, attachments and spelling', 'Add as many people as possible in copy', 'Send a blank email first'], 1, 'A final check prevents avoidable mistakes like missing attachments.'),
        qz('Why prepare form answers in a notepad first?', ['It is required by law', 'It protects you from lost data and lets you check the text', 'It makes forms faster for the employer', 'It is not helpful'], 1, 'If the page fails or times out, your answers are safe, and you can proofread them.'),
        qz('When is it appropriate to send your ID copy?', ['To every employer immediately', 'Only when an official, verified employer needs it for a real stage', 'To anyone who messages you', 'Never, under any circumstance'], 1, 'Share sensitive documents only with verified employers and when they are genuinely required.')
      ],
      takeaways: ['Follow the instructions exactly and apply before the deadline.', 'Use clear subject lines, PDFs and a short professional message.', 'Proofread aloud and protect your personal information.'],
      links: []
    },

    /* ------------------------------------------------------------ 5 */
    {
      id: 'follow', title: 'Tests, follow-up and tracking', minutes: 25,
      goal: 'Respond to invitations, handle tests, follow up politely and keep your applications organised.',
      intro: 'Sending the application is only the start. Many employers use tests and shortlists, and their replies can come quickly or slowly. Organised, polite follow-up sets you apart and keeps you calm. This module shows you how to manage everything after you apply.',
      blocks: [
        h('Track every application'),
        p('Use a notebook or spreadsheet with these columns, and check it every morning:'),
        table(['Employer and role', 'Date applied', 'Contact person', 'Documents sent', 'Follow-up date', 'Result'], [
          ['ABC Ltd, Administrative Assistant', '28 Oct', 'HR manager, hr@abc.com', 'CV, cover letter', '5 Nov', 'Waiting'],
          ['XYZ Bank, Customer Service', '30 Oct', 'Online form', 'CV, form', '8 Nov', 'Test invitation']
        ]),
        h('How long to wait'),
        ul([
          'If the advert gives a decision date, wait until then.',
          'If not, wait one to two weeks after the deadline before you follow up.',
          'Follow up once or twice, politely. Do not message every day.'
        ]),
        tpl('Polite follow-up email', 'Subject: Following up: Administrative Assistant application – Ama Mensah\n\nDear Madam,\n\nI hope you are well. I applied for the Administrative Assistant position on 28 October and wanted to confirm that my application was received. I remain very interested in the role and would be glad to provide any further information.\n\nThank you for your time.\n\nYours sincerely,\nAma Mensah\n024 000 0000'),
        h('When you are invited to an interview or test'),
        ol([
          'Reply quickly, within 24 hours, and say thank you.',
          'Confirm the date, time, place and what to bring.',
          'Check that the invitation is genuine through official contacts.',
          'Begin preparing immediately. Use the Interview Coaching page on this site.'
        ]),
        tpl('Reply to an interview invitation', 'Good afternoon Madam. Thank you for inviting me to an interview for the Administrative Assistant position. I confirm that I will attend on Tuesday, 10 November at 10:00 a.m. at your head office. Please let me know if there is anything I should bring. Thank you.'),
        h('Common tests and assessments'),
        table(['Type', 'What it checks', 'How to prepare'], [
          ['Written or aptitude test', 'English, numbers and reasoning', 'Practise past questions and timed exercises'],
          ['Typing or computer test', 'Speed, accuracy and software skills', 'Practise in Word and Excel on real tasks'],
          ['Role-related or technical test', 'Job skills such as bookkeeping or coding', 'Revise the basics and do sample tasks'],
          ['Group exercise', 'Teamwork and communication', 'Listen, contribute and respect others'],
          ['Presentation or teaching demo', 'Clarity and confidence', 'Prepare, time and rehearse out loud']
        ]),
        tip('On test day', 'Sleep well, arrive early, bring your ID, pens and a calculator if allowed, read the instructions carefully and manage your time.'),
        h('When the answer is no'),
        p('Rejection is common, even for strong candidates. Reply politely, thank them and ask if they can share feedback or keep your details for future roles. Then review what you can improve and continue.'),
        tpl('Reply to a rejection', 'Dear Madam, thank you for letting me know. I appreciated the opportunity to apply. If you are able to share any feedback, it would help me improve. Please keep my details for future vacancies. Thank you again.'),
        h('When you get an offer'),
        ul([
          'Say thank you and ask for the offer in writing, including salary, duties, hours and start date.',
          'Take a short time (one or two days) to consider, if you need to.',
          'Check the details carefully. Ask politely about anything unclear.',
          'Reply in writing to accept, with a start date, and inform other employers if you withdraw.'
        ])
      ],
      activity: {
        title: 'Set up your follow-up system',
        prompt: 'Make the system you will use for all your applications.',
        fields: [
          sel('wait', 'How long I will wait before the first follow-up', ['One week after the deadline', 'Two weeks after the deadline', 'On the decision date given in the advert']),
          area('followmsg', 'My follow-up message (3–4 lines)', 'Dear Madam, I applied for… on… and wanted to confirm that…'),
          chips('tests', 'Which test types will I prepare for? (up to 4)', ['Written or aptitude test', 'Typing or computer test', 'Technical test', 'Group exercise', 'Presentation', 'Phone interview', 'Interview'], 4),
          area('tracker', 'How I will track my applications and when I will review them', 'e.g. A notebook with a page per employer, reviewed every morning at 7 a.m.')
        ]
      },
      quiz: [
        qz('When is a good time to follow up on an application with no response?', ['The next hour', 'One to two weeks after the deadline, politely and once or twice', 'Every day', 'Never'], 1, 'Waiting a reasonable time and following up politely shows interest without pressure.'),
        qz('How should you respond to an interview invitation?', ['Ignore it for a week', 'Reply within 24 hours, confirm the details and thank them', 'Ask them to change the date immediately', 'Respond only by phone at night'], 1, 'A prompt, polite confirmation shows reliability and avoids misunderstandings.'),
        qz('You receive a rejection email. What is the best response?', ['Reply angrily', 'Thank them, ask for feedback and keep applying', 'Delete your CV', 'Stop searching'], 1, 'A professional reply keeps doors open and helps you improve.')
      ],
      takeaways: ['Track every application and follow-up date.', 'Reply to invitations promptly and prepare for tests.', 'Handle rejection and offers professionally.'],
      links: [{ t: 'Practise your interview', href: 'interview-coaching.html' }]
    },

    /* ------------------------------------------------------------ 6 */
    {
      id: 'final', title: 'Avoid mistakes and finish strongly', minutes: 20,
      goal: 'Know the most common reasons applications fail, run a final quality check and stay safe from fraud.',
      intro: 'You now have every step in the application process. This last module brings together the most common mistakes, a final checklist to use before every submission and the safety rules that protect you from fraud.',
      blocks: [
        h('The ten most common application mistakes'),
        ol([
          'Not following the instructions in the advert.',
          'Sending the same generic CV and letter to every employer.',
          'Spelling and grammar errors, especially in the employer’s name.',
          'Missing or wrong attachments.',
          'Applying after the deadline.',
          'An unprofessional email address or voicemail.',
          'Claiming things that are not true.',
          'A CV that is too long, crowded or hard to read.',
          'Listing duties instead of achievements.',
          'No follow-up, or too much follow-up.'
        ]),
        h('Your final checklist before every submission'),
        table(['Check', 'Question to ask yourself'], [
          ['Requirements', 'Did I match every essential requirement with evidence?'],
          ['Tailoring', 'Is my CV summary and cover letter written for this job and employer?'],
          ['Accuracy', 'Are names, dates and contact details correct and consistent?'],
          ['Language', 'Did I read it aloud and run a spell check?'],
          ['Instructions', 'Did I follow the subject line, format and documents requested?'],
          ['Files', 'Are the files clear PDFs with professional names that open correctly?'],
          ['Safety', 'Have I verified the employer, and am I sharing only what is necessary?'],
          ['Timing', 'Is it before the deadline, and have I noted my follow-up date?']
        ]),
        h('Protect yourself from fraud'),
        warn('How fake recruiters work', 'They advertise attractive jobs, often abroad or with very high pay. They ask for money for fees, visas or training, ask for your documents and bank details, and disappear. They may copy real company names and logos. They often rush you.'),
        ul([
          'Never pay to apply, to be interviewed or to receive a job offer.',
          'Check the employer through its official website and phone number, not the contacts in the message.',
          'Be careful with job offers received out of the blue.',
          'Never share passwords, one-time codes or bank PINs.',
          'If you are unsure, ask someone you trust, and report the scam to the platform and the authorities.'
        ]),
        h('Protect your online reputation'),
        ul([
          'Employers may look you up. Keep your public profiles respectful and professional.',
          'Make sure your professional profile matches your CV.',
          'Think before you post complaints about employers or colleagues.'
        ]),
        h('Keep going'),
        p('Searching for a job takes persistence. Celebrate small wins, such as finishing a strong application, learn from each response and keep improving. The people who succeed are often those who prepare carefully, follow up politely and do not give up.'),
        tip('Weekly rhythm', 'Set aside fixed times each week: one session to find and verify vacancies, one to tailor and submit applications, and one to follow up and update your tracker.')
      ],
      activity: {
        title: 'Create your application routine',
        prompt: 'This is the last activity. It completes your Application Plan.',
        fields: [
          sel('weekly', 'Number of quality applications I will send each week', ['2–3', '4–5', '6–8', 'More than 8']),
          chips('checklist', 'My personal must-do checks before sending (up to 5)', ['Match requirements to evidence', 'Tailor summary and letter', 'Read it aloud', 'Check names and dates', 'Verify the employer', 'Follow the subject line instructions', 'Open attachments on my phone', 'Note my follow-up date'], 5),
          area('mistakes', 'The mistakes I tend to make, and what I will do about them', 'e.g. I forget to proofread. I will read each letter aloud before sending…'),
          text('goal', 'My application goal for the next 30 days', 'e.g. Send 12 tailored applications and get 2 interviews')
        ]
      },
      quiz: [
        qz('Which action best protects you from fraud?', ['Paying a small fee to secure the interview', 'Verifying the employer through official channels and never paying to apply', 'Sharing your PIN so they can “pay” you', 'Replying to every private message offering a job'], 1, 'Real employers do not charge applicants and can be verified through official channels.'),
        qz('What is the main reason to use a final checklist?', ['It looks impressive', 'It catches avoidable errors before they cost you an interview', 'It is a legal requirement', 'It slows you down'], 1, 'A quick checklist prevents the small mistakes that lose opportunities.'),
        qz('Which is a good weekly routine?', ['Apply to a hundred jobs in one night every month', 'Fixed sessions to find, tailor and submit, then follow up and update the tracker', 'Wait for adverts to come to you', 'Only apply when you feel confident'], 1, 'Regular, steady effort with quality checks beats rare bursts of effort.')
      ],
      takeaways: ['Avoid the common mistakes with a checklist before every submission.', 'Verify every employer and never pay to apply.', 'Build a steady weekly routine and keep going.'],
      links: [{ t: 'See current jobs', href: 'jobs.html' }]
    }
  ];

  root.CG_DATA = {
    config: {
      key: 'ajjs_application_guide', eyebrow: 'Application training', planNav: 'My Application Plan', planName: 'Application Plan', doneTitle: 'Application training completed', course: 'Application training',
      targetMod: 'advert', targetKey: 'role', targetLabel: 'First role to apply for',
      next: [
        { t: 'Build or update your resume', d: 'Create the CV you will tailor for each role.', href: 'resume.html' },
        { t: 'Practise your interview', d: 'Prepare for the call after you apply, with a live practice interview.', href: 'interview-coaching.html' },
        { t: 'Find a vacancy and apply', d: 'Use your plan and checklist on a real opportunity.', href: 'jobs.html' }
      ]
    },
    modules: MODULES,
    welcome: {
      title: 'Welcome to Application training',
      intro: 'Good applications are made, not found. In six short modules you will learn how to read adverts, prepare your documents, write a strong cover letter, submit correctly, follow up and avoid scams. You will finish with a personal Application Plan you can print or save as a PDF.',
      promises: [
        'Learn: a short lesson with examples and templates you can adapt.',
        'Practise: an activity using a real vacancy and your own details.',
        'Check: a quick three-question quiz. Score 2 out of 3 to complete the module.'
      ],
      tips: [
        'Have a real vacancy in mind, for example from the Jobs page, so the activities are practical.',
        'Write truthfully. Your answers are private and saved on this device only.',
        'You can stop and continue any time. Your progress is remembered.'
      ]
    },
    passMark: 2
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.CG_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
