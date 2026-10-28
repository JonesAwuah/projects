/* AJ Job Seekers – Career Guides: course content (6 modules, each = Learn → Practise → Check). */
(function (root) {
  'use strict';

  var h = function (text) { return { t: 'h', text: text }; };
  var p = function (text) { return { t: 'p', text: text }; };
  var ul = function (items) { return { t: 'ul', items: items }; };
  var ol = function (items) { return { t: 'ol', items: items }; };
  var tip = function (title, text) { return { t: 'tip', title: title, text: text }; };
  var ex = function (title, text) { return { t: 'ex', title: title, text: text }; };
  var warn = function (title, text) { return { t: 'warn', title: title, text: text }; };
  var table = function (head, rows) { return { t: 'table', head: head, rows: rows }; };
  var qz = function (q, o, a, e) { return { q: q, o: o, a: a, e: e }; };
  var chips = function (key, label, options, max, help) { return { kind: 'chips', key: key, label: label, options: options, max: max, min: 1, help: help }; };
  var text = function (key, label, ph, help) { return { kind: 'text', key: key, label: label, ph: ph, help: help }; };
  var area = function (key, label, ph, help) { return { kind: 'area', key: key, label: label, ph: ph, help: help }; };
  var sel = function (key, label, options, help) { return { kind: 'select', key: key, label: label, options: options, help: help }; };

  var MODULES = [

    /* ------------------------------------------------------------ 1 */
    {
      id: 'know', title: 'Know yourself', minutes: 20,
      goal: 'Find out what you are good at, what you enjoy and what matters to you, so that your career choices fit you.',
      intro: 'Most people choose a career because of family pressure, money, or because a friend chose it. These can all matter, but careers chosen without self-knowledge often end in boredom or regret. In this first module you will build a clear picture of your strengths, interests and values. Everything else in this guide builds on it.',
      blocks: [
        h('The three things to discover'),
        ol([
          'Strengths: what you are good at, including skills you have learned and qualities you were born with.',
          'Interests: what you enjoy doing, even when nobody is paying you.',
          'Values: what must be true about your work for you to feel it is worthwhile, for example security, helping others, freedom or growth.'
        ]),
        p('A good career sits where these three meet. A job that uses your strengths but ignores your interests will drain you. A job that matches your interests but ignores your values will frustrate you.'),

        h('Types of skills'),
        table(['Type', 'Meaning', 'Examples'], [
          ['Technical (hard) skills', 'Specific abilities you learn and can test.', 'Typing, bookkeeping, programming, nursing procedures, driving, welding'],
          ['Transferable skills', 'Skills useful in almost any job.', 'Communication, problem solving, organising, teamwork, using computers, time management'],
          ['Personal qualities', 'How you behave and approach work.', 'Reliable, honest, patient, curious, hard-working, calm under pressure']
        ]),
        tip('You have more skills than you think', 'Running a household budget, organising a church or school event, selling at a market, or leading a student group all build real skills. Employers value them when you describe them well.'),

        h('Understanding your interests'),
        p('Interests fall into broad styles of work. Most people lean towards two or three:'),
        ul([
          'Hands-on: building, repairing, farming, operating equipment.',
          'Thinking: analysing, researching, solving technical problems, working with data.',
          'Creative: designing, writing, performing, producing media.',
          'Helping: caring for, teaching or advising people.',
          'Leading: persuading, selling, managing and starting things.',
          'Organising: planning, record keeping, accuracy and following procedures.'
        ]),

        h('Clarifying your values'),
        p('Values are the reasons behind your choices. When two jobs look equal on paper, your values decide which one you will enjoy. Ask yourself: if I had to give up one of these, which would hurt most: a high income, job security, flexible hours, helping people, status, learning new things, or working with a close team?'),

        h('How to collect evidence'),
        ul([
          'Ask three people who know you well: “What am I good at?” You will often hear strengths you take for granted.',
          'List five moments from school, work or home when you felt proud or time passed quickly. Look for patterns.',
          'Notice what you do when nobody tells you to, such as helping neighbours with phones, tutoring juniors or planning events.'
        ]),
        ex('Worked example: Akosua', 'Akosua studied Business Administration because her uncle did. When she listed her proud moments, three were about organising events for her church youth group and one about teaching a younger cousin to read. Her strengths were organising and explaining; her interests were helping and organising; she valued stability and being useful. She now explores roles in training coordination and HR, which fit her far better than the sales jobs she had been applying for.'),

        h('Common mistakes at this stage'),
        ul([
          'Copying someone else’s path without checking whether it fits you.',
          'Choosing only for salary or status and ignoring daily tasks.',
          'Believing that your interests must match your certificate. Many people work happily outside what they studied.',
          'Judging yourself too harshly. Look for real strengths, not perfection.'
        ])
      ],
      activity: {
        title: 'Build your personal profile',
        prompt: 'Complete this honestly. There are no right answers. Your choices appear in your Career Plan at the end.',
        fields: [
          chips('strengths', 'Pick up to 6 of your strongest skills and qualities', ['Communication', 'Teamwork', 'Organising', 'Problem solving', 'Computer skills', 'Writing', 'Numbers and accuracy', 'Customer care', 'Leadership', 'Creativity', 'Teaching others', 'Reliability', 'Time management', 'Persuading people', 'Practical / hands-on skills', 'Research', 'Patience', 'Languages', 'Selling', 'Planning', 'Calm under pressure', 'Learning quickly', 'Honesty', 'Negotiation'], 6),
          chips('interests', 'Pick up to 3 work styles you enjoy most', ['Hands-on', 'Thinking and analysing', 'Creative', 'Helping people', 'Leading and selling', 'Organising and accuracy'], 3),
          chips('values', 'Pick the 3 values that matter most in your work', ['Job security', 'Good income', 'Helping others', 'Learning and growth', 'Flexibility', 'Respect and status', 'Teamwork', 'Independence', 'Creativity', 'Making a difference', 'Work-life balance', 'Challenge'], 3),
          area('proud', 'Describe one moment from school, work or home when you felt really proud', 'e.g. I organised the school’s career day and 200 students attended…')
        ]
      },
      quiz: [
        qz('Which statement best describes a career that fits you?', ['It has the highest salary available', 'It is where your strengths, interests and values meet', 'It is the same as what your parents did', 'It is whatever job is open first'], 1, 'A fulfilling career sits where what you are good at, what you enjoy and what matters to you overlap.'),
        qz('Which of these is a transferable skill?', ['Operating one specific machine model', 'Communicating clearly with different people', 'Knowing one company’s password', 'Being born in a certain town'], 1, 'Transferable skills such as communication are useful in almost any job.'),
        qz('A friend says “I have no skills because I have never had a job.” What is the best advice?', ['Agree, and wait for a job offer', 'List what they have done at school, home and in the community, because those build real skills', 'Lie about having experience', 'Only apply for jobs requiring no skills'], 1, 'Skills come from many places. Describing them well is part of the career journey.')
      ],
      takeaways: ['Self-knowledge comes before career choice.', 'Strengths, interests and values should all be considered.', 'Ask others and look for patterns in your proud moments.'],
      links: []
    },

    /* ------------------------------------------------------------ 2 */
    {
      id: 'explore', title: 'Explore careers', minutes: 25,
      goal: 'Discover the sectors and roles open to you and pick two or three realistic targets to investigate properly.',
      intro: 'With your profile in hand, you can now look at the world of work. The aim of this module is not to pick one perfect career, but to shortlist a few promising ones and learn how to research them so your choice is based on facts rather than guesses.',
      blocks: [
        h('Sectors where people work in Ghana'),
        table(['Sector', 'Typical roles', 'What it often rewards'], [
          ['Banking, finance and insurance', 'Teller, relationship officer, accountant, auditor, risk analyst', 'Accuracy, integrity, professional qualifications'],
          ['ICT and digital', 'Support technician, developer, data analyst, network engineer', 'Technical skills, portfolio, continuous learning'],
          ['Health and care', 'Nurse, midwife, pharmacy technician, community health worker', 'Licensing, compassion, resilience'],
          ['Education and training', 'Teacher, tutor, trainer, school administrator', 'Teaching licence, patience, communication'],
          ['Agriculture and agribusiness', 'Farm manager, extension officer, processor, exporter', 'Practical skills, business sense'],
          ['Construction and engineering', 'Civil, electrical or mechanical engineer, technician, site supervisor', 'Technical competence, safety record'],
          ['Hospitality, tourism and retail', 'Front desk, chef, sales assistant, event coordinator', 'Customer service, teamwork, reliability'],
          ['Energy, mining and manufacturing', 'Plant operator, geologist, quality controller, maintenance technician', 'Safety, technical training, shift work'],
          ['Public service and NGOs', 'Administrator, programme officer, community development worker', 'Qualifications, process knowledge, commitment'],
          ['Media, creative and marketing', 'Content creator, designer, journalist, marketing officer', 'Portfolio, creativity, adaptability'],
          ['Transport and logistics', 'Driver, dispatcher, warehouse supervisor, supply chain officer', 'Organisation, licences, punctuality'],
          ['Self-employment and entrepreneurship', 'Trader, artisan, consultant, service business owner', 'Initiative, money management, customers']
        ]),
        tip('Regulated professions', 'Some careers, such as nursing, teaching, accounting, engineering and law, require registration or a licence from a professional body. Before you commit, check the current entry requirements with the official body for that profession.'),

        h('How to research a career properly'),
        ol([
          'Read real job adverts. Look at several for the same role and note the common qualifications, skills and tasks. The Jobs page on this site is a good start.',
          'Find out the daily tasks. Ask: “What would I actually do between 8 a.m. and 5 p.m.?” Not what the title sounds like.',
          'Talk to two or three people doing the job. Ask what they like, what is hard and how they started. Most people are glad to help when asked politely.',
          'Check the entry routes: required qualifications, licences, training or experience, and how long they take.',
          'Check demand and pay realistically by looking at current vacancies in your area, not at stories you heard.'
        ]),
        ex('A short message to request a career chat', 'Good afternoon Mr Boateng. I am a final-year accounting student and I admire your work in audit. Could I ask you three short questions about how you started and what you would advise someone like me? It would take about 15 minutes at a time that suits you. Thank you for considering.'),

        h('The three-question test for every target role'),
        ul([
          'Do I want the daily tasks? Could I do this work for years without being bored?',
          'Can I get there? Is the route realistic for my qualifications, money and time?',
          'Is there demand? Are employers hiring for it now or likely to in the next few years?'
        ]),
        p('If the answer to all three is yes, the role goes on your shortlist. If one answer is no, ask if you can change it, for example through training, or whether another role is a better fit.'),

        h('Think in “families” of jobs, not one title'),
        p('If your dream job is hard to enter, look at related roles in the same family. Someone who wants to be a software developer might start in IT support or testing. Someone who wants to be a manager might start as a team assistant. Related roles build the same skills and often lead to your target.'),
        warn('Beware of job myths', 'Do not choose a career only because “it pays well” or “everyone is doing it”. Crowded fields can be harder to enter, and a role you dislike will limit your performance and your growth.')
      ],
      activity: {
        title: 'Shortlist your targets',
        prompt: 'Using the sector table and your profile from Module 1, choose where you want to look first.',
        fields: [
          chips('sectors', 'Pick up to 3 sectors that interest you', ['Banking, finance and insurance', 'ICT and digital', 'Health and care', 'Education and training', 'Agriculture and agribusiness', 'Construction and engineering', 'Hospitality, tourism and retail', 'Energy, mining and manufacturing', 'Public service and NGOs', 'Media, creative and marketing', 'Transport and logistics', 'Self-employment'], 3),
          text('target', 'The job title you want to work towards', 'e.g. Accounts Officer'),
          text('stepping', 'A related role you could start in', 'e.g. Accounts Clerk'),
          area('why', 'Why does this role fit your strengths, interests and values?', 'Link it to your profile from Module 1…'),
          text('person', 'Someone you could ask for a career chat', 'e.g. A cousin who works in a bank')
        ]
      },
      quiz: [
        qz('What is the best first step when researching a career?', ['Ask one friend what they think', 'Read several real job adverts and talk to people in the role', 'Choose the highest-paying job', 'Wait until you graduate'], 1, 'Real adverts and conversations with practitioners give you facts about tasks, requirements and demand.'),
        qz('What is a “stepping-stone” role?', ['A job you do for free', 'A related entry-level role that builds the skills for your target role', 'A job with no responsibilities', 'A job you take only for the salary'], 1, 'Related roles build skills and contacts that lead to your target.'),
        qz('Why should you check the requirements of a profession such as nursing or accounting early?', ['They are all the same', 'Many need registration or a licence, which affects your route and timeline', 'Because they are easy to enter', 'Because requirements never change'], 1, 'Regulated professions have official entry routes. Planning for them early prevents surprises.')
      ],
      takeaways: ['Shortlist two or three roles instead of searching for one perfect career.', 'Research with real adverts and real people.', 'Test each role: daily tasks, route and demand.'],
      links: [{ t: 'View current jobs', href: 'jobs.html' }]
    },

    /* ------------------------------------------------------------ 3 */
    {
      id: 'goals', title: 'Set goals and make a plan', minutes: 25,
      goal: 'Turn your target role into clear goals, a 90-day action plan and a way to stay on track.',
      intro: 'A dream without a plan is only a wish. Goals make your target concrete, and a short action plan makes the first step obvious. In this module you will write a SMART goal and a 30-60-90 day plan you can start this week.',
      blocks: [
        h('Why goals work'),
        p('Clear goals focus your energy, help you say no to distractions and give you a way to measure progress. People who write their goals down and review them regularly are far more likely to follow through than people who only keep them in their heads.'),

        h('The SMART method'),
        table(['Letter', 'Question to ask', 'Weak goal → strong goal'], [
          ['Specific', 'What exactly do I want?', '“Get a better job” → “Become an accounts officer”'],
          ['Measurable', 'How will I know I have achieved it?', '“Improve my skills” → “Pass the bookkeeping certificate exam”'],
          ['Achievable', 'Is it realistic with my time and resources?', '“Become CEO next year” → “Move into a supervisor role in 18 months”'],
          ['Relevant', 'Does it connect to my profile and target?', 'Choose goals that support your chosen career'],
          ['Time-bound', 'By when?', '“Someday” → “By 31 July next year”']
        ]),
        ex('SMART goal example', 'By the end of next September I will have completed an accounting software course, built a one-page portfolio of three example reports, and applied for at least 20 accounts officer vacancies, so that I can start an accounts role within 12 months.'),

        h('Plan backwards'),
        p('Start with the result and work back to today. Imagine it is one year from now and you have the job. What had to happen in the month before? In the six months before? In the first month? The answers become your milestones.'),

        h('The 30-60-90 day plan'),
        table(['Period', 'Focus', 'Example actions'], [
          ['Days 1–30', 'Foundation', 'Finish your profile, update your CV, list target employers, start one learning habit'],
          ['Days 31–60', 'Build', 'Complete the first course module, do two informational chats, apply to the first ten roles'],
          ['Days 61–90', 'Push', 'Practise interviews, apply to more roles, review what is working and adjust']
        ]),
        tip('Make the first step tiny', 'If a task feels big, shrink it until it takes ten minutes, such as “open the CV template and type my name and contact details”. Starting is the hardest part, and small wins build momentum.'),

        h('Stay on track'),
        ul([
          'Schedule it: put your goal tasks at fixed times each week, for example Tuesday and Thursday 7 p.m.',
          'Find an accountability partner: tell a friend or mentor your goal and report progress weekly.',
          'Track progress: write down what you completed each week. Seeing it keeps you motivated.',
          'Review monthly: ask what worked, what did not and what to change.',
          'Expect setbacks: rejections, delays and low-energy weeks are normal. Adjust the plan, not the dream.'
        ]),

        h('Always have a Plan B'),
        p('A Plan B is not a lack of faith. It is wisdom. If your first-choice role takes longer, what related job could you take in the meantime? If your exam does not go well, when will you retake it? Thinking about this ahead of time keeps you calm and moving.')
      ],
      activity: {
        title: 'Write your goal and 30-day plan',
        prompt: 'Be specific. Include numbers and dates wherever you can.',
        fields: [
          area('smart', 'My 12-month SMART goal', 'By [date] I will… so that…'),
          area('actions30', 'Three actions I will complete in the next 30 days', '1. … 2. … 3. …'),
          text('helper', 'The person who will keep me accountable', 'e.g. My older sister Efua'),
          text('planb', 'My Plan B if the first plan takes longer', 'e.g. Start as an office assistant and study part-time'),
          sel('hours', 'Hours per week I can give to my career plan', ['2–3 hours', '4–6 hours', '7–10 hours', 'More than 10 hours'])
        ]
      },
      quiz: [
        qz('Which of these is a SMART goal?', ['I want to be successful', 'I will get a better job soon', 'By 30 June I will complete a customer-service course and apply for 15 jobs', 'I will try my best'], 2, 'It is specific, measurable, achievable, relevant and has a deadline.'),
        qz('What does “plan backwards” mean?', ['Starting with easy tasks only', 'Starting with the end result and working back to what must happen first', 'Doing the plan in reverse order of importance', 'Planning only the last month'], 1, 'Working back from the result shows which milestones and first steps you need.'),
        qz('You miss a week of your plan because you were ill. What is the best response?', ['Abandon the plan', 'Restart with a smaller step and adjust the timeline', 'Pretend nothing happened', 'Blame yourself and quit'], 1, 'Setbacks are normal. Adjusting and continuing keeps you moving.')
      ],
      takeaways: ['Write SMART goals, with a number and a date.', 'Plan backwards from the result to your first small step.', 'Use accountability, tracking and a Plan B.'],
      links: []
    },

    /* ------------------------------------------------------------ 4 */
    {
      id: 'skills', title: 'Build the skills employers want', minutes: 30,
      goal: 'Identify the gap between where you are and your target role, and make a realistic plan to close it.',
      intro: 'Employers hire people who can do the work or learn it quickly. Once you know your target role, the next step is to compare what the role needs with what you have, and build a plan to fill the gaps. This module shows you how.',
      blocks: [
        h('Step 1: Do a skills gap analysis'),
        p('Take three real job adverts for your target role. List every skill and qualification they ask for. Then compare with what you have:'),
        table(['Skill required', 'Level now (0–3)', 'Gap', 'Action'], [
          ['Excel for reports', '1', 'Large', 'Online course + practise with 3 real files'],
          ['Customer communication', '2', 'Small', 'Role-play and volunteer at a help desk'],
          ['Accounting software', '0', 'Large', 'Free trial + short certificate course']
        ]),
        tip('Focus on skills that appear in most adverts', 'If a skill appears in nearly every advert, it is essential. If it appears in one, it is optional. Start with the essentials.'),

        h('Step 2: Choose your learning channels'),
        ul([
          'Free online courses and videos: great for digital skills, languages and many technical topics. Always finish something rather than starting ten courses.',
          'Short courses and certificates: from training centres, TVET institutions, universities or professional bodies. Check that the provider is recognised.',
          'Mentors and supervisors: one hour with an experienced person can save months of trial and error.',
          'Practice projects: build something real, such as a budget for a small shop, a lesson plan, a simple website or a mock report.',
          'On-the-job learning: ask for tasks that stretch you, and for feedback.'
        ]),
        ex('The 70-20-10 rule', 'Research on workplace learning suggests that roughly 70% of useful skills come from doing real tasks, 20% from learning from other people and 10% from formal courses. Use courses to start, but make sure you practise.'),

        h('Step 3: The skills every employer values'),
        table(['Skill', 'What it looks like in practice', 'How to build it'], [
          ['Digital skills', 'Email, Word, Excel, online meetings, cloud storage, basic data entry', 'Practise daily. Do an online office-skills course'],
          ['Communication', 'Clear writing, listening, speaking politely and briefly', 'Write short reports, volunteer to present, join a club'],
          ['Problem solving', 'Breaking a problem into steps and testing solutions', 'Handle real problems at home or in your community and note what you did'],
          ['Teamwork', 'Sharing work, supporting others, accepting feedback', 'Group projects, sports, community work'],
          ['Time management', 'Meeting deadlines and planning your day', 'Use a diary, set priorities, review weekly'],
          ['Adaptability', 'Learning new tools and coping with change', 'Try a new tool or task every month']
        ]),

        h('Step 4: Make a realistic learning schedule'),
        ul([
          'Choose at most two skills at a time. Focus beats scatter.',
          'Fix a weekly time slot. Two focused hours, three times a week, beats a long session once a month.',
          'Set a finish date for each course and a proof of learning, such as a certificate, a project or a test result.',
          'Review every month: Am I improving? What should I change?'
        ]),

        h('Step 5: Collect proof'),
        p('Skills are believed when they are shown. Keep a folder of certificates, project samples, written references and positive feedback. Add the best of them to your CV and professional profile. A short portfolio of two or three examples can set you apart from candidates who only list skills.'),
        warn('Avoid certificate collecting', 'Ten certificates you cannot apply are less valuable than one skill you can demonstrate. Always ask: “What can I now do that I could not before?”')
      ],
      activity: {
        title: 'Plan to close your skills gap',
        prompt: 'Use the adverts you found in Module 2 to complete this honestly.',
        fields: [
          area('have', 'Skills I already have for my target role', 'e.g. Customer care, basic Excel, report writing…'),
          area('missing', 'The top 2–3 skills I still need', 'e.g. 1. Accounting software 2. Advanced Excel'),
          area('how', 'How and by when I will learn each one', 'e.g. Accounting software: 6-week course, finish by 30 March…'),
          chips('channels', 'Which learning channels will you use?', ['Free online courses', 'Short certificate course', 'A mentor', 'Practice projects', 'On-the-job tasks', 'Professional body training', 'Study group'], 7),
          text('proof', 'What proof will you have at the end?', 'e.g. Certificate and two sample reports')
        ]
      },
      quiz: [
        qz('What is a skills gap analysis?', ['A list of every skill you have', 'A comparison between what the target role needs and what you currently have', 'A test given by employers', 'A way to compare yourself with a friend'], 1, 'It shows exactly what to learn next.'),
        qz('Which approach is best for learning a new skill?', ['Start ten courses at once', 'Choose one or two skills, set a schedule and practise on real tasks', 'Wait for a perfect course', 'Collect as many certificates as possible'], 1, 'Focus, consistency and practice build skill.'),
        qz('Why should you keep proof of your skills?', ['It is required by law', 'Employers believe what you can show, such as projects, results and references', 'It makes your CV longer', 'It is only for managers'], 1, 'Evidence makes your skills credible.')
      ],
      takeaways: ['Use real adverts to find your skills gap.', 'Learn by doing: practise on real tasks.', 'Keep a folder of proof for your CV and interviews.'],
      links: [{ t: 'Build your resume', href: 'resume.html' }]
    },

    /* ------------------------------------------------------------ 5 */
    {
      id: 'experience', title: 'Gain experience and build your brand', minutes: 30,
      goal: 'Get relevant experience even without a job, turn it into strong achievements and present yourself professionally.',
      intro: '“No experience” is the most common barrier for new job seekers. The good news is that experience can be built in many ways, and what matters is what you learned and what you achieved. This module shows you how to find experience, describe it well and build a professional reputation, online and offline.',
      blocks: [
        h('Ways to gain experience without a full-time job'),
        table(['Route', 'What it offers', 'Tip'], [
          ['Internships and attachments', 'Real workplace tasks and references', 'Apply directly to organisations, not only advertised places'],
          ['National service', 'A structured year of work experience for graduates', 'Think about placements that match your target role'],
          ['Volunteering', 'Responsibility, teamwork and community links', 'Choose roles that use the skills you want to build'],
          ['Freelance or small jobs', 'Paid practice and customers', 'Start with people you know and ask for testimonials'],
          ['Personal projects', 'Proof of initiative and skill', 'Build something visible, such as a budget, plan, website or portfolio'],
          ['Apprenticeship or trade training', 'Hands-on skills from an expert', 'Agree on what you will learn and for how long'],
          ['Leadership in school or community', 'Evidence of responsibility', 'Take a role such as secretary, treasurer or event organiser']
        ]),
        tip('Ask for what you want', 'Many organisations never advertise internships. A short, polite message to a manager saying what you can do, for how long and what you hope to learn can open doors that job adverts never will.'),

        h('Turn experience into achievements'),
        p('Employers do not want a list of duties. They want to know what difference you made. Use this formula:'),
        ex('Action + task + result', 'Duty: “Responsible for customer calls.”\nAchievement: “Answered about 40 customer calls a day and resolved 90% on the first call, raising our satisfaction score from 80% to 92%.”'),
        ul([
          'Start with a strong verb: organised, reduced, trained, led, designed, increased.',
          'Add a number: how many, how much, how often, how fast.',
          'End with the result: what improved because of you.'
        ]),
        p('If you do not know your numbers, estimate honestly, for example “about 30 customers per day”. Never invent figures.'),

        h('Build a professional presence'),
        ul([
          'Email: use a simple professional address based on your name, such as ama.mensah@…',
          'Phone: use a polite voicemail or caller tune, and answer professionally when you are job hunting.',
          'WhatsApp and social media: employers may look at them. Remove unprofessional posts and photos, and make your public profile positive.',
          'Professional networking profile: write a clear headline (for example “Accounting graduate | Excel | Customer service”) and a short summary of your strengths and goals.',
          'Portfolio: collect two or three samples of your best work in one folder or one page.',
          'References: ask two people, such as a lecturer, supervisor or community leader, if they will speak well of you, and tell them what roles you are applying for.'
        ]),

        h('Make networking comfortable'),
        p('Networking is simply building honest relationships. Start with people you already know: relatives, classmates, former colleagues, church or community members. Tell them clearly what you are looking for. Many jobs are filled through personal recommendations before they are ever advertised. Always say thank you, and offer to help others where you can.'),

        warn('Never pay to get a job', 'Real employers do not ask you to pay for an interview, a “registration fee”, a uniform or a job offer. If someone asks for money, or contacts you only through private chat with promises of easy work abroad, it is probably a scam. Verify the company, never share your ID or bank PIN, and report suspicious offers.')
      ],
      activity: {
        title: 'Create your experience plan',
        prompt: 'Choose routes you can start within the next 30 days.',
        fields: [
          chips('routes', 'Which experience routes will you try?', ['Internship or attachment', 'National service', 'Volunteering', 'Freelance or small jobs', 'Personal project', 'Apprenticeship', 'Leadership role in school or community'], 4),
          area('achievements', 'Write 2–3 achievements using Action + task + result', 'e.g. Organised a fundraising event that raised GH₵2,500 from 120 donors…'),
          text('headline', 'Your professional headline (one line)', 'e.g. Business Administration graduate | Office support | Excel'),
          text('referees', 'Two people you will ask to be referees', 'e.g. Mr Mensah (lecturer), Mrs Owusu (supervisor)')
        ]
      },
      quiz: [
        qz('Which statement is the strongest on a CV?', ['Responsible for customer service', 'Handled about 40 customer calls a day and resolved 90% at the first contact', 'Good with customers', 'Worked at a company'], 1, 'It starts with an action, includes numbers and shows the result.'),
        qz('Someone asks you to pay a “registration fee” before they will interview you for an overseas job. What should you do?', ['Pay quickly to secure the job', 'Treat it as a possible scam, verify the company and do not pay', 'Ask a friend to pay', 'Share your ID to prove you are serious'], 1, 'Genuine employers do not charge for jobs. Verify first and protect your information.'),
        qz('Which is a good way to gain experience if you cannot find a job?', ['Wait until a job appears', 'Volunteer, build a project or offer your skills in a related role', 'Stop applying', 'Exaggerate your CV'], 1, 'Volunteering, projects and small jobs all build real, showable experience.')
      ],
      takeaways: ['Experience can come from many routes.', 'Describe achievements with action, task and result.', 'Protect yourself from job scams and keep your online presence professional.'],
      links: [{ t: 'Open the resume builder', href: 'resume.html' }]
    },

    /* ------------------------------------------------------------ 6 */
    {
      id: 'search', title: 'Job search, first 90 days and growth', minutes: 30,
      goal: 'Run an organised job search, start a new job well and keep growing in your career.',
      intro: 'You now have a profile, a target, a plan, growing skills and experience. This last module brings it together: how to run an effective job search, how to succeed in your first 90 days, and how to keep progressing for years.',
      blocks: [
        h('Run your job search like a project'),
        ol([
          'Set a weekly target, for example “10 quality applications, 3 conversations and 1 follow-up message every day”.',
          'Use several channels: job boards such as this site’s Jobs page, employers’ websites, recruitment agencies, networking and direct approaches to organisations.',
          'Track everything in a notebook or spreadsheet: employer, role, date applied, contact person, next step and result.',
          'Tailor every application. Match your CV and cover letter to the advert, using its keywords and showing evidence for each requirement.',
          'Follow up politely about one week after the deadline if you have heard nothing.',
          'Review weekly: which applications get replies? Adjust your CV, targets or approach.'
        ]),
        table(['Quantity approach', 'Quality approach'], [
          ['Sending the same CV to 100 employers', 'Sending 10 tailored applications with a short, personal cover letter'],
          ['Waiting for replies', 'Following up and contacting people inside the organisation'],
          ['Applying only to advertised jobs', 'Also asking organisations directly and using personal contacts']
        ]),
        tip('Prepare for the interview early', 'Do not wait for an invitation. Practise with the Interview Coaching on this site so you are ready when the call comes.'),

        h('Handling rejection'),
        p('Rejection is part of every job search, even for excellent candidates. It rarely means you are not good enough. Often it means another candidate was a closer match or the role was filled internally. Do not take it personally. If possible, politely ask for feedback and use it to improve. Then move on to the next application.'),

        h('Your first 90 days in a new job'),
        table(['Period', 'Priorities'], [
          ['Week 1', 'Be punctual and positive. Learn names, rules, systems and who does what. Ask questions and take notes.'],
          ['Days 1–30', 'Learn the job and the organisation. Deliver small tasks well. Ask your supervisor what success looks like and how you will be assessed.'],
          ['Days 31–60', 'Work more independently. Ask for feedback. Build relationships across the team.'],
          ['Days 61–90', 'Show initiative. Suggest one improvement. Agree your goals for the next six months.']
        ]),
        ul([
          'Arrive early and keep your promises. Reliability builds trust faster than anything else.',
          'Learn from mistakes quickly, and report them honestly rather than hide them.',
          'Respect everyone, from the security officer to the director.',
          'Protect confidential information and company property.'
        ]),

        h('Growing your career'),
        ul([
          'Keep learning: take a new course or skill every year.',
          'Ask for feedback and a mentor: they help you see what you cannot see.',
          'Keep a record of your achievements so that you can show your value when you ask for promotion or a new role.',
          'Prepare for promotion: do the work of the next level, make your results visible and ask clearly.',
          'Build a wider network inside and outside your organisation.',
          'If you must change career, use your transferable skills, learn what is missing and move in steps.'
        ]),

        h('Money basics for your first job'),
        ul([
          'Make a simple monthly budget: income, needs, wants and savings.',
          'Build an emergency fund, even a small one, to cover a few months of basic costs.',
          'Understand your pay slip, tax and pension contributions, and keep your records.',
          'Avoid high-interest debt for non-essential spending.'
        ])
      ],
      activity: {
        title: 'Plan your search and your first 90 days',
        prompt: 'This is the last activity. It completes your Career Plan.',
        fields: [
          sel('weekly', 'My weekly target for job applications', ['3–5 quality applications', '6–10 quality applications', '11–15 quality applications', 'More than 15 applications']),
          chips('channels', 'The channels I will use to find work', ['Job websites', 'Employers’ websites', 'Recruitment agencies', 'Personal network', 'Direct approach to organisations', 'Professional bodies', 'Social media job groups'], 7),
          area('first90', 'What I will do in the first 90 days of a new job', 'e.g. Learn the systems, ask for feedback every two weeks, deliver one improvement…'),
          text('learning', 'One skill or course I will pursue after I get the job', 'e.g. Professional accounting certificate')
        ]
      },
      quiz: [
        qz('What is the best way to approach applications?', ['Send the same CV to every employer', 'Send fewer, tailored applications and follow up', 'Apply only to jobs that are advertised', 'Wait for employers to contact you'], 1, 'Tailored applications and follow-up have a higher chance of success than mass applications.'),
        qz('You receive a rejection email. What is the best response?', ['Give up', 'Reply angrily', 'Thank them, ask for feedback if possible and keep applying', 'Ignore it and stop searching'], 2, 'A polite reply and a willingness to learn keeps relationships and improves your next application.'),
        qz('What is a strong priority in your first month at a new job?', ['Showing that you know more than everyone', 'Learning the job, the people and what success looks like for your supervisor', 'Avoiding questions', 'Arriving late to look busy'], 1, 'Learning, listening and clarifying expectations builds a strong start.')
      ],
      takeaways: ['Treat the job search as a project with weekly targets and tracking.', 'Rejection is normal. Learn and continue.', 'Your first 90 days and your continued learning shape your long-term career.'],
      links: [{ t: 'Practise your interview', href: 'interview-coaching.html' }, { t: 'Find jobs', href: 'jobs.html' }]
    }
  ];

  var WELCOME = {
    title: 'Welcome to your Career Guide',
    intro: 'This is a guided training with six short modules. In each one you will Learn, Practise, and Check your understanding. You will end with a personal Career Plan you can print or save as a PDF.',
    promises: [
      'Learn: a short lesson with examples from the Ghanaian job market.',
      'Practise: an activity where you apply the lesson to your own life.',
      'Check: a quick three-question quiz. Score 2 out of 3 to complete the module.'
    ],
    tips: [
      'Set aside 25 to 30 minutes for each module and finish them in order.',
      'Be honest in the activities. Nobody else sees your answers.',
      'Your progress and answers are saved on this device only, so you can leave and return.'
    ]
  };

  root.CG_DATA = { modules: MODULES, welcome: WELCOME, passMark: 2 };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.CG_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
