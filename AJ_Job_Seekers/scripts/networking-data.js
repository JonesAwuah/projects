/* AJ Job Seekers – Networking: guided training content (6 modules, each = Learn → Practise → Check).
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
      id: 'mindset', title: 'What networking really is', minutes: 20,
      goal: 'Replace common fears and myths with a simple, honest way of thinking about networking, and set your own networking goal.',
      intro: 'Many people avoid networking because it sounds like begging, showing off or using people. Real networking is none of these. It is simply building honest, friendly relationships with people who work in the places and fields that interest you. Most people enjoy helping when they are asked politely. In this module you will change how you think about it.',
      blocks: [
        h('Why networking matters for job seekers'),
        p('Employer surveys and hiring studies regularly find that personal contacts and referrals are one of the most common ways people get hired. Many vacancies are filled through a recommendation, or are never advertised at all, because employers trust people who are recommended by someone they know. This is often called the “hidden job market”.'),
        ul([
          'You hear about opportunities earlier than the public does.',
          'Someone who knows you can speak for your character, not only your CV.',
          'You learn what employers in your field really want.',
          'You get advice, encouragement and mentors who help you grow.'
        ]),
        h('Five myths about networking'),
        table(['Myth', 'The truth'], [
          ['“Networking is asking people for a job.”', 'It is asking for advice, information and introductions. Opportunities follow naturally from good relationships.'],
          ['“I do not know anyone important.”', 'You know more people than you think: family, classmates, teachers, neighbours, church or mosque members, former colleagues. Each one knows other people.'],
          ['“It is only for outgoing people.”', 'Quiet people often network best, through one-to-one conversations and careful follow-up.'],
          ['“People are too busy to help.”', 'Most people remember being helped and are glad to give 15 minutes to someone polite and prepared.'],
          ['“It is using people.”', 'Good networking is two-way. You give help, thanks and information as well as receive them.']
        ]),
        h('The giver mindset'),
        p('Approach every conversation by asking, “How could I be useful to this person?” You may share an article, introduce two people, offer a skill, or simply thank them sincerely. People remember those who gave before they asked. Over time this builds trust, which is the real currency of networking.'),
        ex('A small act that opens doors', 'Esi saw a post about a local bank starting a graduate programme and sent the link to her former lecturer who mentored final-year students. The lecturer thanked her, and a month later introduced her to a branch manager who needed an intern. Esi had not asked for anything. She had simply been helpful and visible.'),
        h('The ethics of networking'),
        ul([
          'Be honest about who you are and what you want.',
          'Respect people’s time. Be brief, polite and prepared.',
          'Accept “no” or silence gracefully. Do not pester.',
          'Never ask for money, and never pay anyone to “connect” you to a job.',
          'Keep what people tell you in confidence.',
          'Say thank you, and mean it.'
        ]),
        tip('Start before you need it', 'The best time to build relationships is before you urgently need a job. Even ten minutes a week makes a big difference over a year.')
      ],
      activity: {
        title: 'Set your networking goal',
        prompt: 'Be honest about your fears and be clear about what you want. Your answers appear in your Networking Plan at the end.',
        fields: [
          chips('barriers', 'Which of these hold you back most? (up to 3)', ['I feel shy', 'I do not know who to approach', 'I fear being a bother', 'I do not know what to say', 'I think I have nothing to offer', 'I fear rejection', 'I do not have time', 'I do not have data or internet'], 3),
          area('goal', 'What do you want from networking in the next three months?', 'e.g. I want to learn how people enter accounting and meet three people who work in audit…'),
          area('offer', 'What could you offer to other people?', 'e.g. Help with typing, social media, tutoring, translation, an introduction…')
        ]
      },
      quiz: [
        qz('What is the best description of networking?', ['Asking strangers for jobs', 'Building honest, two-way relationships with people in your field', 'Collecting as many contacts as possible', 'Sending your CV to everyone'], 1, 'Networking is about relationships, information and mutual help, not begging for a job.'),
        qz('Which request is most appropriate when you first contact someone?', ['“Please give me a job.”', '“Could I ask you three short questions about how you started in your career?”', '“Send me money for transport.”', '“Tell your manager to hire me.”'], 1, 'A short, specific request for advice is easy to say yes to and builds the relationship.'),
        qz('Someone asks you to pay a fee so they can “connect” you with a manager who will give you a job. What should you do?', ['Pay quickly', 'Treat it as a possible scam and do not pay', 'Ask a friend to pay', 'Share your bank PIN'], 1, 'Real networking is free. Requests for payment to “secure a job” are a warning sign of fraud.')
      ],
      takeaways: ['Networking means honest, two-way relationships.', 'Ask for advice and information, not for a job.', 'Be helpful first and start before you need it.'],
      links: []
    },

    /* ------------------------------------------------------------ 2 */
    {
      id: 'map', title: 'Map the network you already have', minutes: 25,
      goal: 'Discover how many useful contacts you already have and choose the five people to approach first.',
      intro: 'You do not need to start from nothing. Everybody already has a network, but most people never look at it carefully. In this module you will make a map of your existing contacts and use it to decide who to approach first.',
      blocks: [
        h('The four circles of your network'),
        table(['Circle', 'Who is in it', 'How they can help'], [
          ['Close circle', 'Family, close friends, neighbours', 'Encouragement, introductions to people they know, honest feedback'],
          ['School circle', 'Classmates, lecturers, teachers, alumni, coursemates', 'Information about careers, vacancies and employers. Alumni often help graduates'],
          ['Community circle', 'Church or mosque, clubs, sports teams, volunteer groups, traders and local leaders', 'Trusted recommendations and local opportunities'],
          ['Professional circle', 'Former colleagues and supervisors, internship contacts, people met at events, online contacts', 'Industry knowledge, referrals, references']
        ]),
        p('Many people stop at the first circle. The most surprising opportunities usually come from “weak ties”: people you know a little, who move in different circles from you and therefore know things you do not.'),
        h('Make your contact inventory'),
        ol([
          'Open your phone contacts, WhatsApp groups, social media connections and old notebooks.',
          'List 30 to 50 names across the four circles. Do not judge who “matters”.',
          'Next to each name write what they do, where they work and how you know them.',
          'Mark the ones who work in, or near, your target field, and the ones who know many people.',
          'Mark anyone who has already offered to help you.'
        ]),
        ex('A tiny example', 'Kwame is looking for a logistics job. His list includes: Uncle Yaw (works at a clearing agency, close circle), Ms Adjei (former lecturer, supply chain, school circle), Pastor Dan (knows many business owners, community circle) and Ama (classmate now working at a shipping company, professional circle). All four can help in different ways, and Kwame had never thought of contacting them.'),
        h('Choose your first five people'),
        p('You cannot talk to everybody at once, so choose five people for the next 30 days. Good choices have at least one of these qualities:'),
        ul([
          'They work in your target field or a related one.',
          'They are one or two steps ahead of you, for example someone who started their career a few years ago.',
          'They know many people, such as a community leader or a teacher.',
          'They already like you and are likely to respond.'
        ]),
        tip('Warm before cold', 'Start with people who already know you (“warm” contacts). Once you are comfortable, you can reach out to people you have never met, preferably with a mutual connection or a clear reason.'),
        h('Ask for introductions'),
        p('At the end of a conversation, ask: “Is there anyone else you think I should talk to?” This simple question turns one contact into several. Always thank the person and keep them informed about how the introduction went.'),
        h('Look for hidden opportunities'),
        ul([
          'Alumni groups and lecturer contacts for graduate programmes and internships.',
          'Professional associations and trade groups that hold meetings and training.',
          'Community and church or mosque announcements about local opportunities.',
          'Employers in your area that you can approach directly, even without an advert.'
        ])
      ],
      activity: {
        title: 'Map your network and pick your first five',
        prompt: 'Write real names. You do not have to contact everybody. This is only a map.',
        fields: [
          area('close', 'People in my close circle who could help or introduce me', 'e.g. Uncle Yaw (clearing agent), Aunty Abena (nurse)…'),
          area('school', 'People from school who could help (lecturers, alumni, classmates)', 'e.g. Ms Adjei (lecturer), Ama (classmate at a shipping company)…'),
          area('community', 'People in my community, church, mosque or clubs who know people', 'e.g. Pastor Dan, Mr Osei (market association)…'),
          area('professional', 'Former colleagues, supervisors or online contacts', 'e.g. Mr Boateng (former supervisor)…'),
          area('first5', 'My first five people to contact in the next 30 days, and why', '1. … 2. … 3. … 4. … 5. …')
        ]
      },
      quiz: [
        qz('What is a “weak tie” and why is it valuable?', ['A person you dislike', 'Someone you know a little who moves in different circles and therefore knows different things', 'A person who never replies', 'A person who works in your office'], 1, 'Weak ties connect you to new information and opportunities you would not hear about from close friends.'),
        qz('Who should you contact first?', ['Famous people you have never met', 'Warm contacts who work in or near your target field and are likely to respond', 'Anyone who posts job offers asking for money', 'Nobody until you have a perfect CV'], 1, 'Warm contacts are easier to approach and quickly build your confidence.'),
        qz('What is a very useful question to ask at the end of a conversation?', ['“Can I have your salary?”', '“Is there anyone else you think I should talk to?”', '“Will you hire me tomorrow?”', '“Why did you ignore me?”'], 1, 'Asking for further introductions multiplies your network while respecting the person’s time.')
      ],
      takeaways: ['You already have a network. Map it by circles.', 'Start with warm contacts, then widen.', 'Ask for introductions at the end of every conversation.'],
      links: []
    },

    /* ------------------------------------------------------------ 3 */
    {
      id: 'intro', title: 'Introduce yourself with confidence', minutes: 25,
      goal: 'Create a clear 30-second introduction and learn how to start and carry a conversation.',
      intro: 'When someone asks, “So, what do you do?” most people mumble or say too much. A short, clear introduction makes you memorable and shows people how they can help. In this module you will write your own, and practise starting conversations calmly.',
      blocks: [
        h('The 30-second introduction'),
        p('An introduction (sometimes called an “elevator pitch”) is a short answer to “Tell me about yourself”. It should be about 60 to 80 words and follow a simple three-part formula:'),
        ol([
          'Who you are: your name, and your field or training.',
          'What you do well: one or two strengths, ideally with a short proof.',
          'What you are looking for: one clear aim, so people know how to help.'
        ]),
        ex('Example introduction', '“Good afternoon, I am Ama Mensah. I recently graduated in Business Administration and I have been doing records and customer service at a trading company for a year. I am good at organising information and keeping customers happy; last year I cut our filing time by about a third. I am now looking to move into an administrative or operations role at a growing company.”'),
        tip('Practise it out loud', 'Say your introduction aloud until it sounds natural, not memorised. Practise with a friend or record yourself on your phone. Adjust it for each audience.'),
        h('Starting a conversation'),
        ul([
          'Smile, make eye contact and greet politely. In Ghana a proper greeting matters, so greet first and take your time.',
          'Use a simple opening: “Hello, I am Kofi. Are you also here for the training?”',
          'Ask open questions that invite more than yes or no: “How did you get started in this work?”, “What do you enjoy most about it?”, “What are the biggest changes in your field right now?”',
          'Listen more than you talk. Nod, respond to what they say and ask follow-up questions.',
          'Find common ground: your school, hometown, interests, or mutual acquaintances.'
        ]),
        h('Body language and voice'),
        table(['Do', 'Avoid'], [
          ['Stand or sit upright with a relaxed, open posture', 'Crossing your arms or hiding your hands'],
          ['Give a firm, friendly handshake where appropriate and respect local customs', 'Looking at your phone while someone speaks'],
          ['Speak clearly at a steady pace and smile', 'Speaking too fast, too softly or interrupting'],
          ['Use the person’s name and remember it', 'Talking only about yourself']
        ]),
        h('Moving the conversation along'),
        p('A good conversation has a natural shape: greeting, common ground, questions, your short introduction, a sincere thank-you and a polite exit. It is fine to leave. Say, “It was really nice to meet you. May I connect with you on WhatsApp or LinkedIn so I can keep in touch?”'),
        h('Handling nerves'),
        ul([
          'Arrive early, when the room is quiet and it is easier to meet people.',
          'Set a small goal: talk to two people and get one contact.',
          'Breathe slowly and remember that most people feel nervous too.',
          'Prepare two or three questions in advance.'
        ]),
        warn('Do not oversell', 'Avoid exaggerating your experience or title. People may check, and honesty builds more trust than impressive claims.')
      ],
      activity: {
        title: 'Write your introduction',
        prompt: 'Use the formula: who you are, what you do well, what you are looking for.',
        fields: [
          area('pitch', 'My 30-second introduction (60–80 words)', 'Good afternoon, I am… I am good at… I am looking for…'),
          area('questions', 'Three open questions I can ask when I meet someone in my field', '1. … 2. … 3. …'),
          text('ask', 'One clear thing I could ask for (advice, an introduction, information)', 'e.g. Advice on how to start a career in audit'),
          chips('situations', 'Where will you practise your introduction first?', ['With a friend', 'In front of a mirror', 'At a school or alumni event', 'At church or mosque', 'At a professional meeting', 'On a call', 'In a WhatsApp voice note'], 3)
        ]
      },
      quiz: [
        qz('Which is the best structure for a short introduction?', ['Your life story from birth', 'Who you are, what you do well, what you are looking for', 'Only your name', 'A list of every job you have applied for'], 1, 'A clear three-part introduction is brief, memorable and tells people how to help.'),
        qz('Which question encourages the other person to talk?', ['“Do you work here?”', '“How did you get started in this field?”', '“Is it good?”', '“Are you busy?”'], 1, 'Open questions invite stories and give you information and common ground.'),
        qz('At the end of a good first conversation, what should you do?', ['Leave without a word', 'Thank them and ask to keep in touch', 'Ask them to give you a job immediately', 'Take their business cards without asking'], 1, 'A polite thank-you and a request to stay in touch begins the follow-up that makes networking work.')
      ],
      takeaways: ['Prepare a clear 30-second introduction and practise it aloud.', 'Ask open questions and listen more than you talk.', 'Thank people and ask to stay in touch.'],
      links: []
    },

    /* ------------------------------------------------------------ 4 */
    {
      id: 'reach', title: 'Reach out by message, call and email', minutes: 30,
      goal: 'Write polite, short messages that get replies, and ask for advice or introductions the right way.',
      intro: 'Much networking today happens through WhatsApp, email, LinkedIn and phone calls. Messages that are short, polite and specific get replies. Messages that are long, vague or demanding get ignored. This module gives you ready-to-adapt templates and the rules behind them.',
      blocks: [
        h('Five rules for a message people answer'),
        ol([
          'Greet properly and use their name and title: “Good morning Mr Boateng”.',
          'Say who you are and how you know them or found them, in one sentence.',
          'Make one clear, small request, for example 15 minutes or three questions.',
          'Show you did your homework: mention something about their work.',
          'Make it easy to say yes, offering flexible times, and thank them.'
        ]),
        tip('Keep it short', 'A good first message is five or six lines. People read messages on their phones, often in a hurry. If it needs scrolling, it is too long.'),
        h('Template 1: Asking someone you know for advice (WhatsApp or SMS)'),
        tpl('WhatsApp to a warm contact', 'Good afternoon Mr Boateng. I hope you are well. This is Kofi Asare, who studied under you in the Accounting department in 2023. I am now exploring a career in audit and I remember you spoke highly of the profession. Could I ask you three short questions about how to get started? It would take about 15 minutes by phone or in person, at a time that suits you. Thank you very much.', 'Replace the names, field and details with your own. Keep the tone respectful.'),
        h('Template 2: Contacting someone you have not met (email)'),
        tpl('Email to a professional', 'Subject: Request for brief career advice – Kofi Asare\n\nDear Madam,\n\nMy name is Kofi Asare and I am a final-year accounting student at [University]. I read about your work on [project or article] and I admire how you [specific thing].\n\nI am planning to build a career in audit and would be grateful for 15 minutes of your time to ask two or three questions about how you started and what skills matter most. I am happy to call or meet at a time that suits you.\n\nThank you for considering my request.\n\nYours sincerely,\nKofi Asare\n[Phone number] | [Email address]', 'Add a link to your professional profile if you have one. Never attach a long CV in the first message unless asked.'),
        h('Template 3: Asking for an introduction'),
        tpl('Message asking for an introduction', 'Good morning Pastor Dan. Thank you again for your advice last week. You mentioned that Mrs Owusu works in logistics. I would be very grateful if you could introduce me to her, or let me know if I may mention your name when I contact her. I want only to ask her for advice about starting out in the industry. Thank you for your help.'),
        h('Template 4: Asking about a vacancy or internship'),
        tpl('Message to an organisation', 'Good afternoon. My name is Ama Mensah and I recently completed a Diploma in Business Administration. I have experience in records and customer service and I am looking for an internship or entry-level role in administration. If there are any current or upcoming opportunities, may I send my CV? Thank you for your time.', 'Contact a named person where possible. Check the organisation’s official channels.'),
        h('Template 5: Phone call'),
        tpl('Call opening script', '“Good morning, Mr Boateng. This is Kofi Asare. I got your number from Ms Adjei at the university. Is this a good time for a very quick call, or should I call back later? … Thank you. I am exploring a career in audit and wanted to ask for your advice…”'),
        h('If nobody replies'),
        ul([
          'Wait about one week, then send a short, polite reminder.',
          'If there is still no reply after a second message, let it go with thanks. They may be busy, so do not take it personally.',
          'Try another person. Reaching out to several people increases your chances.'
        ]),
        warn('Common mistakes', 'Sending a CV with “please give me a job” as the only message, writing in all capital letters, using slang or very long voice notes, messaging at night or on holidays, and asking people you have not met for money or favours.'),
        h('Protect yourself'),
        ul([
          'Verify who you are talking to. Be careful of accounts with no history or stolen photos.',
          'Do not share your ID, bank details, passwords or one-time codes with anyone.',
          'Do not pay any “recruitment”, “registration” or “processing” fee.',
          'Report suspicious messages to the platform and to the authorities.'
        ])
      ],
      activity: {
        title: 'Draft your first outreach message',
        prompt: 'Choose one of your first five people from Module 2 and write the message you would send. You may copy a template and personalise it.',
        fields: [
          text('person', 'Who you will contact', 'e.g. Ms Adjei, my former lecturer'),
          sel('channel', 'The best channel for this person', ['WhatsApp message', 'Email', 'LinkedIn message', 'Phone call', 'In person']),
          area('message', 'Your draft message (5 to 6 lines)', 'Good afternoon Ms Adjei. This is… I would like to ask…'),
          text('send', 'When will you send it?', 'e.g. Tomorrow before 10 a.m.')
        ]
      },
      quiz: [
        qz('Which message is most likely to get a helpful reply?', ['“Hi. I need a job. Help me.”', 'A short, polite message that explains who you are, why you are writing and asks for 15 minutes of advice', 'A long life story with your CV', 'A voice note of five minutes'], 1, 'Short, polite, specific requests are easy to answer.'),
        qz('Someone does not reply to your first message. What should you do?', ['Send ten messages in one day', 'Wait about a week and send one polite reminder', 'Insult them publicly', 'Give up forever'], 1, 'A single polite follow-up is professional. Repeated messages are annoying.'),
        qz('Which of these should you never do?', ['Thank the person for their time', 'Share your bank PIN or pay a “fee” for a job introduction', 'Offer flexible times', 'Mention something about their work'], 1, 'Never share sensitive details or pay anyone to connect you with a job. Those are classic scam tactics.')
      ],
      takeaways: ['Keep messages short, polite and specific.', 'Ask for advice or an introduction, not a job.', 'Follow up once, and stay alert for scams.'],
      links: []
    },

    /* ------------------------------------------------------------ 5 */
    {
      id: 'places', title: 'Events, online presence and etiquette', minutes: 30,
      goal: 'Know where to meet people, show up professionally online and in person, and behave in ways that build trust.',
      intro: 'You now know who to contact and what to say. This module shows you where to meet new people and how to make a professional impression online and offline, because your reputation is built by what people see and hear about you.',
      blocks: [
        h('Where to meet people'),
        table(['Place', 'Why it works', 'How to use it'], [
          ['Alumni and school events', 'Shared background makes conversation easy', 'Join the alumni group. Attend talks and career days and offer to help'],
          ['Professional associations and seminars', 'People in your field gather to learn', 'Attend as a student or junior member and introduce yourself to speakers'],
          ['Job fairs and recruitment days', 'Employers are actively meeting candidates', 'Bring several copies of your CV and research the employers first'],
          ['Training courses and workshops', 'You meet like-minded learners and trainers', 'Exchange contacts and form a study group'],
          ['Community, church or mosque, and clubs', 'Trusted relationships and local leaders', 'Offer your skills and speak with people about your goals'],
          ['Volunteering and service projects', 'People see how you work', 'Choose projects related to your field'],
          ['Online communities and webinars', 'Easy and low-cost access to people', 'Join thoughtfully, ask good questions and share useful information']
        ]),
        h('Before an event'),
        ol([
          'Find out who will be there: speakers, companies, organisers.',
          'Choose two or three people you want to meet and read about them.',
          'Prepare your introduction and two or three open questions.',
          'Dress neatly and appropriately, and arrive early.',
          'Carry a pen, a notebook and several copies of your CV or a contact card.'
        ]),
        h('During and after an event'),
        ul([
          'Talk to a few people properly rather than many briefly.',
          'Write down the name and a detail from each conversation, such as “works at XYZ bank, loves football”.',
          'Within 24 hours, send a short message: “It was great meeting you at the seminar. Thank you for your advice about…”.'
        ]),
        h('Your professional presence online'),
        ul([
          'Use one clear, professional photo, a descriptive headline and a short summary on your professional profile.',
          'Use a sensible email address and WhatsApp profile picture and status when job hunting.',
          'Review your public posts. Remove anything offensive, boastful or unprofessional.',
          'Share useful posts, congratulate others and comment thoughtfully. This shows your interests and builds recognition.',
          'Keep your profile consistent with your CV: dates, jobs and qualifications must match.'
        ]),
        ex('A strong profile headline', 'Instead of “Job seeker”, write: “Business Administration graduate | Office administration | Excel and customer service”. It tells people immediately what you do and how to help.'),
        h('Etiquette in groups and online'),
        table(['Do', 'Avoid'], [
          ['Introduce yourself in a new group and read the group rules', 'Posting your CV or adverts repeatedly in every group'],
          ['Share useful information and thank people who help', 'Spamming, forwarding unverified messages or arguing'],
          ['Reply politely and promptly', 'Sending messages late at night or on public holidays'],
          ['Use clear language and proper greetings', 'Using all capitals, slang and excessive emojis in professional messages'],
          ['Keep private matters private', 'Sharing other people’s details without permission']
        ]),
        h('Video and phone meetings'),
        ul([
          'Test your internet, camera and microphone beforehand.',
          'Choose a quiet place with a plain background and good light.',
          'Join on time, mute when not speaking and keep your camera at eye level.'
        ]),
        warn('Check before you trust', 'Fake recruiters and events exist. Confirm the organiser, the venue and the contacts through official channels. Be careful with any event or group that asks for money before it shows who is involved.')
      ],
      activity: {
        title: 'Plan where you will meet people',
        prompt: 'Choose real places you can reach in the next 60 days.',
        fields: [
          chips('events', 'Which places will you use? (up to 4)', ['Alumni or school events', 'Professional association meetings', 'Job fairs', 'Training courses and workshops', 'Church, mosque or community groups', 'Volunteering', 'Online communities and webinars', 'Industry seminars'], 4),
          text('headline', 'My professional headline (one line)', 'e.g. Business Administration graduate | Office administration | Excel'),
          area('cleanup', 'Three things I will change or check on my online profiles', '1. Update my WhatsApp picture 2. … 3. …'),
          area('event1', 'One specific event or group I will attend in the next 30 days, and my goal there', 'e.g. The university career day on 12 March. Meet two people in banking.')
        ]
      },
      quiz: [
        qz('What should you do within 24 hours after meeting someone at an event?', ['Wait a month', 'Send a short thank-you message mentioning your conversation', 'Ask for a job', 'Forget about it'], 1, 'A prompt, personal message helps the person remember you and starts the relationship.'),
        qz('Which is a good professional headline?', ['“Looking for work”', '“Business Administration graduate | Office administration | Excel and customer service”', '“Hustler”', '“Please hire me”'], 1, 'It tells people what you do and how to help in one line.'),
        qz('A group chat is for professional networking. What is good behaviour?', ['Posting your CV ten times a day', 'Reading the rules, introducing yourself and sharing useful information', 'Insulting members you disagree with', 'Sending messages at midnight'], 1, 'Respectful, helpful participation builds a good reputation.')
      ],
      takeaways: ['Meet people through alumni, associations, events, community and online groups.', 'Prepare before events and follow up within 24 hours.', 'A professional online presence and good etiquette protect your reputation.'],
      links: []
    },

    /* ------------------------------------------------------------ 6 */
    {
      id: 'keep', title: 'Follow up and keep relationships alive', minutes: 30,
      goal: 'Turn contacts into lasting relationships, ask for referrals and references properly, and build a simple weekly networking habit.',
      intro: 'Meeting someone once is not networking. Relationships are built over time through thanks, follow-up and being helpful. This last module shows you how to keep contacts warm, ask for referrals in a way that respects people, and make networking a habit that continues throughout your career.',
      blocks: [
        h('Say thank you'),
        p('A thank-you message is the simplest and most powerful follow-up. Send it within 24 hours after someone helps you. Mention something specific that you learned or will do.'),
        tpl('Thank-you after a career chat', 'Good evening Mr Boateng. Thank you very much for taking time to speak with me today. Your advice to complete a recognised accounting certificate before applying to audit firms was very helpful, and I have already started looking at the courses. I will keep you updated on my progress. Thank you again.'),
        h('Keep a simple contact tracker'),
        p('Use a notebook or a spreadsheet with these columns so nobody is forgotten:'),
        table(['Name', 'Who they are', 'Last contact', 'What we discussed', 'Next step and date'], [
          ['Mr Boateng', 'Audit manager, former lecturer', '12 Mar, call', 'Accounting certificates', 'Send progress update, 12 Apr'],
          ['Ms Adjei', 'Supply chain lecturer', '15 Mar, WhatsApp', 'Internship ideas', 'Share my CV, 20 Mar']
        ]),
        h('Give value, not just requests'),
        ul([
          'Congratulate people on promotions, new jobs or achievements.',
          'Share an article, event or vacancy that would help them or their friends.',
          'Introduce two people who might help each other.',
          'Offer a skill you have, such as typing, design or translation.',
          'Update people on how their advice helped you. This pleases them and encourages them to help again.'
        ]),
        ex('The 80/20 idea', 'A good rule is to give or share much more than you ask. If most of your messages are requests, people may begin to avoid you. If most of them are helpful or friendly, people will be glad to hear from you when you do need something.'),
        h('How often to keep in touch'),
        table(['Type of contact', 'Suggested rhythm'], [
          ['Mentors and key supporters', 'Every 1 to 2 months'],
          ['Professional contacts in your target field', 'Every 3 months'],
          ['Wider network', 'Twice a year, plus congratulations on big news']
        ]),
        h('Asking for a referral or a reference'),
        ol([
          'Ask only people who know your work or character well.',
          'Ask politely and give them the chance to say no: “Would you be comfortable recommending me for…?”',
          'Tell them about the job and send your CV, so they can speak accurately.',
          'Give plenty of time, and thank them whatever the outcome.',
          'Let them know the result.'
        ]),
        tpl('Asking for a reference', 'Good morning Mrs Owusu. I hope you are well. I am applying for an accounts officer position at [Company] and I would be honoured if you could act as a reference, since you supervised me during my internship. I can send my updated CV and the job description so you know what is needed. Please feel free to decline if you are too busy. Thank you for everything you have already done for me.'),
        h('Find a mentor'),
        p('A mentor is an experienced person who gives guidance over time. Look for someone you respect in your field, ask for a specific piece of advice first, and build the relationship gradually. Be reliable: if you say you will do something, do it. A formal request (“Will you be my mentor?”) often comes after a few good conversations.'),
        h('Make it a weekly habit'),
        ul([
          'Send two or three genuine messages each week.',
          'Reach out to one new person each month.',
          'Attend one event or group meeting every month.',
          'Review your tracker every Sunday.'
        ]),
        tip('Consistency beats intensity', 'Ten minutes a day over a year builds a bigger network than one busy weekend. Treat it like exercise: small, regular and steady.')
      ],
      activity: {
        title: 'Create your weekly networking habit',
        prompt: 'This is the last activity. It completes your Networking Plan.',
        fields: [
          sel('time', 'Time I will give to networking each week', ['30 minutes', '1 hour', '2 hours', 'More than 2 hours']),
          chips('habits', 'My regular networking habits (up to 4)', ['Send 2–3 messages a week', 'Contact one new person each month', 'Attend one event a month', 'Update my tracker every Sunday', 'Share one useful post a week', 'Thank people within 24 hours', 'Congratulate contacts on good news'], 4),
          area('tracker', 'How I will track my contacts and follow-ups', 'e.g. A notebook with a page for each person, reviewed every Sunday evening…'),
          area('mentor', 'The kind of mentor I want, and one person I could ask', 'e.g. Someone in audit with 5+ years experience… Mr Boateng')
        ]
      },
      quiz: [
        qz('When should you send a thank-you message after someone helps you?', ['After a month', 'Within about 24 hours', 'Never', 'Only if you get the job'], 1, 'A prompt, specific thank-you shows appreciation and keeps the relationship warm.'),
        qz('What is a good way to ask someone to be your reference?', ['Put their name on your CV without asking', 'Ask politely, explain the job, send your CV and let them decline', 'Demand it', 'Ask them on the day of the deadline'], 1, 'Always ask permission, give context and time and make it easy for them to say no.'),
        qz('Which habit builds the strongest network over time?', ['Contacting people only when you need a job', 'A small, regular routine of helpful messages, follow-up and events', 'Collecting hundreds of names', 'Meeting people once and never again'], 1, 'Consistency builds trust, which is what makes networking work.')
      ],
      takeaways: ['Thank people quickly and keep a simple contact tracker.', 'Give value and keep in touch regularly, not only when you need help.', 'Ask for references and referrals politely, with context.'],
      links: [{ t: 'Browse job opportunities', href: 'jobs.html' }]
    }
  ];

  root.CG_DATA = {
    config: {
      key: 'ajjs_networking_guide', eyebrow: 'Networking training', planNav: 'My Networking Plan', planName: 'Networking Plan', doneTitle: 'Networking training completed', course: 'Networking training',
      targetMod: 'mindset', targetKey: 'goal', targetLabel: 'My goal',
      next: [
        { t: 'Get your resume ready to share', d: 'Contacts often ask for your CV. Build a clean one-page resume first.', href: 'resume.html' },
        { t: 'Browse job opportunities', d: 'Use your contacts and your introduction when you apply.', href: 'jobs.html' },
        { t: 'Continue with the Career Guides', d: 'Set goals, build skills and plan your next steps.', href: 'career-guides.html' }
      ]
    },
    modules: MODULES,
    welcome: {
      title: 'Welcome to Networking training',
      intro: 'Networking means building honest relationships with people who can advise you, introduce you and recommend you. In six short modules you will learn how, practise with your own contacts, and finish with a personal Networking Plan you can print or save as a PDF.',
      promises: [
        'Learn: a short lesson with examples and ready-to-use messages.',
        'Practise: an activity using your own real contacts and goals.',
        'Check: a quick three-question quiz. Score 2 out of 3 to complete the module.'
      ],
      tips: [
        'Work through the modules in order. Each one builds on the last.',
        'Use real names in the activities. Only you can see them.',
        'Your progress and answers are saved on this device only, so you can leave and return.'
      ]
    },
    passMark: 2
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.CG_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
