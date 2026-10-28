/* AJ Job Seekers – Interview coaching: lesson modules.
   Block types: h, p, ul, ol, tip, ex (example), table, qa, fieldGuide (filled in from the chosen field). */
(function (root) {
  'use strict';

  var h = function (text) { return { t: 'h', text: text }; };
  var p = function (text) { return { t: 'p', text: text }; };
  var ul = function (items) { return { t: 'ul', items: items }; };
  var ol = function (items) { return { t: 'ol', items: items }; };
  var tip = function (title, text) { return { t: 'tip', title: title, text: text }; };
  var ex = function (title, text) { return { t: 'ex', title: title, text: text }; };
  var table = function (head, rows) { return { t: 'table', head: head, rows: rows }; };
  var qa = function (q, tests, how, avoid, example) { return { t: 'qa', q: q, tests: tests, how: how, avoid: avoid, example: example }; };

  var LESSON = [

    /* ---------------------------------------------------------------- 1 */
    {
      title: 'How interviews work',
      minutes: 8,
      intro: 'An interview is a structured conversation in which an employer decides whether to offer you a job. It is not an interrogation. Employers want to find a good person, so they are hoping you do well. This module explains what they are looking for, the different formats you may meet and the kinds of questions you should expect.',
      blocks: [
        h('What employers are really assessing'),
        p('Behind every question, the interviewer is trying to answer three simple questions about you:'),
        ul([
          'Can you do the job? They look at your skills, knowledge, qualifications and experience.',
          'Will you do the job well? They look at your motivation, attitude, reliability and willingness to learn.',
          'Will you fit in? They look at how you communicate, how you work with others and whether your values match the organisation.'
        ]),
        tip('A useful habit', 'When you hear a question, silently ask yourself: “Which of the three is this really about?” Then make sure your answer proves it with an example.'),

        h('Common interview formats'),
        table(['Format', 'What it is', 'How to succeed'], [
          ['One-to-one', 'You meet one interviewer, often the manager or an HR officer.', 'Build rapport. Keep eye contact and a friendly, professional tone.'],
          ['Panel', 'Two to five interviewers ask you questions in turn.', 'Answer mainly to the person who asked, and include the others with your eye contact.'],
          ['Phone or voice', 'The interview is by phone or an audio call, so nobody sees you.', 'Your voice does everything. Speak clearly, smile as you talk and keep notes in front of you.'],
          ['Video', 'The interview happens on a platform such as Zoom, Teams or Google Meet.', 'Test your technology early, place the camera at eye level and choose a quiet, well-lit place.'],
          ['Group or assessment', 'Several candidates do tasks or discussions together while assessors watch.', 'Contribute, listen to others and be respectful. Do not dominate.'],
          ['Practical or technical test', 'You perform a task, such as typing, teaching a short lesson or solving a problem.', 'Follow the instructions carefully and explain your thinking.']
        ]),

        h('The usual stages of recruitment'),
        ol([
          'Screening: the employer reads your CV and application, and sometimes holds a short phone call.',
          'First interview: general questions about your background, motivation and basic skills.',
          'Second or technical interview: deeper questions, practical tasks or a meeting with the department head.',
          'References and checks: the employer contacts your referees and may verify your certificates.',
          'Offer: you receive a job offer, and you may discuss salary and start date.'
        ]),

        h('The kinds of questions you will meet'),
        ul([
          'Opening questions: “Tell me about yourself.” They help you settle and show how you communicate.',
          'Motivation questions: “Why do you want this job?” They test your interest and research.',
          'Behavioural questions: “Tell me about a time when…” They ask for real examples from your past, because past behaviour is the best predictor of future behaviour.',
          'Situational questions: “What would you do if…?” They test your judgement in imagined situations.',
          'Technical questions: they test the knowledge and skills specific to your field.',
          'Closing questions: “Do you have any questions for us?” They show your interest and curiosity.'
        ]),
        ex('Example: the same skill, tested two ways', 'Behavioural: “Tell me about a time you handled an angry customer.” Situational: “What would you do if a customer shouted at you in front of other customers?” In the first you describe what you did. In the second you explain what you would do. Both need a clear, sensible, specific answer.')
      ],
      takeaways: [
        'Interviewers are judging whether you can do the job, will do it well and will fit in.',
        'Know the format in advance: one-to-one, panel, phone, video, group or practical.',
        'Expect opening, motivation, behavioural, situational, technical and closing questions.',
        'Behavioural questions need real past examples, and situational questions need clear, logical steps.'
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      title: 'Preparing before the interview',
      minutes: 10,
      intro: 'Most of the interview is won before you walk in. Good preparation reduces nerves, gives you better answers and shows the employer that you are serious. This module gives you a practical preparation plan.',
      blocks: [
        h('Step 1: Study the job advert'),
        p('The advert tells you exactly what the employer wants. Treat it like the answer key to the interview.'),
        ol([
          'Highlight the five or six most important requirements, such as skills, qualifications and duties.',
          'For each requirement, find one example from your work, school, volunteering or community life that proves you can do it.',
          'Notice the keywords the employer uses, and use the same words naturally in your answers.',
          'Note any requirement you do not meet yet, and prepare an honest explanation of how you would learn it quickly.'
        ]),
        table(['Requirement in the advert', 'My evidence'], [
          ['Handle customer complaints', 'At my uncle’s shop I resolved about 15 complaints a week, and most customers returned.'],
          ['Use Microsoft Excel', 'I built a stock sheet that cut counting time by half.'],
          ['Work in a team', 'I led a group of five on my final-year project, and we scored the highest mark in the class.']
        ]),

        h('Step 2: Research the organisation'),
        ul([
          'What does it do, and who are its customers, patients, students or clients?',
          'What are its values, mission and recent news or achievements?',
          'How big is it, and where does it work?',
          'Who will interview you? Check the organisation’s website or professional profiles, if they are public.',
          'What problems might the organisation have that you could help to solve?'
        ]),
        tip('Why it matters', 'A candidate who says “I admire your recent expansion into the northern region because I have family there and understand the market” stands out from one who says “I just need a job.”'),

        h('Step 3: Build your story bank'),
        p('Prepare six to eight short stories from your life that you can adapt to many questions. Write each one in STAR form (Situation, Task, Action, Result), which you will learn in detail in module 4. Choose stories about:'),
        ul([
          'Teamwork and helping others',
          'Solving a difficult problem',
          'Leading or taking the initiative',
          'A mistake and what you learned from it',
          'Working under pressure or to a deadline',
          'An achievement you are proud of',
          'A disagreement you resolved',
          'Learning something new quickly'
        ]),
        p('If you have little work experience, use school projects, internships, volunteering, church or community activities, sports and family businesses. Employers care about what you did and learned, not only where it happened.'),

        h('Step 4: Practical preparation'),
        p('The day before the interview, check each of these:'),
        ul([
          'Documents: several copies of your CV, certificates, national ID, a list of referees and any portfolio or samples.',
          'Route and timing: know exactly where the venue is and plan extra time for traffic and transport delays.',
          'Clothing: choose a neat, clean outfit and prepare it in advance.',
          'Notebook and pen: bring them to write down the interviewer’s name and useful points.',
          'Questions to ask: prepare three good questions for the end of the interview.',
          'Phone: charge it and switch it to silent before you enter the building.',
          'For online interviews: test your internet, camera, microphone and charger, and choose a quiet room with a plain background.'
        ]),

        h('Step 5: Practise out loud'),
        p('Reading answers silently is not practice. Say them out loud, because speaking is a skill. Time yourself, record yourself on your phone, and ask a friend to ask you questions. Practise giving each answer in about one minute, which is exactly the time you will have in the live interview later in this coaching.'),
        tip('Do not memorise word for word', 'A memorised script sounds robotic and falls apart if you forget a line. Memorise the structure and the key points, and let the words come naturally.')
      ],
      takeaways: [
        'Use the job advert as an answer key and match each requirement with evidence from your experience.',
        'Research the organisation so you can tailor your answers and ask informed questions.',
        'Prepare a bank of six to eight STAR stories that you can adapt.',
        'Sort out documents, route, clothing and technology the day before.',
        'Practise answering out loud and within time.'
      ]
    },

    /* ---------------------------------------------------------------- 3 */
    {
      title: 'First impressions, body language and voice',
      minutes: 9,
      intro: 'People form an impression within seconds, long before you answer your first question. Your appearance, posture, greeting and voice send a message about how reliable, confident and respectful you are. This module shows you how to make that message a strong one, in person, by phone and online.',
      blocks: [
        h('The first thirty seconds'),
        ul([
          'Arrive 10 to 15 minutes early. Earlier than that can inconvenience the staff, and later creates a poor impression.',
          'Be polite to everyone you meet, from the security officer to the receptionist. Staff often share their impressions of candidates.',
          'Switch off your phone completely or keep it silent and out of sight.',
          'Stand when the interviewer enters or calls you. Smile and greet them, for example “Good morning, Madam. Thank you for seeing me.”',
          'Offer a firm, friendly handshake if the interviewer offers theirs, and say your name clearly.',
          'Wait to be invited to sit down.'
        ]),

        h('What to wear'),
        p('Dress neat, clean and slightly more formal than the daily dress at the workplace. For banks, offices and corporate roles that usually means a suit or smart formal wear. For other settings, neat, smart, comfortable clothes work well. In every case:'),
        ul([
          'Choose clothes that fit well and are ironed.',
          'Wear clean, polished shoes.',
          'Keep jewellery, make-up and perfume simple and light.',
          'Avoid anything distracting, such as very bright patterns, slogans or revealing clothing.'
        ]),

        h('Body language that builds trust'),
        table(['Do', 'Avoid'], [
          ['Sit upright with your back supported and your feet flat.', 'Slouching, leaning far back or sitting on the edge of the chair.'],
          ['Keep comfortable eye contact, looking away naturally now and then.', 'Staring without a break, or looking at the floor or ceiling.'],
          ['Use calm, natural hand gestures that support what you say.', 'Fidgeting, clicking a pen, touching your face or crossing your arms tightly.'],
          ['Nod and smile when appropriate to show you are listening.', 'Checking your phone or watch, or looking bored.'],
          ['Keep your hands visible, resting on the table or your lap.', 'Hiding your hands or tapping on the desk.']
        ]),

        h('Your voice'),
        p('Your voice is just as important as your words, and on a phone or voice interview it is everything.'),
        ul([
          'Pace: speak at a steady, conversational pace. Most people speak at roughly 120 to 150 words per minute. Nervous people often rush.',
          'Volume: speak clearly and loudly enough to be heard without shouting.',
          'Tone: sound warm and positive. Smiling while you speak changes your tone, and the listener can hear it.',
          'Pauses: use a short silence instead of filler words such as “um”, “you know”, “basically” and “like”.',
          'Language: use clear, respectful, professional language. Avoid slang and heavy jargon. Phrases such as “Sir” and “Madam” are appropriate, but do not overdo them.'
        ]),
        tip('The power of the pause', 'A two-second pause before you answer makes you look thoughtful, not weak. It also gives you time to choose your structure.'),

        h('Voice and online interviews'),
        ul([
          'Choose a quiet room, and tell the people around you that you are in an interview.',
          'Use headphones with a microphone if possible, because they give clearer sound.',
          'Place the camera at eye level and look at the camera lens, not at the screen, when you speak.',
          'Make sure your face is lit from the front, and keep the background plain and tidy.',
          'Close other programs and notifications, and keep your phone charger and a backup phone number ready.',
          'Dress fully, as for an in-person interview.',
          'Keep a few notes in front of you, such as your key stories and questions, but do not read from them.'
        ])
      ],
      takeaways: [
        'First impressions form quickly, so be early, polite to everyone, and greet confidently.',
        'Dress neat, clean and slightly more formal than the daily dress at the workplace.',
        'Use open, steady body language, with comfortable eye contact and calm gestures.',
        'Speak clearly at a steady pace, and replace filler words with short pauses.',
        'For online interviews, test your technology and choose a quiet, well-lit space.'
      ]
    },

    /* ---------------------------------------------------------------- 4 */
    {
      title: 'How to answer questions well',
      minutes: 14,
      intro: 'This is the most important module. A great answer is not luck. It follows a method. You will learn a simple habit, two powerful structures (STAR and Present–Past–Future) and how to keep your answers to one minute. The live interview scores you on these exact skills.',
      blocks: [
        h('The five-step answering habit'),
        ol([
          'Listen to the whole question without interrupting. Note the key words.',
          'Pause for two or three seconds to think. If the question is unclear, politely ask for clarification.',
          'Structure your answer. Choose STAR, Present–Past–Future or a steps structure.',
          'Deliver it clearly, concisely and with a specific example.',
          'Finish with a clear closing line, such as “That is how I would approach it” or “That experience taught me the value of planning,” and then stop talking.'
        ]),

        h('The STAR method for behavioural questions'),
        p('Use STAR whenever the question starts with “Tell me about a time…”, “Give an example of…” or “Describe a situation…”.'),
        table(['Letter', 'Meaning', 'What to say', 'Share of your answer'], [
          ['S', 'Situation', 'Set the scene briefly: where, when and what was happening.', 'About 15%'],
          ['T', 'Task', 'Explain your responsibility or goal in that situation.', 'About 10%'],
          ['A', 'Action', 'Describe what you did, step by step, using “I”.', 'About 50%'],
          ['R', 'Result', 'Share the outcome, with a number if possible, and what you learned.', 'About 25%']
        ]),
        ex('A full STAR answer (about 100 words)', 'Question: “Tell me about a time you solved a problem.”  “At my internship at a small trading company, our customers kept complaining that their orders arrived late (Situation). My supervisor asked me to find out why (Task). I compared the order sheets with the delivery records for two weeks and found that orders received after 3 p.m. were being forgotten. I proposed a simple end-of-day checklist, trained two colleagues to use it and checked it daily (Action). Within a month, late deliveries dropped from about twelve a week to two, and I learned how much a small process change can achieve (Result).”'),
        tip('Where to include numbers', 'Numbers make your result believable: how many customers, how much time or money you saved, what percentage you improved, what grade you earned. If you do not know an exact figure, give an honest estimate: “about 30 customers a day”.'),

        h('Present–Past–Future for “Tell me about yourself”'),
        p('This question is not an invitation to tell your life story. It is a request for a short professional introduction that connects you to this job. Use three parts:'),
        ul([
          'Present: who you are and what you do now.',
          'Past: the experience, education and achievements that prepared you for this role.',
          'Future: why you want this job and what you hope to contribute.'
        ]),
        ex('Example (about 80 words)', '“I am a business administration graduate currently working as a volunteer office assistant at a community clinic, where I manage appointments and patient records (Present). Before that, I completed a six-month internship where I helped reduce filing errors by organising a new records system, and I finished my diploma with distinction (Past). I am now looking for an administrative role where I can use my organisation and communication skills, and I am excited about this position because it supports a busy team (Future).”'),

        h('Other useful structures'),
        ul([
          'Steps: for “How would you…?” and technical questions, explain in order: first, then, next, finally. Add why each step matters.',
          'PREP (Point, Reason, Example, Point): for opinion questions such as “What does professionalism mean to you?” State your point, give a reason, add a short example, and restate the point.',
          'Problem–Action–Result: a shorter STAR when you have little time.'
        ]),

        h('Keeping to one minute'),
        p('In the live interview you have one minute for each answer. A one-minute answer is roughly 100 to 130 words when you speak naturally. Practise these habits:'),
        ul([
          'Give the headline first, then the details. Start with your main point, not a long background.',
          'Choose one example and tell it well, rather than three examples badly.',
          'Cut unnecessary details, such as names, long descriptions and side stories.',
          'Watch the time. If you are running out, jump to the result and finish.',
          'Do not stop after one sentence. Very short answers suggest you have little to say. Aim for at least 50 to 70 words.'
        ]),

        h('Make your answer convincing'),
        ul([
          'Use “I” to describe your own role. “We” hides your contribution. You can still credit the team.',
          'Be specific. Names of tools, numbers, places and results beat general statements such as “I am hard working”.',
          'Use the language of your field naturally, but explain any jargon the interviewer may not know.',
          'Reflect the keywords from the job advert.',
          'Be honest. Interviewers often ask follow-up questions, and invented stories fall apart.',
          'Stay positive. Do not criticise former employers, teachers or colleagues.'
        ]),

        h('Weak answer versus strong answer'),
        table(['Weak answer', 'Strong answer'], [
          ['“I am a good team player. I work well with people and I like helping.”', '“In my final-year project, I coordinated a team of five. I split the work by strengths, set twice-weekly check-ins and helped a teammate who was behind. We submitted early and earned the highest mark in the class.”'],
          ['“Um, well, basically I don’t know, maybe I would just try to do my best.”', '“First, I would clarify the goal with my supervisor. Then I would list the tasks by urgency, and finally report my progress daily so there are no surprises.”']
        ]),

        h('Common mistakes to avoid'),
        ul([
          'Rambling without a clear structure or finishing point.',
          'One-word or one-sentence answers.',
          'Answering a different question from the one that was asked.',
          'Memorised scripts that do not sound natural.',
          'Criticising or blaming others.',
          'Being too modest or too boastful, so aim for confident and factual.',
          'Using “we” only, and never saying what you personally did.',
          'Telling lies, or exaggerating your experience.'
        ])
      ],
      takeaways: [
        'Follow the habit: listen, pause, structure, deliver, finish.',
        'STAR (Situation, Task, Action, Result) is the best structure for “Tell me about a time…” questions.',
        'Present–Past–Future gives a clear, focused answer to “Tell me about yourself”.',
        'A one-minute answer is about 100 to 130 words, with the main point first.',
        'Be specific, use “I”, add numbers, stay positive and always be honest.'
      ]
    },

    /* ---------------------------------------------------------------- 5 */
    {
      title: 'Mastering the common questions',
      minutes: 14,
      intro: 'Some questions appear in almost every interview. If you prepare for them well, you will feel confident and have more energy for the unexpected ones. For each question below you will see what it tests, how to answer it and what to avoid.',
      blocks: [
        qa('Tell me about yourself.',
          'Communication, relevance and confidence.',
          'Use Present–Past–Future in under a minute, and make it relevant to the job. Finish with why you want this role.',
          'Your full life story, personal details such as age or family, or reading your CV aloud.',
          'See the example in module 4.'),
        qa('Why do you want this job, and why this organisation?',
          'Motivation and research.',
          'Mention two or three specific things you admire about the organisation or role, link them to your own skills and goals, and show how you would contribute.',
          'Saying “I just need a job”, speaking only about salary, or giving an answer that could apply to any employer.',
          '“I am drawn to this role because your clinic focuses on community health, which is where I want to build my career. My nursing placement in a rural clinic showed me how much early care matters, and I would like to bring that commitment to your team.”'),
        qa('What are your strengths?',
          'Self-awareness and relevance.',
          'Choose two or three strengths that the job needs, and prove each one with a short example or result.',
          'Listing adjectives without evidence, or choosing strengths unrelated to the job.',
          '“My strongest skill is organisation. At my internship I created a filing system that cut document search time from ten minutes to two.”'),
        qa('What is your weakness?',
          'Honesty and the ability to improve.',
          'Name a real weakness that is not essential for the job, and explain what you are doing to improve it, ideally with progress.',
          'Saying “I have no weaknesses”, giving a disguised strength such as “I work too hard”, or naming a weakness that would stop you doing the job.',
          '“I used to find public speaking nerve-wracking. I joined a speaking club last year, and I now present monthly updates to my team.”'),
        qa('Why should we hire you?',
          'Fit and confidence.',
          'Match your top skills and experience to what the employer needs, with evidence, and add what makes you reliable and keen to learn.',
          'Comparing yourself with other candidates, or saying that you need the money.',
          null),
        qa('What are your salary expectations?',
          'Realism and research.',
          'Research the typical range for the role and your experience. Give a reasonable range, say that you are open to discussion depending on the full package, and link it to the value you offer. If it comes up too early, say you would like to understand the role fully first.',
          'Refusing to answer, naming an unrealistic figure, or saying you will accept anything.',
          null),
        qa('Why did you leave your last job, or why are you leaving?',
          'Attitude and professionalism.',
          'Stay positive and honest. Focus on what you are looking for, such as new challenges, growth or a better match, not on what went wrong.',
          'Criticising your employer or colleagues. Interviewers will wonder what you will say about them later.',
          '“I learned a great deal in my last role, but I have reached the point where I want to take on more responsibility, which is why this position appeals to me.”'),
        qa('Can you explain the gap in your CV?',
          'Honesty and what you did with your time.',
          'Be honest, brief and positive. Mention what you did, such as study, caring for family, training, volunteering or job hunting, and what you gained from it.',
          'Hiding the gap, inventing dates or becoming defensive.',
          null),
        qa('Where do you see yourself in five years?',
          'Ambition and commitment.',
          'Show that you want to grow in skills and responsibility within this field and organisation, without sounding like you are using the job only as a stepping stone.',
          'Saying you want the interviewer’s job, or that you have no idea.',
          null),
        qa('How do you handle criticism, pressure or conflict?',
          'Emotional maturity and teamwork.',
          'Use STAR. Show that you listen, stay calm, focus on solutions and learn. Explain what you did, not what the other person did wrong.',
          'Blaming others, saying you never get criticised, or telling a story with no resolution.',
          null),
        qa('Do you have any questions for us?',
          'Interest and preparation.',
          'Always have two or three questions ready. Ask about the role, the team, training, how success is measured and next steps.',
          'Saying “No, nothing”, or asking only about pay, leave and days off. See module 8 for examples.',
          null)
      ],
      takeaways: [
        'Prepare for the predictable questions: yourself, motivation, strengths, weakness, hiring you, salary, leaving, gaps, goals, criticism and your questions.',
        'Every answer should be positive, honest, specific and linked to the job.',
        'Never criticise a previous employer or colleague.',
        'Always prepare questions to ask at the end.'
      ]
    },

    /* ---------------------------------------------------------------- 6 */
    {
      title: 'Technical, situational and field-specific questions',
      minutes: 12,
      intro: 'Beyond the common questions, you will be asked about your specific field, and about imagined situations that test your judgement. This module teaches you how to approach both, and then gives you a guide written for the field you chose.',
      blocks: [
        h('Situational questions: “What would you do if…?”'),
        p('These questions test your judgement, values and problem solving. There is rarely one perfect answer. The interviewer wants to see a sensible, structured process. Use this five-step approach:'),
        ol([
          'Clarify: if needed, ask a short question to understand the situation, for example “Is the customer a regular client?”',
          'Identify priorities: who could be affected, and what matters most, such as safety, accuracy, the customer or the rules?',
          'Decide and act: describe the action you would take and why, referring to policy, procedure or good practice.',
          'Communicate: explain who you would inform, such as your supervisor, the customer or the team.',
          'Follow up: say how you would check that the problem is solved and what you would do to prevent it happening again.'
        ]),
        ex('Example', 'Question: “What would you do if you found a mistake in a report that was already sent to a client?”  “First, I would check exactly what the mistake is and how serious it is. Then I would inform my supervisor immediately, because the client may rely on the information. I would prepare a corrected version and, with my supervisor’s approval, send it with a short, honest explanation. Finally, I would find out how the mistake happened and add a check so it does not happen again.”'),

        h('Technical questions'),
        p('Technical questions test the knowledge of your profession. They may be about concepts, procedures, tools or problem solving. To answer well:'),
        ul([
          'Start with a simple, clear definition or main point, and then explain how it works or how you use it.',
          'Give a short example from your own experience.',
          'Think aloud. Interviewers want to follow your reasoning, not only hear the final answer.',
          'If you do not know, say so honestly and explain how you would find the answer. Never bluff.',
          'Ask for clarification if the question is broad.',
          'Use correct terms from your field, but keep the language understandable.'
        ]),
        tip('Explaining to a non-expert', 'Interviewers sometimes ask you to explain a concept “to someone with no background”. Use plain words, one clear comparison or analogy, and finish with why it matters to them.'),

        { t: 'fieldGuide' },

        h('Using your field vocabulary')
          ,
        p('In the live interview, your answers are checked for relevant words from your field, such as the tools, processes and standards that professionals in your area use. Use these words naturally when they are true for you. Do not stuff your answer with jargon. One precise, correct term is better than five vague ones.')
      ],
      takeaways: [
        'For “What would you do if…?” questions: clarify, prioritise, act, communicate and follow up.',
        'For technical questions: give a clear main point, a practical example and think aloud.',
        'Be honest about what you do not know, and say how you would find out.',
        'Use your field’s vocabulary naturally and accurately.'
      ]
    },

    /* ---------------------------------------------------------------- 7 */
    {
      title: 'Handling nerves and difficult moments',
      minutes: 9,
      intro: 'Almost everyone feels nervous before an interview, even very experienced people. Nerves are not a sign that you will do badly. They are your body getting ready. This module shows you how to control them and how to recover when something goes wrong.',
      blocks: [
        h('Managing nerves'),
        ul([
          'Prepare well. Confidence comes mostly from knowing you have practised.',
          'Breathe slowly. Breathe in through the nose for four seconds, hold for four seconds and breathe out slowly for six seconds. Repeat a few times before you walk in.',
          'Arrive early so you do not feel rushed.',
          'Sit and stand tall. Posture affects how confident you feel.',
          'Reframe the feeling. Tell yourself “I am excited” instead of “I am scared”. The body feels similar, and excitement is useful.',
          'Drink water, eat something light beforehand and sleep well the night before.',
          'Remember that the interviewers want you to do well, because they would love to find the right person.'
        ]),

        h('Difficult moments and how to handle them'),
        table(['Situation', 'What to do'], [
          ['Your mind goes blank', 'Take a breath. Say “May I take a moment to think?” or ask them to repeat the question. Start with something you do know.'],
          ['You do not understand the question', 'Politely ask for clarification: “Could you please explain what you mean by…?”'],
          ['You do not know the answer', 'Be honest. Say what you do know, and explain how you would find out or learn the rest.'],
          ['You make a mistake or contradict yourself', 'Correct it calmly: “Let me correct that…” Then continue. Interviewers respect honesty.'],
          ['The interviewer is silent after your answer', 'Wait calmly for a moment. If needed, add one short example or ask “Would you like me to explain further?” Do not ramble to fill the silence.'],
          ['A stress question or a challenge to your answer', 'Stay calm and polite, do not become defensive, and respond with facts and reasons.'],
          ['An inappropriate or very personal question, such as about marriage, religion or pregnancy plans', 'Stay polite and steer back to the job: “I am fully committed to this role, and I can meet all of its requirements.” You may choose to answer or politely decline.'],
          ['Salary is raised too early', 'Say you would like to understand the role first, and then give a researched range when asked directly.'],
          ['You have limited experience', 'Focus on transferable skills, your results in school, volunteering or projects, and your willingness to learn.'],
          ['A technical problem during an online interview', 'Stay calm. Tell the interviewer, try to reconnect, and use your backup phone number if needed.']
        ]),

        h('Recovering in the middle of an answer'),
        p('If you realise your answer is going off track, do not panic. Use a bridge phrase to reset:'),
        ul([
          '“Let me summarise that in one sentence…”',
          '“To bring it back to your question…”',
          '“The key point is…”'
        ]),
        p('A calm recovery shows maturity, which employers value as much as a perfect answer.'),
        tip('After a bad answer', 'Do not dwell on it. Treat the next question as a fresh start. Many people who recover well get the job.')
      ],
      takeaways: [
        'Nerves are normal, so prepare, breathe slowly and reframe them as excitement.',
        'If your mind goes blank, pause, ask for the question to be repeated and start with what you know.',
        'Be honest about what you do not know, and stay polite when a question is difficult or inappropriate.',
        'Recover from slips calmly, and treat every new question as a fresh start.'
      ]
    },

    /* ---------------------------------------------------------------- 8 */
    {
      title: 'Closing strongly and following up',
      minutes: 8,
      intro: 'The end of the interview is your last chance to make an impression, and what you do afterwards can set you apart from equally qualified candidates. This module covers your closing questions, your final statement, follow-up and what to do with an offer or a rejection.',
      blocks: [
        h('Questions to ask the interviewer'),
        table(['Good questions', 'Poor questions (especially at a first interview)'], [
          ['What would success look like in this role in the first six months?', 'How soon can I take leave, and how many days will I get?'],
          ['What training and development opportunities are offered?', 'What does your organisation do? (You should have researched this.)'],
          ['Can you tell me about the team I would be working with?', 'How much will I be paid, and when can I get a raise?'],
          ['What are the biggest challenges for someone in this position?', 'Do you check whether employees come late?'],
          ['What are the next steps in the process, and when can I expect to hear from you?', '“No, I have no questions.”']
        ]),

        h('Your closing statement'),
        p('Before you leave, finish with a short, confident summary:'),
        ol([
          'Thank them for their time.',
          'Restate your interest in the job.',
          'Briefly link your strengths to what they need.',
          'Ask about the next steps.',
          'Shake hands, smile and leave calmly.'
        ]),
        ex('Example', '“Thank you very much for your time today. I am very interested in this position, and I believe my experience in customer service and my organisation skills would help your team. Could you tell me what the next steps are?”'),

        h('After the interview'),
        ul([
          'Send a short thank-you message or email within about 24 hours.',
          'Write down what went well and what you could improve while it is fresh in your mind.',
          'If the employer gave a date for their decision, wait until that date has passed. If they gave none, wait about a week.',
          'Then send a polite follow-up asking about the status of your application. Do not send repeated messages or visit unannounced.',
          'Keep your referees informed so they are ready for a call.'
        ]),
        ex('Short thank-you message', '“Dear Mr Owusu, thank you for meeting me yesterday about the Accounts Assistant position. I enjoyed learning about your team and am even more interested in the role. Please let me know if you need anything further from me. Kind regards, Ama Mensah.”'),

        h('Offers and rejections'),
        ul([
          'If you receive an offer, thank them warmly. Ask for the offer in writing, and take a reasonable time to decide. If you want to negotiate, do it politely, with research and reasons.',
          'If you are rejected, thank them for the opportunity, ask politely for feedback, and keep the door open. You may be considered for other roles later.',
          'Treat every interview, successful or not, as practice for the next one.'
        ]),

        h('Your interview-day checklist'),
        ul([
          'Documents, pen and notebook are ready, and the phone is on silent.',
          'You know the route and will arrive 10 to 15 minutes early.',
          'You are dressed neatly, and you have eaten and had some water.',
          'You have your STAR stories, your research on the organisation and three questions to ask.',
          'You will greet everyone politely, listen carefully, pause before answering and be honest.',
          'You will thank them and follow up.'
        ])
      ],
      takeaways: [
        'Always have two or three thoughtful questions ready for the end.',
        'Finish with a short summary, thanks and a question about next steps.',
        'Send a thank-you message within 24 hours and follow up politely if you have not heard back.',
        'Handle offers and rejections professionally, and learn from every interview.'
      ]
    }
  ];

  root.IV_LESSON = LESSON;
  if (typeof module !== 'undefined' && module.exports) module.exports = LESSON;
})(typeof window !== 'undefined' ? window : globalThis);
