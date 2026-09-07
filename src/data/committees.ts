export interface Question {
  id: string
  label: string
  required: boolean
  wordLimit?: number
  type: 'text' | 'textarea' | 'url' | 'select' | 'multiselect'
  options?: string[]
}

export interface Committee {
  id: string
  label: string
  description: string
  questions: Question[]
}

export const committees: Committee[] = [
  {
    id: 'strategic-initiatives',
    label: 'Strategic Initiatives',
    description: 'The Strategic Initiatives Committee serves as the intermediary between student voices ' +
      'and actionable change, working directly with Haas Administration and the HBSA ' +
      'Executive Board to carry out complex, pivotal engagements. Given the critical nature ' +
      'of our work, we prioritize confidentiality and commitment above all else, and we ' +
      'welcome those who are eager to serve our community in unique and meaningful ways.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Strategic Initiatives team? Please limit ' +
          'your response to 50 words.',
        required: true,
        wordLimit: 50,
        type: 'textarea'
      },
      {
        id: 'commitment',
        label: 'One of our core values is commitment - please tell us your class schedule, ' +
          'organizations, and other relevant activities you have planned for the coming semester.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'proposal',
        label: 'SI Associates may have the opportunity to lead their own initiatives - please ' +
          'use this space to share any proposals you may have.',
        required: false,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'tech',
    label: 'Tech',
    description: 'The Tech Committee is the engine behind HBSA\'s digital presence, turning ideas into ' +
      'reality and chaos into clean systems. We make sure everything runs smoothly behind the ' +
      'scenes - whether that\'s streamlining events, enhancing communication, or leveling up ' +
      'how members connect with HBSA. This year, we\'re all about bold upgrades, creative ' +
      'problem-solving, and building tools that actually make people\'s lives easier. If it ' +
      'clicks, scrolls, or sends - we\'ve got it covered.',
    questions: [
      {
        id: 'excitement',
        label: 'What excites you most about working on the tech team, and what unique perspective ' +
          'or skillset would you bring to HBSA?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'improvement',
        label: 'If you could improve one part of HBSA\'s digital experience (website, ' +
          'communications, systems, etc.), what would it be and how would you approach it?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'transfer-development',
    label: 'Transfer Development',
    description: 'The Transfer Development Committee empowers both current and prospective transfer ' +
      'students by fostering community and building connections across the Haas ecosystem to ' +
      'strengthen the transfer experience. The committee consists of two teams: Outreach and ' +
      'Integration. Outreach works closely with the Haas Undergraduate Office to lead ' +
      'initiatives designed for community colleges, such as Envision Haas, case competitions, ' +
      'and application workshops. Integration builds community within Haas by organizing a ' +
      'mix of social and professional events to support transfer students in their ' +
      'transition. Transfer Development is dedicated to ensuring every transfer student feels ' +
      'supported and enabled at the Haas School of Business!',
    questions: [
      {
        id: 'community',
        label: 'What does the transfer community mean to you, and why did you choose Community ' +
          'College? (350 words)',
        required: true,
        wordLimit: 350,
        type: 'textarea'
      },
      {
        id: 'mentorship',
        label: 'Describe a past experience in Community College where you supported, mentored, or ' +
          'built community for others. (250 words)',
        required: true,
        wordLimit: 250,
        type: 'textarea'
      },
      {
        id: 'initiatives',
        label: 'What new ideas or initiatives would you like to bring to Transfer Development? ' +
          'This can be for Outreach or Integration (250 words)',
        required: true,
        wordLimit: 250,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'The Marketing Committee shapes HBSA\'s digital presence across Instagram, TikTok, ' +
      'YouTube, and LinkedIn, creating engaging, student-centered content that brings the ' +
      'Haas experience to life. From short-form videos and student stories to career ' +
      'resources, academic insights, and community highlights, we develop platform-specific ' +
      'content that informs, connects, and inspires the Haas community. This year, we\'re ' +
      'focused on making HBSA\'s content more relatable, dynamic, and reflective of the ' +
      'diverse experiences of Haas students.',
    questions: [
      {
        id: 'platform',
        label: 'HBSA Marketing spans four platforms: Instagram, TikTok, YouTube, and LinkedIn. ' +
          'Which platform do you see yourself contributing to the most? Tell us about any ' +
          'relevant experience you have and how you would improve HBSA\'s marketing presence. ' +
          '(200 words)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'workload',
        label: 'Marketing Committee members balance content deadlines with academic and ' +
          'extracurricular commitments. How do you stay organized and manage your time ' +
          'effectively? (100 words)',
        required: true,
        wordLimit: 100,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'What is one new idea, initiative, or content series you would like to introduce to ' +
          'HBSA Marketing this year? Please describe your idea and how it would engage the ' +
          'Haas community. (200 words)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      },
      {
        id: 'portfolio',
        label: 'Please link your marketing, social media, design, or other relevant creative ' +
          'portfolio below. Please ensure that anyone with the link can access it.',
        required: false,
        type: 'url'
      }
    ]
  },
  {
    id: 'dei',
    label: 'DEI',
    description: 'The HBSA DEI Committee champions equity, inclusion, and belonging at Haas. We ' +
      'spearhead impactful initiatives like the Humans of Haas series to elevate student ' +
      'voices and drive meaningful change. Our annual flagship event, the Haas Multicultural ' +
      'Festival, brings the entire community together in a vibrant celebration of global ' +
      'cultures, heritage, and unity. Through intentional programming and advocacy, we strive ' +
      'to build a Haas where every student feels seen, valued, and empowered.',
    questions: [
      {
        id: 'meaning',
        label: 'What does diversity, equity, and inclusion mean to you, and why do you want to be ' +
          'part of the HBSA DEI Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'inclusive-space',
        label: 'Tell us about a time you helped create a more inclusive, supportive, or welcoming ' +
          'space.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'contribution',
        label: 'How do you hope to contribute to the HBSA community through the DEI Committee, and ' +
          'what do you hope to grow or learn from this experience?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'entrepreneurship',
    label: 'Entrepreneurship',
    description: 'The Entrepreneurship Committee aims to spread entrepreneurship to the entirety of UC ' +
      'Berkeley and provide students with an entrepreneurial mindset that will create ' +
      'positive change in the world. This is done through a multitude of events such as ' +
      'competitions, workshops, and speaker panels. Associates work to source ' +
      'speakers/mentors/judges, build connections within the UC Berkeley community (colleges, ' +
      'student organizations, SkyDeck, etc.), and plan and execute events. This spring, we ' +
      'hope to host our signature HBSA Shark Tank Pitch Competition, potentially integrated ' +
      'with a hackathon to foster hands-on innovation and collaboration.',
    questions: [
      {
        id: 'mindset',
        label: 'How have you demonstrated an entrepreneurial mindset?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'What is one event/initiative you would like to see our committee organize?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'contribution',
        label: 'What skills/experiences would you bring to the committee, and how would you ' +
          'contribute?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    description: 'The Sustainability Committee is dedicated to promoting environmental action and ' +
      'awareness at Haas. We lead impactful initiatives like Earth Week, Zero Waste Audits, ' +
      'and Thrift Cycle events, while amplifying student voices through our Sustainability ' +
      'Sunday spotlight series. We aim to make eco-conscious choices more visible, ' +
      'accessible, and empowering. Our mission is to cultivate a community that leads with ' +
      'environmental responsibility and creates a lasting impact. Join us in building a more ' +
      'sustainable Haas!',
    questions: [
      {
        id: 'interest',
        label: 'What draws you to sustainability, and what is one sustainability issue you would ' +
          'be excited to learn more about or contribute to through HBSA? (150 words max)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Tell us about a time you took initiative to improve something, solve a problem, or ' +
          'make an impact in a team, organization, workplace, or community. What did you do, ' +
          'and what was the outcome? (200 words max)',
        required: true,
        wordLimit: 200,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'corporate-relations',
    label: 'Corporate Relations',
    description: 'The Corporate Relations Committee creates impactful, experiential opportunities that ' +
      'connect students with professionals across industries. We operate in two tracks: ' +
      'recruiting and career exploratory. At large, we plan events like office visits, case ' +
      'competitions, and Mock Superday to help students explore career paths, build resumes, ' +
      'and strengthen the undergraduate Haas brand. Our goal for the year is innovation, in ' +
      'the form of building public tools like opportunity pipelines, recruitment trackers, ' +
      'and improved Haas recognition across job portals, to deepen industry connections and ' +
      'empower students to pursue careers aligned with their values and desired impact.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Corporate Relations committee? What would we ' +
          'be able to do for you in return?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'experience',
        label: 'What experiences do you bring, and how do you see yourself contributing to the ' +
          'team?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'What is an event or internal project that you would like to implement? With the ' +
          'committee description and subcommittees in mind, describe the idea.',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'The HBSA Integration Committee is dedicated to building a welcoming, collaborative ' +
      'community that unites all Haas students, connecting students from MET, GMP, Spieker, ' +
      'LSBE, athletics, and the broader Haas population, creating an inclusive environment ' +
      'where everyone feels supported. Through programs such as the Cross-Program Partners, ' +
      'social mixers, and campus traditions, we aim to bridge the various Haas programs ' +
      'together and create a strong sense of shared identity within the Haas community.',
    questions: [
      {
        id: 'turnout',
        label: 'One challenge we face is low turnout at integration events. How would you increase ' +
          'participation among students in specialized programs (GMP, MET, LSBE, ' +
          'student-athletes)? Be specific about outreach, incentives, and event design.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Propose one event or initiative that would help students from different Haas ' +
          'programs genuinely connect. What would the event look like, and how would you make ' +
          'sure students interact beyond just showing up?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'sponsorships',
    label: 'Sponsorships',
    description: 'The Sponsorships Committee builds and maintains HBSA\'s relationships with corporate ' +
      'partners and donors. We work directly with firms across consulting, finance, ' +
      'accounting, and technology to secure funding and resources that support professional ' +
      'development events, recruiting opportunities, and community initiatives. Our goal is ' +
      'to create long-term partnerships that deliver real value to both students and ' +
      'sponsors, while expanding access to career opportunities for underrepresented students ' +
      'at Haas.',
    questions: [
      {
        id: 'skills',
        label: 'What skills or past experiences would make you a strong Associate on the ' +
          'Sponsorships Committee? (150 words max)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'What is one new idea or initiative you would be excited to bring to the ' +
          'Sponsorships Committee this year? (150 words max)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'fit',
        label: 'What companies or brands do you think would be a strong fit as sponsors for HBSA, ' +
          'and why? (150 words max)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      },
      {
        id: 'outreach',
        label: 'Cold outreach often involves receiving no response or being rejected. How would ' +
          'you approach following up with a potential sponsor who hasn\'t responded? (150 ' +
          'words max)',
        required: true,
        wordLimit: 150,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'student-affairs',
    label: 'Student Affairs',
    description: 'The Student Affairs Committee works to make Haas a more vibrant, connected, and ' +
      'supportive community. We create mentorship programs, social traditions, career events, ' +
      'recruiting resources, and community experiences that help students build friendships, ' +
      'find guidance, access opportunities, and feel supported throughout their time at Haas. ' +
      'We also empower students to bring their own ideas to life, fostering a culture of ' +
      'kindness, integrity, and genuine care for one another.',
    questions: [
      {
        id: 'build-fix',
        label: 'If you could build or fix one thing for people at Haas, what would that look like? ' +
          'And even just roughly, how would you get it done and find the time for it?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'motivation',
        label: 'What makes you want to join Student Affairs? What unique vibe, perspective, or ' +
          'lived experience do you want to add to our community? (Feel free to just talk like ' +
          'you\'re sending a voice note to a friend, no need to filter or overthink!) 💗',
        required: true,
        type: 'textarea'
      },
      {
        id: 'subcommittee',
        label: 'Which subcommittee sounds more like your vibe: Student Life (planning socials and ' +
          'community events) or Student Development (mentorship and career stuff)?',
        required: true,
        options: ['Student Life', 'Student Development'],
        type: 'select'
      }
    ]
  },
  {
    id: 'public-service',
    label: 'Public Service',
    description: 'The HBSA Public Service Committee connects students with local organizations, alumni ' +
      'working in social impact, and opportunities to launch their own service-driven ' +
      'initiatives. We build partnerships, expand hands-on engagement opportunities, and ' +
      'create pathways for students to apply business skills to real community challenges. We ' +
      'empower students to create meaningful change while strengthening Haas\'s role as a ' +
      'force for impact in the Bay Area and beyond.',
    questions: [
      {
        id: 'meaning',
        label: 'What does public service or community impact mean to you, and why is it important ' +
          'for students?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'initiative',
        label: 'Tell me about a time when you took initiative on a project or event. What did you ' +
          'do, and what was the outcome?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'ideas',
        label: 'Since this committee is new and growing, what ideas or events would you like to ' +
          'help create or lead?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'soac',
    label: 'Student Organizations Advisory Council (SOAC)',
    description: 'The Student Organizations Committee serves as the liaison between the Haas ' +
      'Undergraduate Office, the 16 Haas Student Organizations (HSOs) and the greater student ' +
      'body. We focus on strengthening communication, alignment, and support across the Haas ' +
      'community. This year, we are continuing to build and expand the HSO Fellowship ' +
      'Program, an initiative launched in the fall, while planning additional initiatives and ' +
      'leading the recruitment cycle of HSOs for the upcoming academic year.',
    questions: [
      {
        id: 'prioritization',
        label: 'You are given three SOAC tasks at once: one is urgent but low-impact, one is ' +
          'important but has no immediate deadline, and one involves another student ' +
          'organization that has stopped responding. Walk through exactly how you would ' +
          'prioritize and handle all three.',
        required: true,
        type: 'textarea'
      },
      {
        id: 'relationship',
        label: 'A student organization you are responsible for has missed multiple deadlines and ' +
          'is becoming difficult to reach, but you still need to maintain a strong working ' +
          'relationship with them. What would you do next, and at what point would you ' +
          'escalate the situation?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'process',
        label: 'You notice that a SOAC process is inefficient or creating unnecessary work for ' +
          'both the committee and student organizations, but no one has asked you to fix it. ' +
          'How would you approach the problem from identifying the issue through implementing ' +
          'a solution?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'mba-alumni-relations',
    label: 'MBA & Alumni Relations',
    description: 'MBA & Alumni Relations fosters an interconnected & supportive campus environment. We ' +
      'enable students to fully leverage the Haas network through our MBA and Alumni ' +
      'communities.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in the MBA & Alumni Committee?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'event',
        label: 'Suppose you were given free reign of the MBA & Alumni Committee, what sort of ' +
          'event would you hold, and how would you work to host it?',
        required: true,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'professional-development',
    label: 'Professional Development',
    description: 'The Professional Development Committee empowers members to grow their skills, build ' +
      'meaningful connections, and navigate career opportunities with confidence. We host ' +
      'workshops, coffee chats, panels, and speaker events that bring students face-to-face ' +
      'with industry leaders and alumni. From resume reviews to networking nights, our goal ' +
      'is to create high-impact experiences that help members sharpen their professional ' +
      'toolkit and unlock new possibilities.',
    questions: [
      {
        id: 'interest',
        label: 'Why are you interested in joining the Professional Development committee? (50 ' +
          'words or less)',
        required: true,
        wordLimit: 50,
        type: 'textarea'
      },
      {
        id: 'qualifications',
        label: 'What makes you qualified to join and contribute to this committee? (100 words or ' +
          'less)',
        required: true,
        wordLimit: 100,
        type: 'textarea'
      }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    description: 'The Finance Committee of the HBSA plays a crucial role in maintaining the ' +
      'organization\'s financial stability. This team will work together to meticulously ' +
      'manage financial statements, develop detailed budgets, and process reimbursements. ' +
      'Their responsible financial oversight enables HBSA to fund and support a variety of ' +
      'initiatives and events that enrich the community. The committee\'s efforts ensure ' +
      'transparency and accountability, fostering trust within the association. By joining ' +
      'the Finance Committee, members will gain valuable, fast-paced financial accounting ' +
      'experience while actively contributing to the empowerment and success of HBSA as a ' +
      'whole!',
    questions: [
      {
        id: 'budget-experience',
        label: 'Describe a time you managed a budget or handled money for a project or ' +
          'organization. What challenges did you face, and how did you ensure accuracy and ' +
          'accountability?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'allocation',
        label: 'The finance committee reviews funding requests from student groups and allocates ' +
          'limited resources. Walk us through how you would evaluate a request where two ' +
          'equally important initiatives need funding but only one can be fully funded. What ' +
          'factors matter to you?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'motivation',
        label: 'What appeals to you about serving on HBSA\'s finance committee specifically? How do ' +
          'you see this role contributing to the organization\'s mission?',
        required: true,
        type: 'textarea'
      },
      {
        id: 'communication',
        label: 'Finance committee members need to communicate budget updates and financial ' +
          'decisions to the broader HBSA community. Describe how you would explain a complex ' +
          'financial decision (like why a funding request was denied) in a way that\'s clear ' +
          'and maintains trust.',
        required: true,
        type: 'textarea'
      }
    ]
  }
]
