/* AJ Job Seekers – Interview coaching: fields, question banks and the theory test. */
(function (root) {
  'use strict';

  var q = function (t, type) { return { t: t, type: type }; };
  var th = function (qq, o, a, e) { return { q: qq, o: o, a: a, e: e }; };

  /* ================================================================ FIELDS */
  var FIELDS = [

    /* ---------------------------------------------------------- business */
    {
      id: 'business',
      name: 'Business & Administration',
      blurb: 'Office, secretarial, project support and management roles.',
      vocab: ['administration', 'office', 'schedule', 'calendar', 'minutes', 'meeting', 'correspondence', 'filing', 'records', 'documentation', 'database', 'spreadsheet', 'excel', 'word', 'email', 'reports', 'procurement', 'inventory', 'stakeholder', 'coordinate', 'prioritise', 'prioritize', 'confidential', 'confidentiality', 'deadline', 'budget', 'supplier', 'invoice', 'front desk', 'reception', 'travel arrangements', 'workflow', 'process', 'efficiency', 'compliance', 'policy', 'communication'],
      guide: {
        intro: 'Administrative employers want someone dependable, organised and discreet who keeps the office running smoothly and makes their managers’ work easier.',
        looksFor: ['Organisation and the ability to prioritise many tasks', 'Accuracy and attention to detail', 'Discretion with confidential information', 'Professional communication and good use of office software'],
        topics: ['Managing calendars, meetings and travel', 'Records, filing and document control', 'Reception, visitors and telephone calls', 'Procurement and office supplies', 'Writing emails, minutes and reports'],
        tips: ['Give examples with numbers, for example “I managed schedules for twelve people”.', 'Name the tools you use, such as Word, Excel, email and calendar software, and what you achieved with them.', 'Show that you stay calm when several people need something at once.', 'Stress accuracy and confidentiality, because they are central in this field.'],
        sample: {
          q: 'Tell me about a time you handled several urgent tasks at once.',
          a: 'At my internship at a trading company, three managers asked for urgent documents on the same morning (Situation). I had to deliver all of them before noon (Task). I asked each manager for their deadline, ranked the tasks by urgency, and told two of them honestly when theirs would be ready. I finished the first within an hour and the others on time (Action). As a result, all three deadlines were met, and my supervisor began giving me the weekly reporting (Result).'
        }
      },
      theory: [
        th('An interviewer for an administrative role asks how you handle confidential documents. Which answer shows the strongest understanding?',
          ['“I never read them, so it is not a problem.”', '“I store them securely, share them only with authorised people, never discuss them outside work, and I can give you an example.”', '“I tell my close friends only the harmless parts.”', '“I leave them on my desk so they are easy to find.”'], 1,
          'A strong answer describes concrete steps for protecting information and backs them with an example. Vague or careless answers suggest a risk to the employer.'),
        th('You are asked how you cope when several managers want urgent work at the same time. What should your answer include?',
          ['That you do the work of the loudest person first.', 'That you would refuse some requests.', 'How you check deadlines, rank tasks by urgency and importance, and communicate honestly about timing.', 'That it never happens in a well-run office.'], 2,
          'Employers want a clear method for prioritising and a habit of communicating about deadlines, not a response based on who is loudest.'),
        th('When asked about software skills for an office job, the best approach is to…',
          ['List every program you have ever opened.', 'Name the tools you really use and give an example of something useful you achieved with them.', 'Say you can learn anything, without giving examples.', 'Say that software is not important.'], 1,
          'Naming real tools and showing a result proves your skill, while an unsupported list or vague promise does not.')
      ],
      questions: [
        q('Walk me through how you would organise your day if you had five urgent requests from different managers at once.', 'tech'),
        q('How do you keep records and documents organised so that anyone on the team can find them?', 'tech'),
        q('Describe a time you handled confidential information. How did you protect it?', 'beh'),
        q('Which office software and tools are you comfortable with, and how have you used them to save time?', 'tech'),
        q('How would you prepare for, and follow up after, an important meeting you are supporting?', 'tech'),
        q('Tell me about a time you improved a process or made a task more efficient.', 'beh'),
        q('A manager gives you an instruction that conflicts with another manager’s instruction. What do you do?', 'tech'),
        q('How do you handle a difficult or upset visitor or caller at the front desk?', 'tech'),
        q('Describe how you would plan an event or a business trip from start to finish.', 'tech'),
        q('What steps do you take to make sure your emails and reports are accurate and professional?', 'tech'),
        q('Tell me about a time you had to manage several tasks and still meet every deadline.', 'beh'),
        q('How would you keep track of office supplies and order more without overspending?', 'tech'),
        q('How do you build good working relationships with colleagues in other departments?', 'beh'),
        q('What would you do if you realised you had made an error in a document that was already sent out?', 'tech')
      ]
    },

    /* ----------------------------------------------------------- finance */
    {
      id: 'finance',
      name: 'Accounting, Banking & Finance',
      blurb: 'Accounting, audit, banking, insurance, tax and financial analysis.',
      vocab: ['accounting', 'accounts payable', 'accounts receivable', 'reconciliation', 'reconcile', 'ledger', 'journal', 'audit', 'budget', 'forecast', 'variance', 'cash flow', 'financial statements', 'balance sheet', 'income statement', 'ifrs', 'tax', 'vat', 'paye', 'ssnit', 'gra', 'compliance', 'internal controls', 'risk', 'fraud', 'payroll', 'invoice', 'treasury', 'loan', 'credit', 'interest', 'reporting', 'accuracy', 'excel', 'spreadsheet', 'month-end', 'regulatory', 'kyc', 'due diligence'],
      guide: {
        intro: 'Employers in finance value accuracy, integrity and the ability to explain numbers clearly to people who are not accountants.',
        looksFor: ['Accuracy and attention to detail', 'Integrity, ethics and respect for procedure', 'Knowledge of accounting principles, tax and regulations', 'The ability to meet deadlines and communicate findings'],
        topics: ['Reconciliations and financial reporting', 'Budgets and variance analysis', 'Tax and compliance, such as GRA, VAT and SSNIT', 'Internal controls and fraud prevention', 'Customer relationships, credit and lending decisions'],
        tips: ['Quantify your work, for example “I reconciled twelve accounts every month” or “I reduced errors by 20%”.', 'Stress ethics and procedure. Never suggest bending the rules, even under pressure.', 'Mention accounting software and Excel functions only if you have really used them.', 'Practise explaining a financial idea in plain language.'],
        sample: {
          q: 'Tell me about a time you found an error in financial records.',
          a: 'While reconciling a supplier account at my internship, I noticed that one invoice had been recorded twice (Situation). I needed to correct it without disrupting the month-end report (Task). I traced the entries to the source documents, confirmed the duplicate with my supervisor, posted a correcting entry and added a check to our monthly review list (Action). The accounts balanced before the deadline, and the new check helped us catch two more errors the next month (Result).'
        }
      },
      theory: [
        th('Asked about accuracy in financial work, which answer is strongest?',
          ['“I am just very careful.”', '“I double-check figures, reconcile them to source records, use review steps, and I can give an example of an error I caught.”', '“Accuracy is the auditor’s job, not mine.”', '“I rely on the software to catch everything.”'], 1,
          'Concrete checks plus a real example show that accuracy is part of your working method, not just a claim.'),
        th('In a scenario question, a colleague asks you to approve an urgent payment without the proper documents. What is the best answer?',
          ['Approve it, because urgency comes first.', 'Ignore the request and say nothing.', 'Explain that you would follow procedure and internal controls, ask politely for the documents or escalate to a supervisor, and look for a quick compliant solution.', 'Approve it but tell nobody.'], 2,
          'Finance employers expect you to protect controls and integrity, while still being helpful about speed.'),
        th('What is the best way to explain a budget variance to a manager who is not a finance specialist?',
          ['Use technical terms to show your knowledge.', 'Describe what changed, why it changed, what impact it has and what you recommend, in plain words.', 'Send the spreadsheet without comment.', 'Tell them it is too complicated to explain.'], 1,
          'Clear communication of the cause, impact and action is one of the most valued skills in finance.')
      ],
      questions: [
        q('How do you make sure your figures are accurate when you prepare financial reports?', 'tech'),
        q('Explain the difference between a balance sheet and an income statement in simple words.', 'tech'),
        q('Walk me through how you would carry out a bank reconciliation.', 'tech'),
        q('Tell me about a time you found an error or discrepancy in financial records. What did you do?', 'beh'),
        q('How do you stay up to date with changes in tax rules and financial regulations?', 'tech'),
        q('Why are internal controls important, and can you give an example of one?', 'tech'),
        q('How would you explain a budget variance to a manager who does not come from a finance background?', 'tech'),
        q('Describe how you handle month-end or year-end deadlines when the workload is heavy.', 'beh'),
        q('A colleague asks you to approve a payment without the proper documents because it is urgent. What do you do?', 'tech'),
        q('Which accounting software and spreadsheet functions are you comfortable with?', 'tech'),
        q('How would you deal with a customer who is unhappy about a charge or a loan decision?', 'tech'),
        q('What would you do if you suspected fraud or money laundering in a transaction?', 'tech'),
        q('Tell me about a time you had to work with numbers under pressure.', 'beh'),
        q('How do you keep client and company financial information confidential?', 'tech')
      ]
    },

    /* ---------------------------------------------------------------- it */
    {
      id: 'it',
      name: 'Information Technology',
      blurb: 'Software, networks, support, data and cybersecurity roles.',
      vocab: ['software', 'hardware', 'network', 'networking', 'database', 'sql', 'security', 'cybersecurity', 'troubleshooting', 'debugging', 'code', 'programming', 'javascript', 'python', 'java', 'html', 'css', 'api', 'cloud', 'server', 'backup', 'testing', 'deployment', 'git', 'version control', 'agile', 'scrum', 'requirements', 'user', 'support', 'ticket', 'helpdesk', 'windows', 'linux', 'algorithm', 'documentation', 'performance', 'encryption', 'password', 'firewall', 'incident'],
      guide: {
        intro: 'IT employers look for problem solvers who can explain technical ideas clearly, work well in a team and keep learning as technology changes.',
        looksFor: ['Technical knowledge relevant to the role', 'A structured way of troubleshooting', 'Clear communication with non-technical people', 'Security awareness and a habit of continuous learning'],
        topics: ['Projects and your portfolio', 'Troubleshooting and fixing faults', 'Security basics and good practice', 'Teamwork, version control and agile methods', 'Supporting users and handling incidents'],
        tips: ['Describe your own contribution to each project, not only what the team did.', 'Walk through your steps when you describe a fix: what you checked, in what order and why.', 'Be honest about what you do not know, and explain how you would learn it.', 'Give measurable results, such as faster load time, fewer errors or less downtime.'],
        sample: {
          q: 'Tell me about a time you fixed a difficult fault.',
          a: 'At my university computer lab, several machines kept losing their network connection just before exams (Situation). I was asked to find the cause quickly (Task). I checked cables and switches first, then compared settings between working and failing machines, and found a wrong IP configuration pushed by an old script. I corrected it, tested every machine and documented the fix (Action). The lab was stable before exams, and my notes helped the next team solve a similar issue in minutes (Result).'
        }
      },
      theory: [
        th('You are asked to explain a technical concept to a non-technical manager. What is the best approach?',
          ['Use as much technical language as possible to show expertise.', 'Use simple words and a comparison, avoid jargon and check that the person understands.', 'Say that it is too technical to explain.', 'Show them the code.'], 1,
          'Being able to translate technical ideas into plain language is a key skill that employers test.'),
        th('When asked “How do you troubleshoot a problem?”, which answer is best?',
          ['“I restart everything and hope it works.”', '“I define the problem, gather information, test one possible cause at a time, apply a fix, verify it and document it.”', '“I ask a colleague to fix it.”', '“I search for the answer and copy it.”'], 1,
          'A step-by-step method shows structured thinking and reliability, which matter more than a lucky guess.'),
        th('When describing a technical project in an interview, which detail adds the most value?',
          ['The complete list of technologies in the world.', 'Your own role, the tools you used and a measurable result.', 'How long the project took, without detail.', 'Only the name of the project.'], 1,
          'Employers want to know what you personally did and what difference it made.')
      ],
      questions: [
        q('Tell me about a technical project you are proud of. What was your role and what technologies did you use?', 'beh'),
        q('How do you approach troubleshooting a problem when you do not know the cause?', 'tech'),
        q('Explain a technical concept to me as if I were a manager with no IT background.', 'tech'),
        q('How do you keep your skills up to date in such a fast-changing field?', 'motive'),
        q('Describe how you would secure a system or an account against common threats.', 'tech'),
        q('Tell me about a time you found and fixed a difficult bug or fault.', 'beh'),
        q('What is version control, and how have you used tools like Git in a team?', 'tech'),
        q('A user is frustrated because their system is down. How do you handle the situation?', 'tech'),
        q('How do you test your work before delivering it?', 'tech'),
        q('How would you back up and recover important data for a small organisation?', 'tech'),
        q('Tell me about a time you had to meet a tight deadline on a technical task.', 'beh'),
        q('How do you document your work so that others can understand and maintain it?', 'tech'),
        q('What would you do if you noticed a security risk in a system but your manager seemed unconcerned?', 'tech'),
        q('Describe a time you had to learn a new tool or programming language quickly.', 'beh')
      ]
    },

    /* ------------------------------------------------------------ health */
    {
      id: 'health',
      name: 'Healthcare & Nursing',
      blurb: 'Nursing, midwifery, clinical support, pharmacy and community health.',
      vocab: ['patient', 'patients', 'care', 'nursing', 'clinical', 'ward', 'triage', 'diagnosis', 'treatment', 'medication', 'dosage', 'vital signs', 'infection control', 'hygiene', 'safety', 'confidentiality', 'consent', 'ethics', 'compassion', 'empathy', 'emergency', 'resuscitation', 'documentation', 'records', 'handover', 'teamwork', 'doctor', 'nurse', 'midwife', 'pharmacist', 'protocol', 'guidelines', 'nhis', 'hospital', 'clinic', 'community', 'health education', 'monitoring', 'escalate'],
      guide: {
        intro: 'Healthcare employers look for safe, caring and calm professionals who follow protocols, communicate with compassion and work well in teams.',
        looksFor: ['Patient safety and sound clinical judgement', 'Compassion and clear communication', 'Teamwork and accurate handover', 'Honesty, confidentiality and accountability'],
        topics: ['Prioritising patients and triage', 'Infection prevention and safety', 'Medication safety and errors', 'Emergencies and pressure', 'Communicating with patients and families'],
        tips: ['Put patient safety first in every answer.', 'Mention protocols and when you would escalate to a senior or doctor.', 'Show empathy through specific actions, such as explaining, listening and protecting dignity.', 'Be honest about mistakes and what you learned from them.'],
        sample: {
          q: 'Tell me about a time a patient’s condition got worse.',
          a: 'During a busy night shift on a medical ward, I noticed that a patient I was monitoring had a rising pulse and was becoming drowsy (Situation). My task was to act quickly and safely (Task). I rechecked the vital signs, informed the doctor on call immediately using our escalation steps, stayed with the patient and recorded everything clearly (Action). The patient received treatment in time and stabilised, and the doctor praised the early report (Result).'
        }
      },
      theory: [
        th('An interviewer asks how you would handle a medication error. Which answer do healthcare employers prefer?',
          ['Hide it so the patient does not worry.', 'Make sure the patient is safe first, report it immediately according to protocol, document honestly and learn from it.', 'Blame the colleague who prepared the medication.', 'Wait to see if anything happens.'], 1,
          'Patient safety, honest reporting and learning are the priorities. Concealment is dangerous and unprofessional.'),
        th('When describing how you care for an anxious patient, a strong answer shows…',
          ['That you avoid them to save time.', 'Empathy, clear explanations, active listening and respect for dignity and consent.', 'That you tell them not to worry.', 'That you leave the talking to the family.'], 1,
          'Compassion is shown through specific actions, not only through saying that you care.'),
        th('Asked how you prioritise several patients at once, the best answer refers to…',
          ['First come, first served only.', 'The relatives who complain the loudest.', 'Clinical need and urgency (triage), safety and asking for help or escalating when necessary.', 'Whichever patient is easiest to treat.'], 2,
          'Prioritising by clinical urgency and escalating when needed is the safe, professional approach.')
      ],
      questions: [
        q('Why did you choose a career in healthcare, and what keeps you motivated?', 'motive'),
        q('How do you prioritise patients when several need your attention at the same time?', 'tech'),
        q('Describe how you would handle a patient who is in pain, anxious or upset.', 'tech'),
        q('Tell me about a time you worked under pressure in an emergency or a very busy ward.', 'beh'),
        q('What steps do you take to prevent infection and keep patients and yourself safe?', 'tech'),
        q('How do you protect patient confidentiality and obtain consent?', 'tech'),
        q('Describe how you would give a proper handover to the next shift.', 'tech'),
        q('Tell me about a time you noticed that a patient’s condition was getting worse. What did you do?', 'beh'),
        q('What would you do if you realised you or a colleague had made a medication error?', 'tech'),
        q('How do you cope with the emotional side of caring for sick or dying patients?', 'beh'),
        q('How do you communicate with a patient’s family when the news is difficult?', 'tech'),
        q('A doctor gives an instruction that you think may not be safe. What do you do?', 'tech'),
        q('How do you stay up to date with clinical guidelines and best practice?', 'tech'),
        q('Tell me about a time you worked with a team of different professionals to care for a patient.', 'beh')
      ]
    },

    /* --------------------------------------------------------- education */
    {
      id: 'education',
      name: 'Education & Teaching',
      blurb: 'Teaching, tutoring, school administration and training roles.',
      vocab: ['students', 'pupils', 'learners', 'classroom', 'lesson', 'lesson plan', 'curriculum', 'syllabus', 'assessment', 'feedback', 'differentiation', 'learning outcomes', 'classroom management', 'discipline', 'engagement', 'motivation', 'parents', 'guardians', 'ges', 'continuous assessment', 'teaching and learning materials', 'scheme of work', 'inclusive', 'special needs', 'literacy', 'numeracy', 'group work', 'questioning', 'progress', 'attendance', 'mentor', 'child protection', 'safeguarding', 'technology', 'evaluation', 'objectives'],
      guide: {
        intro: 'Schools look for teachers who plan well, manage classrooms positively and care about the progress of every learner.',
        looksFor: ['Lesson planning and subject knowledge', 'Positive classroom management', 'The ability to support learners of different levels', 'Good communication with parents and colleagues, and awareness of child protection'],
        topics: ['Planning lessons: objectives, activities and assessment', 'Managing behaviour', 'Differentiation and inclusion', 'Assessment and feedback', 'Working with parents and colleagues'],
        tips: ['Describe a specific class and a measurable improvement in learning.', 'Mention learner-centred activities, such as group work and questioning.', 'Show that you are patient but firm and consistent.', 'Explain how you use simple, local materials when resources are limited.'],
        sample: {
          q: 'Tell me about a time you helped a struggling learner.',
          a: 'In my teaching practice, a Primary 5 pupil could not read the class text and avoided taking part (Situation). I wanted him to read at class level by the end of term (Task). I tested to find which sounds he found difficult, gave him short daily practice with picture cards, paired him with a supportive classmate and updated his parents weekly (Action). Within eight weeks he was reading short paragraphs aloud and began to volunteer answers (Result).'
        }
      },
      theory: [
        th('When asked how you manage a noisy class, which answer is strongest?',
          ['“I shout until they are silent.”', '“I set clear routines and expectations early, praise good behaviour, respond calmly and consistently, and keep learners engaged with purposeful tasks.”', '“I send noisy pupils out of the classroom.”', '“I ignore it and continue teaching.”'], 1,
          'Positive, consistent classroom management that prevents problems is preferred over punishment alone.'),
        th('Which approach best shows your lesson planning skills?',
          ['Describing only the topic you will teach.', 'Starting with learning objectives, then describing activities and assessment that match them.', 'Saying you do not need to plan because you know the subject.', 'Describing the textbook you will read from.'], 1,
          'Good planning links objectives, activities and assessment, so learners and teachers know what success looks like.'),
        th('Asked about a learner who is struggling, the best answer includes…',
          ['Telling the parents the child is not able.', 'Finding the gap, giving targeted support, checking progress and involving parents when appropriate.', 'Leaving the learner at the back of the class.', 'Giving them the answers.'], 1,
          'Employers value teachers who diagnose a problem, support the learner and follow progress.')
      ],
      questions: [
        q('Why do you want to be a teacher, and what is your teaching philosophy?', 'motive'),
        q('Walk me through how you would plan a lesson from objectives to assessment.', 'tech'),
        q('How do you manage a noisy or disruptive class?', 'tech'),
        q('How do you support learners who are struggling and challenge those who are advanced in the same class?', 'tech'),
        q('Tell me about a time a lesson did not go as planned. What did you change?', 'beh'),
        q('How do you assess whether your students have understood what you taught?', 'tech'),
        q('How would you handle a parent who is unhappy about their child’s progress or discipline?', 'tech'),
        q('What strategies do you use to keep learners motivated and engaged?', 'tech'),
        q('How do you make sure every child feels included, including those with special needs?', 'tech'),
        q('Tell me about a time you helped a student improve noticeably.', 'beh'),
        q('How do you use teaching and learning materials or technology when resources are limited?', 'tech'),
        q('What would you do if you suspected a child was being harmed or neglected?', 'tech'),
        q('How do you work with other teachers and school leaders to improve learning?', 'beh'),
        q('How do you manage your marking and administrative duties without losing time for lesson preparation?', 'tech')
      ]
    },

    /* ------------------------------------------------------------- sales */
    {
      id: 'sales',
      name: 'Sales, Marketing & Customer Service',
      blurb: 'Sales, marketing, customer support, call centres and business development.',
      vocab: ['customer', 'customers', 'client', 'clients', 'sales', 'target', 'targets', 'revenue', 'pipeline', 'lead', 'leads', 'prospect', 'conversion', 'closing', 'negotiation', 'objection', 'upsell', 'cross-sell', 'retention', 'loyalty', 'satisfaction', 'feedback', 'complaint', 'resolution', 'crm', 'campaign', 'brand', 'market', 'marketing', 'social media', 'content', 'analytics', 'kpi', 'promotion', 'product knowledge', 'relationship', 'follow up', 'listening', 'needs'],
      guide: {
        intro: 'Employers want persuasive but honest people who listen to customers, handle objections well and deliver results.',
        looksFor: ['Results and achievement of targets', 'Listening and understanding customer needs', 'Resilience when customers say no', 'Product knowledge, honesty and consistent follow-up'],
        topics: ['Finding and approaching new customers', 'Handling objections, especially price', 'Handling complaints and angry customers', 'Campaigns, social media and measuring results', 'Building relationships and loyalty'],
        tips: ['Quantify your results, for example “I grew sales by 20%” or “I won fifteen new clients a month”.', 'Show that you listen first and sell second.', 'Be honest about a lost sale and what you learned from it.', 'Mention how you track leads and follow-ups, such as a CRM or notebook.'],
        sample: {
          q: 'Tell me about a time you exceeded a target.',
          a: 'As a sales assistant at a phone shop, my monthly target was 40 accessory sales, but the shop was quiet (Situation). I wanted to exceed it (Task). I began asking each phone buyer what they needed, recommended matching accessories, followed up with past customers on WhatsApp and tracked my leads in a notebook (Action). I sold 58 accessories that month, 45% above target, and the shop adopted my follow-up routine (Result).'
        }
      },
      theory: [
        th('A customer says your price is too high. Which response is best in an interview answer?',
          ['Immediately offer the biggest discount.', 'Listen, understand the customer’s needs, explain the value and offer options before discussing price changes.', 'Tell the customer to go elsewhere.', 'Argue that the price is fair.'], 1,
          'Strong salespeople sell value and understand needs first, instead of giving away margin.'),
        th('When describing a sales target you achieved, you should include…',
          ['Only that you worked very hard.', 'The specific target, the actions you took and the measurable result.', 'A complaint about a difficult customer.', 'The names of other salespeople who failed.'], 1,
          'Specific targets, actions and results are what make a sales achievement credible.'),
        th('What is the best first step when dealing with an angry customer?',
          ['Explain the company’s policy.', 'Listen calmly and acknowledge their feelings before solving the problem.', 'Transfer them to someone else immediately.', 'Defend yourself.'], 1,
          'People calm down when they feel heard. Listening first makes the rest of the solution easier.')
      ],
      questions: [
        q('Tell me about a time you met or exceeded a sales or performance target. How did you do it?', 'beh'),
        q('How do you find and approach new customers?', 'tech'),
        q('Walk me through how you would handle a customer who says your price is too high.', 'tech'),
        q('How do you deal with a very angry or dissatisfied customer?', 'tech'),
        q('How do you learn a product or service well enough to explain its value?', 'tech'),
        q('Tell me about a time you lost a sale or a customer. What did you learn?', 'beh'),
        q('How do you plan and measure the success of a marketing campaign?', 'tech'),
        q('How do you build a long-term relationship with customers so that they come back?', 'tech'),
        q('How do you handle rejection when many customers say no?', 'beh'),
        q('What would you do if a customer asked for something your company cannot provide?', 'tech'),
        q('Describe how you use social media or other channels to reach customers.', 'tech'),
        q('How do you track your leads and follow-ups so that none are forgotten?', 'tech'),
        q('Tell me about a time you went the extra mile for a customer.', 'beh'),
        q('What would you do if a colleague was making promises to customers that the company cannot keep?', 'tech')
      ]
    },

    /* ------------------------------------------------------- engineering */
    {
      id: 'engineering',
      name: 'Engineering & Construction',
      blurb: 'Civil, electrical, mechanical, site and project engineering roles.',
      vocab: ['engineering', 'design', 'drawings', 'specifications', 'site', 'project', 'project management', 'schedule', 'budget', 'safety', 'health and safety', 'ppe', 'risk assessment', 'quality', 'standards', 'inspection', 'materials', 'equipment', 'maintenance', 'testing', 'calculations', 'autocad', 'contractor', 'supervisor', 'subcontractor', 'client', 'compliance', 'regulations', 'environmental', 'structural', 'electrical', 'mechanical', 'civil', 'commissioning', 'troubleshooting', 'documentation', 'reports', 'cost'],
      guide: {
        intro: 'Engineering employers look for safe, methodical problem solvers who respect standards, budgets and deadlines and work well with crews and clients.',
        looksFor: ['A strong safety mindset', 'Technical competence and sound judgement', 'Planning, cost and time awareness', 'Teamwork and communication with clients and crews'],
        topics: ['Safety and risk assessment', 'Drawings, specifications and standards', 'Quality control and inspection', 'Delays, costs and project pressure', 'Equipment failures and troubleshooting'],
        tips: ['Mention safety first in your answers.', 'Describe your role precisely: design, supervision, inspection or coordination.', 'Use measurable results such as days saved or costs avoided.', 'Explain the trade-offs behind your decisions.'],
        sample: {
          q: 'Tell me about a technical problem you solved.',
          a: 'During construction of a small classroom block, we found that the concrete on site was producing weak test cubes (Situation). As assistant site engineer, I was responsible for quality (Task). I checked the mix ratios and water content, found that water was added by eye, introduced measuring buckets, briefed the crew and increased the cube sampling (Action). The next tests met the required strength, and we avoided demolition costs and delays (Result).'
        }
      },
      theory: [
        th('When asked about site safety, the best answer includes…',
          ['“Safety is the safety officer’s job.”', 'Risk assessment, protective equipment, briefings, enforcing rules, reporting incidents and a real example.', 'Telling workers to be careful.', 'Doing the job quickly so there is less danger.'], 1,
          'Employers want to see a systematic approach to safety, supported by experience.'),
        th('When a project is behind schedule, which answer is strongest?',
          ['Add more workers without analysis.', 'Find the cause, re-plan, prioritise critical tasks, communicate early with the client and manage the cost impact.', 'Reduce quality to save time.', 'Wait and hope that the weather improves.'], 1,
          'Structured analysis and early communication are hallmarks of good project management.'),
        th('How should you explain a technical issue to a client who is not an engineer?',
          ['Use technical drawings and terminology.', 'Use plain language, focus on the impact and the options, and avoid jargon.', 'Tell them it is not their concern.', 'Send a long technical report.'], 1,
          'Clients need to understand the effect on cost, time and safety so they can make decisions.')
      ],
      questions: [
        q('Tell me about an engineering or construction project you worked on and your part in it.', 'beh'),
        q('How do you make sure safety rules are followed on site or in the workshop?', 'tech'),
        q('Describe how you would carry out a risk assessment before starting a job.', 'tech'),
        q('Tell me about a time you solved a difficult technical problem.', 'beh'),
        q('How do you read and check technical drawings and specifications?', 'tech'),
        q('What would you do if a project was falling behind schedule and going over budget?', 'tech'),
        q('How do you ensure the quality of the work done by your team or subcontractors?', 'tech'),
        q('A worker refuses to wear protective equipment because it is uncomfortable. What do you do?', 'tech'),
        q('Tell me about a time you worked as part of a multidisciplinary team.', 'beh'),
        q('How do you keep up with standards, regulations and new technology in your area?', 'tech'),
        q('How do you explain a technical issue to a client who is not an engineer?', 'tech'),
        q('Describe how you would handle an equipment failure in the middle of a critical job.', 'tech'),
        q('What software or tools do you use for design, calculation or project planning?', 'tech'),
        q('Tell me about a time you had to make a decision with incomplete information.', 'beh')
      ]
    },

    /* ------------------------------------------------------- hospitality */
    {
      id: 'hospitality',
      name: 'Hospitality, Tourism & Retail',
      blurb: 'Hotels, restaurants, tourism, events, shops and supermarkets.',
      vocab: ['guest', 'guests', 'customer', 'service', 'hospitality', 'hotel', 'restaurant', 'front desk', 'reservation', 'booking', 'housekeeping', 'food safety', 'hygiene', 'kitchen', 'menu', 'banquet', 'event', 'tourism', 'tour', 'till', 'cash handling', 'stock', 'inventory', 'merchandising', 'shift', 'teamwork', 'complaint', 'upselling', 'cleanliness', 'standards', 'presentation', 'check-in', 'checkout', 'pos', 'safety', 'courtesy', 'communication', 'peak'],
      guide: {
        intro: 'Hospitality and retail employers want friendly, reliable team players who treat every guest with respect and stay calm when it gets busy.',
        looksFor: ['Warm, genuine customer care', 'Calm under pressure', 'Teamwork and reliability on shifts', 'Hygiene, honesty with cash and stock, and attention to standards'],
        topics: ['Handling complaints', 'Busy periods and staffing pressure', 'Food safety and hygiene', 'Recommending extra products or services', 'Cash, stock and cleanliness'],
        tips: ['Tell guest stories with a clear outcome.', 'Show that you listen first and apologise sincerely.', 'Be honest about shift patterns, weekends and public holidays.', 'Mention standards, such as hygiene and presentation, and teamwork.'],
        sample: {
          q: 'Tell me about a time you turned an unhappy guest into a happy one.',
          a: 'At a hotel restaurant, a guest complained that his meal arrived cold on his anniversary (Situation). I wanted to put it right quickly (Task). I apologised sincerely, listened to what he wanted, asked the kitchen to prepare a fresh dish as a priority, and added a small dessert from the manager with a note (Action). He thanked us, left a very positive review and returned the following month (Result).'
        }
      },
      theory: [
        th('A guest is upset about a long delay. What is the best first step?',
          ['Explain that the delay is not your fault.', 'Listen, apologise sincerely and then offer a solution or alternative.', 'Ask the guest to be patient.', 'Walk away to find a manager.'], 1,
          'Listening and apologising calms the situation and shows respect, before you solve the problem.'),
        th('When asked about handling busy periods, a good answer shows…',
          ['That you would panic and ask others for help.', 'That you stay calm, prioritise, work with the team and keep communicating with guests while they wait.', 'That you avoid busy shifts.', 'That busy periods are the manager’s problem.'], 1,
          'Employers need people who stay composed and keep service standards high under pressure.'),
        th('A strong answer about food safety should mention…',
          ['Only that the kitchen should look clean.', 'Hand hygiene, correct storage and temperatures, avoiding cross-contamination, cleaning and following procedures.', 'That customers rarely notice.', 'That it is the cook’s responsibility alone.'], 1,
          'Specific hygiene practices prove that you take safety seriously.')
      ],
      questions: [
        q('What does excellent guest or customer service mean to you?', 'motive'),
        q('Tell me about a time you turned an unhappy guest or customer into a satisfied one.', 'beh'),
        q('How do you stay calm and polite during very busy periods?', 'tech'),
        q('How would you handle two guests or customers complaining at the same time while you are short staffed?', 'tech'),
        q('How do you make sure food safety and hygiene standards are followed?', 'tech'),
        q('Describe how you handle cash, payments and stock accurately.', 'tech'),
        q('What would you do if a guest asked for something that is against the rules?', 'tech'),
        q('Tell me about a time you worked in a team to deliver a successful event or busy shift.', 'beh'),
        q('How do you handle working weekends, nights and public holidays?', 'motive'),
        q('How would you recommend or sell extra services or products without being pushy?', 'tech'),
        q('What would you do if you saw a colleague being rude to a guest?', 'tech'),
        q('How do you keep your work area clean, organised and ready for the next shift?', 'tech'),
        q('Tell me about a time you had to communicate with someone who spoke a different language or came from a different culture.', 'beh'),
        q('How would you handle a guest who lost an important item while staying with us?', 'tech')
      ]
    },

    /* ----------------------------------------------------------- general */
    {
      id: 'general',
      name: 'General / Other field',
      blurb: 'Any other field. You will get broad, work-readiness questions.',
      vocab: ['teamwork', 'communication', 'responsibility', 'reliable', 'punctual', 'deadline', 'organised', 'organized', 'planning', 'problem solving', 'initiative', 'adaptable', 'customer', 'quality', 'accuracy', 'leadership', 'learning', 'goals', 'results', 'professional', 'integrity', 'honesty', 'collaboration', 'efficient', 'productivity', 'improve', 'feedback', 'training', 'supervisor', 'colleagues', 'workplace', 'policy', 'safety', 'creative'],
      guide: {
        intro: 'Whatever the field, employers want reliable, honest people who communicate well, work in a team and keep learning.',
        looksFor: ['Reliability and initiative', 'Communication and teamwork', 'Problem solving and adaptability', 'Honesty, a positive attitude and willingness to learn'],
        topics: ['Teamwork and communication', 'Solving problems', 'Managing time and priorities', 'Receiving feedback and learning', 'Your goals and motivation'],
        tips: ['Prepare six to eight STAR stories you can adapt to many questions.', 'Use school, volunteering, church, community or family-business experience if you have little formal work experience.', 'End each story with the result and what you learned.', 'Stay positive, specific and honest.'],
        sample: {
          q: 'Tell me about a time you took the initiative.',
          a: 'In my final-year project group, we had no clear plan and the deadline was approaching (Situation). Nobody had taken charge (Task). I suggested a simple schedule, split the work according to everyone’s strengths and arranged short check-ins twice a week (Action). We submitted a day early and earned the highest mark in the class, and my supervisor praised our organisation (Result).'
        }
      },
      theory: [
        th('Asked about taking the initiative, which answer is strongest?',
          ['“I always do what I am told.”', 'A specific situation where you noticed a need, acted without being asked and achieved a result.', '“I take the initiative all the time.”', '“I wait for instructions to avoid mistakes.”'], 1,
          'A specific story with action and result proves initiative far better than a general claim.'),
        th('You are asked about a task you have never done before. What is the best response?',
          ['Pretend you have done it.', 'Be honest, explain how you would learn quickly and seek guidance, and mention similar experience.', 'Say that you would refuse to do it.', 'Say that you can do anything.'], 1,
          'Honesty combined with a clear plan to learn is what employers want to hear.'),
        th('Which answer best shows adaptability?',
          ['“I do not like change.”', 'An example of adjusting to a big change and what you did to make it work, with the outcome.', '“I am flexible.”', '“Change never affects me.”'], 1,
          'A real example with actions and an outcome makes adaptability believable.')
      ],
      questions: [
        q('What kind of work environment helps you do your best work?', 'motive'),
        q('Tell me about a time you took the initiative without being asked.', 'beh'),
        q('How do you make sure the quality of your work is consistently high?', 'tech'),
        q('Tell me about a time you worked with someone whose style was very different from yours.', 'beh'),
        q('What would you do if you were given a task you had never done before and nobody was available to help?', 'tech'),
        q('How do you manage your time and avoid procrastination?', 'tech'),
        q('Tell me about a time you had to adapt to a big change at work, at school or in your community.', 'beh'),
        q('What would you do if you disagreed with a decision made by your supervisor?', 'tech'),
        q('How do you set and track your personal and professional goals?', 'tech'),
        q('Describe a time you helped a colleague or classmate who was struggling.', 'beh'),
        q('What would you do if you noticed that a deadline was going to be missed?', 'tech'),
        q('Which skills do you think are most important for success in any job, and how have you developed them?', 'motive'),
        q('Tell me about a time you used creativity to solve a problem.', 'beh'),
        q('How do you handle working with limited resources or tight budgets?', 'tech')
      ]
    }
  ];

  /* ====================================================== GENERAL QUESTIONS */
  var GENERAL = {
    opening: [
      { t: 'To begin, please tell me about yourself.', spoken: 'Good day, and welcome to this interview. Thank you for joining us. To begin, please tell me about yourself.', type: 'open' },
      { t: 'Could you start by giving me a short introduction of yourself and your background?', spoken: 'Hello, and thank you for coming in today. Could you start by giving me a short introduction of yourself and your background?', type: 'open' },
      { t: 'Please introduce yourself and tell me what brings you to this interview.', spoken: 'Good day, and welcome. Please introduce yourself and tell me what brings you to this interview.', type: 'open' }
    ],
    closing: [
      { t: 'We are nearly at the end. Do you have any questions for us?', spoken: 'We are nearly at the end of our time. Do you have any questions for us?', type: 'close' },
      { t: 'Before we finish, is there anything you would like to add or ask?', spoken: 'Before we finish, is there anything you would like to add or ask?', type: 'close' }
    ],
    ending: 'Thank you for your time today. That concludes the interview. Your results will now appear on the screen.',
    probes: [
      'Could you give me a specific example of that?',
      'What was the result of that?',
      'What exactly was your own role in that?',
      'Can you tell me a little more about how you did that?'
    ],
    acks: ['Thank you.', 'Okay, thank you.', 'Alright.', 'Noted, thank you.', 'Great, thank you.', 'I see. Thank you.'],
    questions: [
      q('Why do you want to work in this field?', 'motive'),
      q('Why are you interested in this role and our organisation?', 'motive'),
      q('What are your greatest strengths, and how have they helped you at work or at school?', 'beh'),
      q('What is a weakness you are working to improve, and what are you doing about it?', 'beh'),
      q('Tell me about a time you worked as part of a team to achieve a goal.', 'beh'),
      q('Describe a time you faced a difficult problem and how you solved it.', 'beh'),
      q('Tell me about a time you made a mistake. What did you do afterwards?', 'beh'),
      q('How do you handle pressure and tight deadlines?', 'tech'),
      q('Describe a time you had a disagreement with a colleague or classmate. How did you resolve it?', 'beh'),
      q('Tell me about a time you showed leadership, even without a formal title.', 'beh'),
      q('How do you prioritise your work when you have many tasks at once?', 'tech'),
      q('Describe a time you had to learn something new quickly.', 'beh'),
      q('What does professionalism mean to you at work?', 'tech'),
      q('How would your previous manager, lecturer or colleagues describe you?', 'beh'),
      q('Tell me about an achievement you are proud of.', 'beh'),
      q('How do you respond to criticism or feedback?', 'beh'),
      q('Why are you looking for a new opportunity at this stage of your career?', 'motive'),
      q('How do you stay motivated when your work becomes repetitive or difficult?', 'motive'),
      q('What would you do in your first thirty days if you joined us?', 'tech'),
      q('What are your salary expectations, and how did you arrive at that figure?', 'tech'),
      q('If you saw a colleague doing something dishonest at work, what would you do?', 'tech'),
      q('Where do you see yourself in five years?', 'motive')
    ]
  };

  /* ============================================================ THEORY TEST */
  var THEORY = [
    /* module 1 */
    th('From an employer’s point of view, what is the main purpose of an interview?',
      ['To check that your certificates are real and nothing else', 'To find out whether you can do the job, are motivated to do it and will fit the team', 'To see whether you can memorise facts about the organisation', 'To reduce the number of applicants quickly, whatever their ability'], 1,
      'Employers judge three things: can you do the job, will you do it well and will you fit in. Certificates and facts matter only as part of that bigger picture.'),
    th('In a panel interview with three interviewers, how should you respond to a question?',
      ['Look only at the person who seems the most senior', 'Answer mostly to the person who asked, while making eye contact with the others', 'Look at the table so you can concentrate', 'Ask them to take turns so that you can answer each one separately'], 1,
      'Directing your answer to the person who asked, and including the others with your eye contact, keeps everyone engaged.'),
    th('What is a behavioural interview question?',
      ['A question about your hobbies and personality type', 'A question asking for real past examples to show how you act at work', 'A hypothetical question about what you might do in future', 'A question about your religion and family'], 1,
      'Behavioural questions (“Tell me about a time when…”) rely on the idea that past behaviour predicts future behaviour.'),
    th('Which preparation is most important for a video or voice interview?',
      ['Wearing wedding clothes', 'Testing your internet, microphone and camera, and choosing a quiet, well-lit place', 'Having someone sit beside you to help', 'Opening other apps so you can look up answers'], 1,
      'Technical problems and noise can ruin a good interview, so test your set-up in advance.'),
    /* module 2 */
    th('What is the best first step when preparing for an interview?',
      ['Memorise answers from the internet', 'Study the job advert and match each requirement with an example from your experience', 'Write a long speech about your life', 'Ask a friend to attend with you'], 1,
      'The advert tells you what the employer wants, so your evidence should match it.'),
    th('Why should you research the organisation before the interview?',
      ['So you can criticise its weaknesses', 'So you can tailor your answers, ask informed questions and show genuine interest', 'So you can mention how much its staff earn', 'It is not necessary if you have a good CV'], 1,
      'Research shows interest and lets you connect your skills to what the organisation really does.'),
    th('When should you arrive for an in-person interview?',
      ['Exactly at the start time', 'About 10 to 15 minutes early', 'One hour early, to show enthusiasm', 'Whenever traffic allows; the interview will wait'], 1,
      'Arriving 10 to 15 minutes early lets you settle without being in the way. Much earlier may inconvenience staff, and being late creates a poor impression.'),
    th('Which of these should you take to an in-person interview?',
      ['Copies of your CV, certificates, ID, a notebook and a pen', 'Only your phone', 'Nothing, because the employer already has everything', 'Gifts for the interviewers'], 0,
      'Being organised with your documents and notes shows that you are prepared and professional.'),
    th('What is the most effective way to practise for an interview?',
      ['Reading answers silently', 'Answering questions out loud, timing yourself and asking for feedback', 'Practising only the easy questions', 'Memorising word for word'], 1,
      'Speaking is a skill that needs spoken practice. Timing and feedback help you improve.'),
    /* module 3 */
    th('How quickly do interviewers begin forming an impression of you?',
      ['After the first hour', 'Within the first few seconds to minutes', 'Only after reading your references', 'Only after you answer the first question'], 1,
      'First impressions form fast, so your arrival, greeting and appearance matter.'),
    th('Which body language helps you appear confident?',
      ['Sitting upright with steady eye contact and calm natural gestures', 'Crossing your arms and looking at the floor', 'Clicking a pen and checking your phone', 'Leaning back with your legs stretched out'], 0,
      'Open, steady body language communicates confidence and respect.'),
    th('What should you do instead of using filler words such as “um” and “you know”?',
      ['Speak faster so there are no gaps', 'Pause silently for a moment while you think', 'Repeat the question several times', 'Change the subject'], 1,
      'A short pause sounds thoughtful, while filler words can make you sound unsure.'),
    th('How should you dress for an interview?',
      ['Very casually so you look relaxed', 'Neat, clean and slightly more formal than the daily dress of the job', 'In the most expensive clothes you can find', 'In party clothes to stand out'], 1,
      'Neat, appropriate clothing shows respect and professionalism without distracting from you.'),
    /* module 4 */
    th('What does STAR stand for?',
      ['Skills, Talent, Ability, Reward', 'Situation, Task, Action, Result', 'Story, Topic, Answer, Review', 'Start, Think, Answer, Repeat'], 1,
      'STAR (Situation, Task, Action, Result) is the standard structure for behavioural answers.'),
    th('Roughly how long should most interview answers be?',
      ['About 5 seconds', 'About one to two minutes', 'Five minutes or more', 'As long as it takes to tell everything'], 1,
      'One to two minutes gives enough time for a clear example without losing attention. (In this practice interview you have a maximum of one minute for each answer.)'),
    th('You do not know the answer to a question. What is the best response?',
      ['Invent an answer that sounds good', 'Be honest, and explain what you do know and how you would find the answer', 'Say nothing and wait', 'Blame the interviewer for a difficult question'], 1,
      'Honesty combined with a plan to find the answer builds trust. Invented answers are easy to expose.'),
    th('What should you do right after hearing a difficult question?',
      ['Start talking immediately', 'Pause for a few seconds to think, or ask for clarification, then answer', 'Ask them to move to the next question', 'Laugh nervously'], 1,
      'A short pause or a clarifying question helps you give a clearer, better-structured answer.'),
    th('What should the “Result” part of a STAR answer include?',
      ['Complaints about the people involved', 'The outcome, ideally with a number, and what you learned', 'Your salary at the time', 'A new story'], 1,
      'Results, preferably measurable, show the value of your actions.'),
    th('The “Present–Past–Future” structure is most useful for which question?',
      ['Tell me about yourself', 'What is your weakness?', 'Why did you leave your last job?', 'What salary do you want?'], 0,
      'It gives a short, relevant professional introduction: who you are now, what prepared you and what you want next.'),
    /* module 5 */
    th('What is the best way to answer “What is your greatest weakness?”',
      ['Say that you have no weaknesses', 'Name a real weakness that is not essential for the job and explain how you are improving it', 'Describe your biggest flaw in detail', 'Say that you work too hard'], 1,
      'Interviewers want honesty and a willingness to improve.'),
    th('How should you answer “Why should we hire you?”',
      ['Say that you need the money', 'Match your skills and experience to what the employer needs and give evidence', 'Say that you are better than the other candidates', 'Say that you will do anything'], 1,
      'A confident answer links your strengths to the employer’s needs with proof.'),
    th('When asked about salary expectations, what is a good approach?',
      ['Refuse to discuss money at all', 'Research the market range, give a reasonable range and show flexibility based on the full package', 'Ask for the highest figure you can imagine', 'Say that salary is the only reason you applied'], 1,
      'Researched, reasonable and flexible answers show professionalism and realism.'),
    th('A good way to explain why you left your last job is to…',
      ['Describe how bad your manager was', 'Stay positive and honest, focusing on what you want to learn or achieve next', 'Say that it was a waste of time', 'Say that you do not remember'], 1,
      'Criticising a former employer worries interviewers. Focus on your goals.'),
    th('How should you handle a gap in your CV?',
      ['Hide it and hope nobody asks', 'Be honest and brief, explain what you did (study, caring, training, volunteering) and what you learned', 'Say it was not your fault and move on', 'Change the dates on your CV'], 1,
      'Honesty and a positive explanation work better than concealment, which can be discovered.'),
    /* module 6 */
    th('A situational question starts with “What would you do if…”. What is the best approach?',
      ['Say the first thing that comes to mind', 'Explain your steps logically: clarify the problem, consider options, act, communicate and follow up', 'Say that you would ask someone else to do it', 'Say that it would never happen'], 1,
      'A logical sequence of steps shows judgement and reliability.'),
    th('In a technical question you get stuck. What should you do?',
      ['Bluff confidently', 'Think aloud, explain your reasoning and be honest about what you do not know', 'Stay silent until the interviewer helps', 'Say that the question is unfair'], 1,
      'Interviewers want to see how you think, and honesty about limits builds trust.'),
    /* module 7 */
    th('Your mind goes blank during an answer. What is the best response?',
      ['Walk out of the room', 'Take a breath, ask to have the question repeated or rephrased and start with something you do know', 'Apologise repeatedly', 'Make something up quickly'], 1,
      'A calm pause and request for clarification is normal and professional.'),
    th('Which technique helps you manage nervousness before an interview?',
      ['Drinking several cups of strong coffee', 'Slow breathing, thorough preparation and arriving early', 'Avoiding practice so you stay fresh', 'Skipping breakfast'], 1,
      'Preparation and slow breathing reduce nervousness, while caffeine and hunger can make it worse.'),
    th('An interviewer asks a very personal question unrelated to the job, such as your plans about marriage. What is a good response?',
      ['Argue with the interviewer', 'Politely steer the answer back to your ability and commitment to do the job', 'Leave immediately without explanation', 'Answer rudely'], 1,
      'Staying polite and returning to your ability to do the job protects your professionalism.'),
    th('The interviewer is silent after your answer. What should you do?',
      ['Keep talking until they stop you', 'Wait calmly for a moment; if needed add a short example or ask if they would like more detail', 'Apologise for your answer', 'Ask why they are silent'], 1,
      'Silence is often a pause for note-taking. Rambling usually weakens your answer.'),
    /* module 8 */
    th('Why should you ask questions at the end of the interview?',
      ['It is a rule that you must ask exactly three', 'It shows interest and helps you decide whether the job suits you', 'It makes the interview longer', 'To test the interviewer'], 1,
      'Good questions show engagement and let you check whether the job is right for you.'),
    th('Which is a poor question to ask in a first interview?',
      ['What would success look like in the first six months?', 'What training will be offered?', 'How soon can I take leave, and how many days will I get?', 'What are the next steps in the process?'], 2,
      'Asking first about leave suggests that your priorities are not the work itself.'),
    th('When should you send a thank-you message after an interview?',
      ['After a month', 'Within about 24 hours', 'Never, because it is annoying', 'Only if you got the job'], 1,
      'A prompt, short thank-you message is polite and keeps you in the interviewer’s mind.'),
    th('The employer said they would reply within one week, but two weeks have passed. What should you do?',
      ['Show up at their office unannounced', 'Send a polite follow-up message asking about the status', 'Assume that you got the job', 'Send a message every day'], 1,
      'One polite follow-up is professional. Repeated messages or unannounced visits are not.')
  ];

  root.IV_DATA = {
    fields: FIELDS,
    general: GENERAL,
    theory: THEORY,
    config: { theoryQuestions: 20, theoryFieldQuestions: 3, theoryPass: 60, theoryExcellent: 85 }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.IV_DATA;
})(typeof window !== 'undefined' ? window : globalThis);
