export interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  slug: string
  year: string
  role?: string
  client?: string
  details?: {
    introduction?: string
    objective?: string
    approach?: string[]
    implementation?: string[]
    outcomes?: string[]
    takeaway?: string
  }
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "West Nusa Tenggara Gubernatorial Campaign",
    description:
      "Secured electoral victory by orchestrating a cohesive brand strategy that effectively communicated candidate values, making Iqbal-Dinda the #1 top-of-mind choice while improving campaign engagement by more than 80%.",
    category: "Political Branding",
    image: "",
    slug: "iqbal-dinda-campaign",
    year: "2023-2024",
    role: "Campaign Brand Strategist",
    client: "Gubernatorial Candidate Iqbal-Dinda",
    featured: true,
    details: {
      introduction:
        "The Iqbal-Dinda gubernatorial campaign faced significant challenges in establishing name recognition and connecting with diverse voter demographics across West Nusa Tenggara. In a competitive political landscape with established opponents, they needed a comprehensive branding strategy that would effectively communicate their values and vision while resonating with regional identity. As their Campaign Brand Strategist, I was tasked with developing and implementing a cohesive brand strategy that would elevate the candidates' visibility and translate into electoral success.",
      objective:
        "Develop and execute a comprehensive brand strategy that would position Iqbal-Dinda as the top-of-mind choice for voters, effectively communicate their values to key demographic segments, and create authentic connections through strategic content campaigns that bridged regional identity with future vision.",
      approach: [
        "Demographic Analysis: Identified key voter segments and their specific concerns, values, and communication preferences across the region.",
        "Regional Identity Integration: Crafted messaging that acknowledged and celebrated local cultural identity while connecting it to the candidates' vision for the future.",
        "Multi-Platform Strategy: Developed coordinated messaging and visual approaches tailored to various communication channels to ensure maximum voter reach.",
        "Authentic Narrative Development: Created compelling storylines that humanized the candidates and made their policy positions relatable to everyday voters.",
      ],
      implementation: [
        "Brand Identity Development: Created distinctive visual and verbal identity systems that ensured consistent candidate recognition.",
        "Strategic Content Campaigns: Implemented targeted content initiatives that reinforced key messaging across multiple platforms.",
        "Visual Storytelling: Produced authentic visual content that connected regional identity with the candidates' vision for the future.",
        "Cohesive Messaging: Orchestrated unified communication that effectively conveyed candidate values to different demographic segments.",
      ],
      outcomes: [
        "Electoral Victory: Secured winning outcome for the Iqbal-Dinda team through effective brand strategy implementation.",
        "#1 Top-of-Mind Position: Elevated candidates to become the primary choice in the district through strategic content campaigns.",
        "80%+ Improvement in Campaign Engagement: Achieved through creating authentic visual content and compelling narratives.",
        "Effective Cross-Demographic Communication: Successfully connected with diverse voter segments through tailored messaging that maintained core brand consistency.",
      ],
      takeaway:
        "This campaign demonstrates that effective political branding goes beyond simple name recognition to create meaningful connections between candidates and voters. By developing a strategy that honored regional identity while articulating a compelling vision for the future, we were able to transform the Iqbal-Dinda ticket from challengers into winners. The success underscores the importance of authentic storytelling, consistent brand execution, and strategic audience targeting in political communication.",
    },
  },
  {
    id: 2,
    title: "PT Sumber Makmur Cemerlang Persada",
    description:
      "Managed comprehensive social media operations including content planning and brand positioning, generating 20% ROI through strategic content calendars.",
    category: "Social Media Management",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smc-sV2HEks47OEh3OLSffXvudTdizPhgF.webp",
    slug: "smcp",
    year: "2023-2024",
    role: "Social Media Manager, Content Strategist",
    client: "PT Sumber Makmur Cemerlang Persada",
    featured: false,
    details: {
      introduction:
        "PT Sumber Makmur Cemerlang Persada faced the challenge of establishing a distinctive voice in a competitive market. With shifting consumer behaviors and digital platform algorithm changes, they needed a comprehensive social media strategy that would cut through the noise and connect with their target audience. As their Social Media Manager and Content Strategist, I was tasked with developing and implementing a strategy that would strengthen their brand presence and drive measurable results.",
      objective:
        "Develop and execute a data-driven social media strategy that would enhance brand positioning, increase audience engagement, and deliver measurable ROI through strategic content planning and audience-tailored approaches.",
      approach: [
        "Audience Segmentation: Conducted thorough market research to identify key audience segments and their unique preferences and behaviors.",
        "Content Pillars: Established distinct content themes aligned with brand values and audience interests to create a cohesive and recognizable content strategy.",
        "Platform-Specific Optimization: Tailored content formats and posting schedules to maximize engagement on each social platform.",
        "Performance Analytics: Implemented robust tracking and reporting systems to measure content performance and inform strategy refinements.",
      ],
      implementation: [
        "Strategic Planning: Developed comprehensive quarterly content calendars with flexibility for trend-responsive content.",
        "Content Creation: Produced high-quality visual assets and engaging copy that maintained brand voice while appealing to target audiences.",
        "Community Management: Implemented response protocols and engagement strategies to build a loyal following and foster community.",
        "Performance Optimization: Conducted bi-weekly performance reviews to identify successful content patterns and areas for improvement.",
      ],
      outcomes: [
        "20% Return on Investment: Achieved through strategic content planning and targeted audience engagement.",
        "Increased Brand Awareness: Measurable growth in brand mentions and social reach across platforms.",
        "Improved Engagement Metrics: Significant increase in average engagement rate across all content types.",
        "Enhanced Brand Positioning: Successfully established a distinctive brand voice and positioning in the competitive market.",
      ],
      takeaway:
        "This project demonstrates that effective social media management goes beyond simply posting content. By implementing a strategic, data-driven approach that balances creative content development with analytical optimization, we were able to transform PT Sumber Makmur Cemerlang Persada's social media presence into a valuable business asset. The success of this project underscores the importance of comprehensive planning, audience understanding, and consistent execution in social media strategy.",
    },
  },
  {
    id: 3,
    title: "Loka Gym and Restaurant",
    description:
      "Developed integrated wellness and lifestyle content positioning the brand as a premier fitness destination, generating 50% growth in membership sign-ups.",
    category: "Wellness Marketing",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIO00487%20%281%29-L6IUjgzloIrSG2t8Iiz5lbNfdIS3Hd.webp",
    slug: "loka",
    year: "2023-2024",
    role: "Brand Strategist, Content Marketing Specialist",
    client: "Loka Gym and Restaurant",
    featured: false,
    details: {
      introduction:
        "Loka Gym and Restaurant faced a unique challenge as a dual-concept business struggling to unify its brand identity. While offering both fitness facilities and nutritious dining, these two elements were perceived as separate entities rather than an integrated wellness experience. In a market saturated with both standard gyms and healthy eating options, Loka needed to differentiate itself by connecting these offerings into a cohesive lifestyle proposition that would resonate with health-conscious consumers seeking comprehensive wellness solutions.",
      objective:
        "Create an integrated brand strategy and content marketing approach that would position Loka as a holistic wellness destination, unifying its fitness and nutrition offerings while driving membership growth and increasing restaurant patronage through compelling lifestyle content.",
      approach: [
        "Holistic Wellness Narrative: Created a unified brand story that positioned exercise and nutrition as complementary elements of the same wellness journey.",
        "Lifestyle Content Pillars: Developed content themes that bridged fitness and nutrition, such as 'Performance Fuel,' 'Recovery Rituals,' and 'Balanced Living.'",
        "Expert Authority Positioning: Showcased Loka's trainers and chefs as wellness experts through educational content that demonstrated their integrated approach.",
        "Community Building: Created programming and content initiatives that fostered a sense of community among members, emphasizing the social aspects of the Loka lifestyle.",
      ],
      implementation: [
        "Brand Identity Refresh: Updated visual elements to create consistency between the gym and restaurant, with a unified color palette and design system.",
        "Content Calendar Integration: Developed a synchronized content strategy that aligned gym promotions with complementary restaurant offerings.",
        "Educational Series Development: Created a 'Loka Lifestyle' content series featuring workout routines paired with nutritional guidance and recipes from the restaurant.",
        "Member Journey Mapping: Designed touchpoints throughout the customer experience that reinforced the connection between fitness activities and nutritional support.",
        "Cross-Promotion Strategy: Implemented incentives that encouraged gym members to visit the restaurant and diners to explore fitness offerings.",
      ],
      outcomes: [
        "50% Growth in Membership Sign-ups: The integrated wellness positioning resonated strongly with target audiences, driving substantial membership growth.",
        "Increased Cross-Utilization: 65% of gym members became regular restaurant patrons, creating additional revenue streams.",
        "Enhanced Brand Perception: Market research showed a significant shift in brand perception, with Loka being recognized as a comprehensive wellness destination rather than just a gym with a restaurant.",
        "Media Recognition: The innovative integrated concept attracted local media coverage, generating valuable earned media exposure.",
      ],
      takeaway:
        "The Loka Gym and Restaurant project demonstrates the power of integrated brand storytelling in creating a cohesive customer experience. By strategically connecting fitness and nutrition under a unified wellness narrative, we transformed what could have been competing or disconnected services into complementary elements of a compelling lifestyle proposition. This approach not only drove business growth but created a stronger, more differentiated position in the market that resonated deeply with health-conscious consumers seeking holistic solutions.",
    },
  },
  {
    id: 4,
    title: "Kinta Coffee",
    description:
      "Created cohesive visual identity and storytelling approach across all customer touchpoints, revitalizing brand perception and increasing engagement by 30%.",
    category: "F&B Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KIO01438-oigqSep0pJ5W3RwnH7qnP9w6IZbisg.webp",
    slug: "kinta",
    year: "2024-2025",
    role: "Brand Strategist, Social Media Manager",
    client: "Kinta Coffee",
    featured: false,
    details: {
      introduction:
        "In Indonesia's rapidly growing specialty coffee market, Kinta Coffee was struggling to differentiate itself despite offering premium, locally-sourced coffee products. The brand lacked visual consistency and a compelling narrative that could connect with increasingly discerning coffee enthusiasts. As their Brand Strategist and Social Media Manager, I was challenged to revitalize their brand identity and create a storytelling approach that would resonate with their target audience across all customer touchpoints.",
      objective:
        "Develop and implement a cohesive visual identity and brand storytelling strategy that would establish Kinta Coffee as a distinctive presence in the specialty coffee market, increase customer engagement, and strengthen brand loyalty through authentic connection with coffee lovers.",
      approach: [
        "Origin-Focused Storytelling: Crafted a narrative centered around the journey of Kinta's coffee beans from farm to cup, highlighting the relationships with local farmers and traditional harvesting practices.",
        "Visual Language Development: Created a distinctive visual identity system with earthy color palettes, custom typography, and authentic photography that reflected the brand's commitment to quality and locality.",
        "Experiential Marketing: Designed customer touchpoints that engaged multiple senses, from packaging that told the coffee's story to in-store elements that created an immersive brand experience.",
        "Digital Content Strategy: Developed a content framework that brought the brand story to life across social media and digital platforms, focusing on education, community, and coffee culture.",
      ],
      implementation: [
        "Brand Discovery: Conducted in-depth research on the coffee industry, customer preferences, and Kinta's unique value propositions to identify authentic storytelling opportunities.",
        "Visual Identity System: Developed comprehensive brand guidelines including logo usage, typography, color palette, photography style, and brand voice.",
        "Touchpoint Redesign: Systematically redesigned all customer touchpoints including packaging, in-store materials, digital assets, and promotional materials.",
        "Content Creation: Produced a library of visual and written content that told the brand story consistently across channels, focusing on quality, origin, and the coffee experience.",
        "Staff Training: Developed materials and conducted sessions to ensure staff could authentically communicate the brand story and values to customers.",
      ],
      outcomes: [
        "30% Increase in Engagement: Significant growth in customer interactions across social media channels and in-store experiences.",
        "Enhanced Brand Perception: Customer surveys revealed a stronger association with quality, authenticity, and sustainability.",
        "Increased Customer Loyalty: Notable growth in repeat customers and membership program enrollment.",
        "Media Recognition: Featured in local food and beverage publications as an example of innovative coffee branding.",
      ],
      takeaway:
        "The Kinta Coffee project demonstrates the transformative power of cohesive visual identity and authentic storytelling in brand revitalization. By creating a consistent experience across all customer touchpoints and focusing on genuine brand narratives that connect with coffee lovers' values, we were able to significantly elevate Kinta's market presence. This case study highlights how thoughtful brand strategy can create meaningful differentiation even in crowded markets, proving that authentic storytelling resonates with today's consumers who seek brands with purpose and personality.",
    },
  },
  {
    id: 5,
    title: "Hotel Ombak Sunset",
    description:
      "Developed creative content strategies and consistent visual themes that increased social media engagement by 40% and strengthened brand identity.",
    category: "Hospitality Marketing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A13I2860-lux11gMAuI0o5Ttx19hgbMEgFNIY7S.webp",
    slug: "hotel",
    year: "2024-2025",
    role: "Content Strategist, Social Media Manager",
    client: "Hotel Ombak Sunset",
    featured: false,
    details: {
      introduction:
        "Hotel Ombak Sunset, a stunning property in Indonesia, was struggling to stand out in a saturated hospitality market. Despite offering breathtaking views and exceptional guest experiences, their digital presence failed to capture the essence of what made them special. In an industry increasingly driven by social media discovery, they needed to transform their online identity to attract the right audience and showcase their unique attributes in an authentic, engaging way.",
      objective:
        "Revitalize Hotel Ombak Sunset's social media presence by developing a cohesive visual identity and content strategy that would highlight the property's distinctive experiences, increase audience engagement, and strengthen overall brand perception in the competitive luxury hospitality market.",
      approach: [
        "Experience-First Storytelling: Shifted focus from property features to emotional experiences guests could expect, highlighting moments that couldn't be replicated elsewhere.",
        "Visual Consistency: Developed a signature aesthetic with warm tones and golden-hour photography that reinforced the 'sunset' brand element across all content.",
        "Local Integration: Showcased the property's connection to local culture and natural surroundings, appealing to travelers seeking authentic experiences.",
        "User-Generated Content Strategy: Created shareable moments and incentivized guests to capture and share their experiences, expanding organic reach.",
      ],
      implementation: [
        "Content Audit and Competitor Analysis: Evaluated existing content performance and identified gaps and opportunities in the competitive landscape.",
        "Visual Identity Development: Created a comprehensive style guide with color palettes, photography direction, and graphic elements to ensure visual cohesion.",
        "Content Calendar Creation: Developed a strategic posting schedule that balanced promotional content with lifestyle and experiential stories.",
        "Staff Training: Equipped hotel staff with the skills to identify and capture authentic moments that aligned with the content strategy.",
        "Performance Tracking: Implemented analytics frameworks to measure engagement and refine strategy based on audience response.",
      ],
      outcomes: [
        "40% Increase in Engagement: Across all social platforms, with significant growth in meaningful interactions like comments and shares.",
        "Enhanced Visual Identity: Established a recognizable brand aesthetic that distinguished the property from competitors.",
        "Improved Content Efficiency: Optimized content performance with scheduled themes that maximized audience reach and interaction.",
        "Increased Direct Bookings: Social media became a significant driver of traffic to the hotel's booking platform, with traceable conversion improvements.",
      ],
      takeaway:
        "This project demonstrates that in the hospitality industry, effective social media strategy goes beyond beautiful imagery – it requires a deep understanding of what makes a property unique and how to translate that into engaging visual narratives. By focusing on authentic experiences and establishing a consistent visual language, we transformed Hotel Ombak Sunset's digital presence from a standard promotional channel into a compelling storytelling platform that resonated with their target audience and delivered measurable business results.",
    },
  },
  {
    id: 6,
    title: "Balakosa Coffee Co Social Media Marketing",
    description:
      "Boosted social media engagement by 60% through creative strategy development, increased in-store traffic by 60% via branded events, and implemented data-driven approaches improving campaign ROI by 40%.",
    category: "Social Media Marketing",
    image: "",
    slug: "balakosa-coffee",
    year: "2022-2023",
    role: "Social Media Marketing Specialist",
    client: "Balakosa Coffee Co",
    featured: true,
    details: {
      introduction:
        "Balakosa Coffee Co needed to strengthen its market position in the competitive Yogyakarta coffee scene. With an evolving coffee culture and increasing consumer expectations, they required a strategic approach to their social media and marketing efforts that would translate into both online engagement and physical store traffic. As their Social Media Marketing Specialist, I was responsible for developing and implementing creative strategies that would enhance their brand identity and drive measurable business results.",
      objective:
        "Develop and execute comprehensive creative marketing strategies that would establish a distinctive brand voice, increase social media engagement, drive in-store traffic, and improve campaign ROI through data-driven decision making and cohesive brand identity development.",
      approach: [
        "Brand Voice Development: Established a distinctive brand voice that resonated with target coffee enthusiasts and casual consumers alike.",
        "Visual Identity Cohesion: Collaborated with the design team to brainstorm visual guidelines ensuring consistency across all customer touchpoints.",
        "Data-Driven Strategy: Implemented analytical approaches to evaluate and optimize creative decisions and campaign performance.",
        "Event Marketing: Conceptualized branded events that would serve dual purposes of generating sales and creating content opportunities.",
      ],
      implementation: [
        "Creative Direction: Led the development of a cohesive visual and verbal brand identity that differentiated Balakosa in the market.",
        "Content Strategy: Created and executed social media content plans that highlighted Balakosa's unique offerings and brand values.",
        "Event Production: Organized and executed branded events that attracted target customers while generating shareable content.",
        "Performance Analysis: Conducted regular campaign evaluations to identify successful strategies and optimize future initiatives.",
      ],
      outcomes: [
        "60% Increase in Social Media Engagement: Achieved through directing creative strategy that established a distinctive brand voice.",
        "60% Increase in In-Store Traffic: Generated by conceptualizing branded events that created both sales and content opportunities.",
        "40% Improvement in Campaign ROI: Realized by implementing data-driven approaches to creative decision-making.",
        "80% More Cohesive Brand Identity: Established by brainstorming visual guidelines across all customer touchpoints with the design team.",
      ],
      takeaway:
        "This project demonstrates that effective social media marketing requires a holistic approach that bridges online engagement with real-world experiences. By developing a strong brand identity and implementing data-informed creative strategies, we were able to transform Balakosa Coffee Co's market presence and drive significant business results. The success of this initiative highlights the importance of cohesive brand storytelling, strategic event marketing, and analytical optimization in creating meaningful connections with coffee consumers.",
    },
  },

  {
    id: 7,
    title: "Royal Batu Bolong Destination Rebranding",
    description:
      "Revitalized brand perception and increased engagement by 30% by creating a cohesive visual identity and storytelling approach, while transforming brand positioning to highlight wedding venue capabilities through targeted awareness campaigns.",
    category: "Destination Branding",
    image: "",
    slug: "royal-batu-bolong",
    year: "2024-2025",
    role: "Brand Strategist, Social Media Manager",
    client: "Royal Batu Bolong Destination",
    featured: false,
    details: {
      introduction:
        "Royal Batu Bolong Destination faced challenges in differentiating itself in the competitive tourism market of West Nusa Tenggara. Despite its unique location and features, the destination lacked a distinctive brand identity and clear positioning, particularly for its wedding venue capabilities. As their Brand Strategist and Social Media Manager, I was tasked with revitalizing their brand perception and creating a compelling identity that would highlight their unique offerings and increase engagement across all customer touchpoints.",
      objective:
        "Develop and implement a comprehensive rebranding strategy that would create a cohesive visual identity, establish effective storytelling approaches, increase customer engagement, and transform brand positioning to highlight wedding venue capabilities through targeted awareness campaigns.",
      approach: [
        "Brand Identity Audit: Conducted thorough assessment of existing brand elements and market perception to identify strengths, weaknesses, and opportunities.",
        "Competitive Analysis: Researched comparable destinations to identify unique selling propositions and positioning opportunities.",
        "Visual Storytelling Framework: Developed cohesive visual themes and narrative approaches that would showcase the location's distinctive features.",
        "Wedding Venue Positioning: Created specialized strategic framework to highlight and promote wedding venue capabilities to appropriate target markets.",
      ],
      implementation: [
        "Visual Identity Development: Created consistent visual themes and design elements that reflected the destination's unique character and appeal.",
        "Content Strategy: Implemented storytelling approaches across all customer touchpoints that communicated the destination's distinctive experience.",
        "Targeted Awareness Campaigns: Developed specialized marketing initiatives showcasing the location's unique features as a wedding venue.",
        "Cohesive Brand Experience: Ensured consistent brand messaging and visual identity across all digital and physical customer touchpoints.",
      ],
      outcomes: [
        "30% Increase in Brand Engagement: Achieved through cohesive visual identity and storytelling approach implementation.",
        "Enhanced Wedding Venue Recognition: Successfully transformed brand positioning to highlight wedding venue capabilities.",
        "Improved Market Differentiation: Established clearer distinction from competitors through consistent visual themes and messaging.",
        "Strengthened Customer Perception: Created more cohesive and memorable brand experience across all touchpoints.",
      ],
      takeaway:
        "This project demonstrates that effective destination branding requires both broad identity development and specialized positioning for key service offerings. By creating a cohesive visual identity while specifically highlighting wedding venue capabilities, we were able to revitalize Royal Batu Bolong's market presence and drive meaningful engagement. The success of this initiative underscores the importance of consistent brand execution combined with targeted positioning strategies in destination marketing.",
    },
  },
  {
    id: 8,
    title: "House of Representatives Campaign Branding",
    description:
      "Increased candidate visibility by 80% by developing a distinctive personal brand identity and comprehensive social media strategy that resonated with target voters.",
    category: "Political Branding",
    image: "",
    slug: "busfi-arusagara-campaign",
    year: "2023",
    role: "Political Brand Strategist",
    client: "House of Representatives Candidate Busfi Arusagara",
    featured: false,
    details: {
      introduction:
        "House of Representatives candidate Busfi Arusagara faced the challenge of establishing name recognition and connecting with constituents in a competitive political landscape. With limited previous political visibility and the need to distinguish himself from other candidates, he required a strategic approach to personal branding and voter communication. As his Political Brand Strategist, I was responsible for developing and implementing a distinctive personal brand identity and comprehensive social media strategy that would increase his visibility and resonate with target voters.",
      objective:
        "Develop and execute a comprehensive personal branding strategy that would establish Busfi Arusagara as a recognizable and compelling candidate, increase his visibility among target voter segments, and create meaningful connections through strategic social media engagement.",
      approach: [
        "Candidate Positioning: Identified distinctive personal attributes and policy positions that would differentiate the candidate from competitors.",
        "Voter Segment Analysis: Researched target voter demographics to understand their priorities, communication preferences, and engagement patterns.",
        "Personal Brand Architecture: Developed a cohesive personal brand framework that would ensure consistency across all voter touchpoints.",
        "Social Media Landscape Mapping: Evaluated platform-specific opportunities to reach and engage with key voter segments.",
      ],
      implementation: [
        "Personal Brand Identity: Created distinctive visual and verbal identity systems that established immediate candidate recognition.",
        "Social Media Strategy: Developed comprehensive platform-specific content approaches tailored to target voter preferences.",
        "Engagement Framework: Implemented strategic communication practices that fostered authentic connections with constituents.",
        "Campaign Messaging: Crafted compelling narratives that effectively communicated the candidate's values and vision to target voters.",
      ],
      outcomes: [
        "80% Increase in Candidate Visibility: Achieved through the development of a distinctive personal brand identity that stood out in the political landscape.",
        "Enhanced Voter Connection: Successfully established meaningful relationships with constituents through targeted social media engagement.",
        "Improved Brand Recognition: Created immediate visual and message recognition across all campaign touchpoints.",
        "Strategic Voter Targeting: Effectively reached and engaged with key demographic segments through platform-specific content strategies.",
      ],
      takeaway:
        "This campaign demonstrates that effective political branding for legislative candidates requires both distinctive personal identity development and strategic audience targeting. By creating a cohesive personal brand while implementing targeted social media strategies, we were able to significantly increase Busfi Arusagara's visibility and voter connection. The success of this initiative highlights the importance of authentic personal branding and platform-specific engagement approaches in political communication.",
    },
  },
  {
    id: 9,
    title: "Resto Kenangan Restaurant Rebranding",
    description:
      "Boosted customer traffic by 30% by redesigning brand identity and implementing targeted social media campaigns that showcased the restaurant's unique culinary story.",
    category: "Restaurant Branding",
    image: "",
    slug: "resto-kenangan",
    year: "2022",
    role: "Brand Strategist, Content Developer",
    client: "Resto Kenangan Restaurant",
    featured: false,
    details: {
      introduction:
        "Resto Kenangan faced significant challenges in a competitive dining market, struggling to differentiate itself and attract new customers despite offering quality cuisine. The restaurant lacked a distinctive brand identity and compelling narrative that would connect with diners on an emotional level. As their Brand Strategist and Content Developer, I was tasked with revitalizing their brand identity and creating targeted social media campaigns that would showcase their unique culinary story and drive measurable increases in customer traffic.",
      objective:
        "Develop and implement a comprehensive rebranding strategy that would establish a distinctive brand identity, create emotional connections through culinary storytelling, and increase customer traffic through targeted social media campaigns focused on the restaurant's unique offerings.",
      approach: [
        "Brand Identity Redesign: Conducted thorough assessment of existing visual elements and created refreshed design system that better communicated the restaurant's character and values.",
        "Culinary Narrative Development: Crafted compelling storytelling frameworks highlighting the unique aspects of the restaurant's food, history, and dining experience.",
        "Audience Segmentation: Identified key customer demographics and their specific dining preferences, behaviors, and communication channels.",
        "Social Media Strategy: Developed platform-specific content approaches that would effectively showcase the restaurant's distinctive offerings.",
      ],
      implementation: [
        "Visual Identity Refresh: Redesigned key brand elements to create a more distinctive and appealing restaurant identity.",
        "Content Creation: Produced engaging visual and written content that highlighted the restaurant's unique culinary story across various platforms.",
        "Targeted Campaigns: Implemented strategic social media initiatives focused on reaching and engaging with priority customer segments.",
        "Experience Documentation: Created compelling visual documentation of the dining experience that effectively communicated the restaurant's atmosphere and offerings.",
      ],
      outcomes: [
        "30% Increase in Customer Traffic: Generated through the combination of redesigned brand identity and targeted social media campaigns.",
        "Enhanced Brand Perception: Successfully established a more distinctive and memorable restaurant identity in the market.",
        "Improved Digital Engagement: Achieved significant increases in social media interaction and content sharing.",
        "Strengthened Customer Loyalty: Created deeper emotional connections with diners through compelling culinary storytelling.",
      ],
      takeaway:
        "This project demonstrates that effective restaurant branding requires both visual distinctiveness and emotional storytelling. By redesigning the brand identity while implementing targeted campaigns that showcased Resto Kenangan's unique culinary narrative, we were able to significantly increase customer traffic and market presence. The success of this initiative underscores the importance of authentic storytelling and strategic content development in restaurant marketing, proving that compelling brand narratives can translate directly into business growth.",
    },
  },
  {
    id: 10,
    title: "Switch On Creative",
    description:
      "Increased brand engagement by 70% through comprehensive creative strategies, improved content production efficiency by 90% by establishing streamlined workflows, and strengthened brand consistency by 75% through detailed guidelines.",
    category: "Creative Direction",
    image: "",
    slug: "switch-on-creative",
    year: "2023-2024",
    role: "Content Creative Strategist",
    client: "Switch On Creative",
    featured: true,
    details: {
      introduction:
        "Switch On Creative faced challenges in scaling their creative output while maintaining quality and brand consistency across diverse client portfolios. With increasing client demands and tightening timelines, they needed to establish efficient workflows and strategic approaches that would deliver exceptional creative results. As their Content Creative Strategist, I was responsible for developing comprehensive creative strategies, establishing streamlined production workflows, and implementing brand consistency measures that would improve both client outcomes and internal efficiency.",
      objective:
        "Develop and implement comprehensive creative strategies tailored to each client's market position, establish efficient cross-functional production workflows, create detailed brand voice guidelines to ensure consistency, and develop compelling creative presentations with clear strategic rationales.",
      approach: [
        "Client-Specific Strategy: Developed tailored creative approaches that aligned with each client's unique market position, audience, and business objectives.",
        "Cross-Functional Collaboration: Established structured workflows that coordinated efforts across creative disciplines including design, content, and production teams.",
        "Brand Voice Architecture: Created detailed guidelines and creative direction documents to ensure consistency across all client deliverables.",
        "Strategic Presentation Development: Crafted compelling creative pitches with clear rationales that connected creative concepts to business outcomes.",
      ],
      implementation: [
        "Creative Team Leadership: Established and led high-performing cross-functional creative teams with streamlined workflows.",
        "Strategy Development: Created comprehensive creative strategies customized to each client's specific market positioning and objectives.",
        "Brand Consistency Systems: Implemented detailed brand voice guidelines and creative direction processes.",
        "Pitch Preparation: Developed compelling creative presentations with clear strategic rationales that secured consistent approvals.",
      ],
      outcomes: [
        "70% Increase in Brand Engagement: Achieved through developing comprehensive creative strategies tailored to each client's market position.",
        "90% Improvement in Content Production Efficiency: Realized by establishing and leading cross-functional creative teams with streamlined workflows.",
        "75% Stronger Brand Consistency: Delivered by creating detailed brand voice guidelines and creative direction documents.",
        "100% First-Round Creative Pitch Approvals: Secured by developing compelling presentations with clear strategic rationales.",
      ],
      takeaway:
        "This role demonstrates that effective creative leadership requires both strategic vision and operational excellence. By developing tailored creative strategies while implementing efficient production systems, we were able to significantly improve client outcomes while enhancing internal productivity. The success in this position underscores the importance of combining creative direction with process optimization, proving that structure and creativity can work together to deliver exceptional results across diverse client portfolios.",
    },
  },
  {
    id: 11,
    title: "Siglo Sky Lounge",
    description:
      "Led the brand identity revitalization for Siglo Sky Lounge, developing and executing a social media strategy that boosted customer traffic by 30% and increased membership sign-ups by 50%.",
    category: "Hospitality Marketing",
    image: "",
    slug: "siglo-sky-lounge",
    year: "2023",
    role: "Social Media Strategist",
    client: "Siglo Sky Lounge",
    featured: false,
    details: {
      introduction:
        "Siglo Sky Lounge faced challenges in attracting new customers and retaining existing ones in a competitive market. They needed a refreshed brand identity and a dynamic social media presence to re-engage their audience and drive business growth.",
      objective:
        "The primary goal was to revitalize Siglo's brand to increase foot traffic and boost membership. This involved creating a compelling online presence that would resonate with the target audience and translate into measurable business results.",
      approach: [
        "Audience Analysis: Identifying key customer segments and their preferences.",
        "Brand Identity Refresh: Developing a new visual and verbal identity to modernize the brand's image.",
        "Content Strategy: Creating engaging content, including high-quality visuals and compelling copy, to showcase the lounge's unique offerings.",
        "Community Engagement: Actively engaging with followers to build a loyal online community.",
      ],
      implementation: [
        "Brand Guideline Development: Establishing a consistent brand voice and aesthetic across all platforms.",
        "Content Calendar: Planning and scheduling regular content to maintain an active and engaging online presence.",
        "Promotional Campaigns: Launching targeted campaigns and special offers to drive traffic and sign-ups.",
        "Performance Tracking: Monitoring key metrics to measure the effectiveness of the strategy and make data-driven adjustments.",
      ],
      outcomes: [
        "30% Increase in Customer Traffic: The revitalized brand and engaging content successfully drew more customers to the lounge.",
        "50% Increase in Membership Sign-ups: Targeted promotions and a stronger brand appeal led to a significant rise in new members.",
        "Enhanced Brand Image: The lounge established a more modern and appealing brand identity.",
      ],
      takeaway:
        "This project demonstrates that a strategic approach to social media and brand identity can directly impact business growth. By understanding the audience and creating a compelling brand narrative, it's possible to drive significant increases in both customer traffic and loyalty.",
    },
  },
  {
    id: 12,
    title: "World Field Archery (IWFA) 2025",
    description:
      "Managed the complete planning and execution of the Opening and Closing Ceremonies for the World Field Archery (IWFA) 2025, resulting in a 95% attendee satisfaction rating and a significantly amplified global online presence.",
    category: "Event Management",
    image: "",
    slug: "world-field-archery-2025",
    year: "2025",
    role: "Project Manager",
    client: "Kreasi Wisata Mania (KWM)",
    featured: true,
    details: {
      introduction:
        "As a prestigious international competition, the IWFA required opening and closing ceremonies that would not only celebrate the athletes but also provide an unforgettable experience for all participants. The goal was to create events that were both grand in scale and flawless in execution.",
      objective:
        "To deliver world-class opening and closing ceremonies that would captivate a global audience, enhance the event's reputation, and achieve near-perfect attendee satisfaction.",
      approach: [
        "Thematic Development: Crafting a unique theme for the ceremonies that celebrated the sport of archery and the host location's heritage.",
        "Integrated Digital Marketing: Developing a comprehensive digital strategy to build global anticipation and engage with archery enthusiasts worldwide.",
        "Risk Management: Identifying potential challenges and developing contingency plans to ensure a smooth and successful event.",
        "Collaborative Planning: Engaging with all key stakeholders to ensure alignment and a unified approach.",
      ],
      implementation: [
        "Event Blueprint: Creating a detailed plan that covered every aspect of the ceremonies, from the run-of-show to technical specifications.",
        "Digital Content Creation: Producing high-quality content to promote the event across various digital channels.",
        "Live Event Management: Providing on-the-ground leadership to manage the live production and coordinate all moving parts.",
        "Post-Event Analysis: Conducting a thorough review of the event to assess its success and gather insights for future projects.",
      ],
      outcomes: [
        "95% Attendee Satisfaction: The ceremonies received overwhelmingly positive feedback from athletes, officials, and spectators.",
        "Amplified Online Presence: The digital strategy successfully generated global buzz and increased the event's online visibility.",
        "Seamless Event Delivery: The meticulous planning ensured that both ceremonies were executed without any major issues.",
      ],
      takeaway:
        "Successful event management on an international scale requires a blend of creativity, strategic planning, and digital savvy. This project proves that by focusing on the attendee experience and leveraging digital platforms, it's possible to create truly memorable and impactful events.",
    },
  },
  {
    id: 13,
    title: "Paragliding Accuracy World Cup (PGAWC) 2025",
    description:
      "Directed the end-to-end planning and execution of the Opening and Closing Ceremonies for the Paragliding Accuracy World Cup (PGAWC) 2025 in Lombok, achieving a 95% attendee satisfaction rating.",
    category: "Event Management",
    image: "",
    slug: "paragliding-accuracy-world-cup-2025",
    year: "2025",
    role: "Project Manager",
    client: "Kreasi Wisata Mania (KWM)",
    featured: false,
    details: {
      introduction:
        "The PGAWC is a major international event that required world-class opening and closing ceremonies to create a memorable experience for athletes, officials, and spectators. The challenge was to deliver flawless events that captured the spirit of the competition and the culture of Lombok.",
      objective:
        "To plan and execute spectacular opening and closing ceremonies that would enhance the overall event experience, generate positive global media coverage, and achieve a high level of satisfaction among all attendees.",
      approach: [
        "Stakeholder Collaboration: Working closely with event organizers, local authorities, and vendors to align on the vision and logistics.",
        "Creative Concept Development: Designing unique and engaging ceremony concepts that showcased local culture and the excitement of the sport.",
        "Digital Strategy Integration: Utilizing social media and digital platforms to build anticipation and engage a global audience before, during, and after the event.",
        "Logistical Planning: Meticulously planning all aspects of the ceremonies, including venue management, scheduling, and technical production.",
      ],
      implementation: [
        "Vendor Management: Selecting and managing top-tier vendors for production, entertainment, and logistics.",
        "On-Site Coordination: Overseeing all on-site activities to ensure everything ran smoothly and according to plan.",
        "Digital Campaign Execution: Launching a multi-platform digital campaign to amplify the event's reach and engagement.",
        "Feedback Collection: Gathering feedback from attendees to measure satisfaction and identify areas for improvement.",
      ],
      outcomes: [
        "95% Attendee Satisfaction Rating: The ceremonies were highly praised by attendees for their creativity, organization, and entertainment value.",
        "Global Online Presence: The digital strategy successfully built global anticipation and amplified the event's online visibility.",
        "Flawless Execution: The meticulous planning and on-site management resulted in seamless and memorable events.",
      ],
      takeaway:
        "This project highlights the importance of integrating creative vision with meticulous project management and a strong digital strategy. By doing so, it's possible to deliver high-impact events that resonate with a global audience and achieve outstanding satisfaction rates.",
    },
  },
  {
    id: 14,
    title: "Explore Lombok",
    description:
      "Led the strategic and operational management of Explore Lombok during a critical season, driving 25% business growth through the development and execution of targeted media projects and content series.",
    category: "Business Management",
    image: "",
    slug: "explore-lombok",
    year: "2025",
    role: "Managing Director (Seasonal)",
    client: "Explore Lombok",
    featured: false,
    details: {
      introduction:
        "Explore Lombok, a media and tour company, needed to capitalize on the peak season to drive growth. The challenge was to develop and implement a strategy that would attract more clients and expand the company's portfolio of media projects.",
      objective:
        "The main objective was to achieve significant business growth within a single season by enhancing the company's strategic direction and operational efficiency, with a focus on high-impact media projects.",
      approach: [
        "Strategic Planning: Identifying new market opportunities and developing a roadmap for growth centered on unique content and media services.",
        "Operational Management: Streamlining workflows and optimizing resource allocation to improve efficiency and project delivery.",
        "Content Development: Conceptualizing and producing targeted content series and media projects to attract new clients and showcase the beauty of Lombok.",
      ],
      implementation: [
        "Business Development: Actively pursuing new partnerships and media projects with local and national clients.",
        "Project Management: Overseeing the production of all media content, from concept to final delivery.",
        "Team Leadership: Managing and motivating the team to achieve ambitious growth targets.",
      ],
      outcomes: [
        "25% Business Growth: The targeted strategies and operational improvements led to a significant increase in revenue and client acquisition.",
        "Expanded Media Portfolio: The company successfully launched several new media projects and content series, enhancing its reputation and market position.",
        "Improved Operational Efficiency: Streamlined processes allowed the company to handle a larger volume of work more effectively.",
      ],
      takeaway:
        "This experience demonstrates that focused strategic leadership and efficient operational management can drive rapid business growth, even in a seasonal market. By identifying and capitalizing on key opportunities, it's possible to achieve substantial results in a short period.",
    },
  },
  {
    id: 15,
    title: "Hikayat Ampenan",
    description:
      "Served as the Director of Photography for 'Hikayat Ampenan,' a documentary project supported by the Ministry of Education and Culture that chronicled the rich history of the historic port of Ampenan.",
    category: "Documentary Production",
    image: "",
    slug: "hikayat-ampenan",
    year: "2025",
    role: "Director of Photography",
    client: "Explore Lombok (in partnership with the Ministry of Education and Culture)",
    featured: false,
    details: {
      introduction:
        "'Hikayat Ampenan' was a significant cultural project aimed at preserving and sharing the story of one of Lombok's most historic locations. The challenge was to visually capture the essence of Ampenan's past and present in a way that was both historically accurate and emotionally engaging.",
      objective:
        "To create a visually stunning and compelling documentary that would serve as a valuable historical record and a piece of cultural storytelling, meeting the high standards of the Ministry of Education and Culture.",
      approach: [
        "Historical Research: Collaborating with historians and local experts to ensure the visual narrative was authentic and accurate.",
        "Visual Concept Development: Creating a distinct visual style for the documentary that would bring the history of Ampenan to life.",
        "Cinematic Techniques: Utilizing advanced camera and lighting techniques to capture the beauty and character of the location and its people.",
      ],
      implementation: [
        "Location Scouting: Identifying key locations that were central to Ampenan's history.",
        "On-Location Filming: Leading the camera crew to capture high-quality footage, including interviews, archival materials, and cinematic shots of the port.",
        "Post-Production Collaboration: Working closely with the editor to ensure the final visual narrative was powerful and coherent.",
      ],
      outcomes: [
        "Ministry of Education and Culture Support: The project successfully secured support from the ministry, a testament to its cultural significance and quality.",
        "Valuable Historical Document: The documentary serves as an important visual record of Ampenan's history for future generations.",
        "Compelling Visual Narrative: The final product was a beautifully shot film that effectively told the story of the historic port.",
      ],
      takeaway:
        "This project underscores the power of visual storytelling in preserving cultural heritage. As Director of Photography, my role was to translate historical narratives into a compelling visual language, creating a documentary that is both informative and artistically resonant.",
    },
  },
  {
    id: 16,
    title: "FORNAS VIII NTB 2025",
    description:
      "Architected the digital strategy for a national sports festival, managing seamless information flow for over 25,000 participants and engaging a national audience of over 15,000, which resulted in a 40% increase in social media engagement.",
    category: "Digital Strategy",
    image: "",
    slug: "fornas-viii-ntb-2025",
    year: "2025",
    role: "Project Manager",
    client: "FORNAS VIII NTB 2025 (National Sports Festival)",
    featured: true,
    details: {
      introduction:
        "FORNAS VIII was a large-scale national sports festival that required a robust digital infrastructure to manage communications with thousands of participants and engage a nationwide audience. The challenge was to create a digital strategy that was both efficient and highly engaging.",
      objective:
        "To develop and implement a comprehensive digital strategy that would streamline information dissemination for participants, build a vibrant online community, and significantly increase audience engagement across all digital platforms.",
      approach: [
        "Information Architecture: Designing a clear and accessible information flow to ensure participants could easily find the information they needed.",
        "Community Building: Creating an online community where participants and fans could connect, share their experiences, and follow the event.",
        "Content Strategy: Developing a dynamic content plan to keep the audience engaged with real-time updates, behind-the-scenes stories, and interactive content.",
        "Platform Integration: Utilizing a mix of social media platforms, a dedicated website, and mobile communication to reach the widest possible audience.",
      ],
      implementation: [
        "Digital Hub Development: Creating a central online hub for all event-related information.",
        "Social Media Campaign: Launching an integrated social media campaign to drive engagement and build an online community.",
        "Real-Time Content Production: Deploying a team to capture and share live content from the event.",
        "Performance Analytics: Tracking key metrics to measure the success of the digital strategy and make real-time adjustments.",
      ],
      outcomes: [
        "40% Increase in Social Media Engagement: The engaging content and community-building efforts led to a significant boost in online interaction.",
        "Seamless Information Flow for 25,000+ Participants: The digital infrastructure successfully managed communications for a large number of participants.",
        "Engaged National Audience of 15,000+: The strategy successfully captured the attention of a large national audience.",
      ],
      takeaway:
        "This project demonstrates the critical role of a well-architected digital strategy in the success of large-scale events. By focusing on both information management and audience engagement, it's possible to create a digital experience that enhances the overall event for both participants and spectators.",
    },
  },
  {
    id: 17,
    title: "AMOK Research",
    description:
      "Improved operational efficiency by 15% by developing and implementing a new support workflow for the consulting and research divisions, which enhanced the delivery of client projects.",
    category: "Business Operations",
    image: "",
    slug: "amok-research",
    year: "2025",
    role: "Business Support",
    client: "Spicy Lombok",
    featured: true, // Add this line
    details: {
      introduction:
        "AMOK Research, a consulting and research firm, needed to streamline its internal processes to improve efficiency and enhance the quality of its client project delivery. The existing workflows were creating bottlenecks and impacting productivity.",
      objective:
        "The primary objective was to design and implement a new support workflow that would increase operational efficiency, reduce project delivery times, and improve overall collaboration between the consulting and research divisions.",
      approach: [
        "Workflow Analysis: Conducting a thorough analysis of the existing workflows to identify inefficiencies and pain points.",
        "Process Redesign: Designing a new, streamlined workflow that would improve communication, collaboration, and task management.",
        "Stakeholder Consultation: Working closely with members of both divisions to ensure the new workflow met their needs and was practical to implement.",
        "Technology Integration: Identifying and integrating tools and technologies to support the new workflow and automate manual tasks.",
      ],
      implementation: [
        "Pilot Program: Testing the new workflow with a small group to gather feedback and make refinements.",
        "Training and Onboarding: Providing training to all team members to ensure a smooth transition to the new process.",
        "Full Implementation: Rolling out the new workflow across both divisions.",
        "Performance Monitoring: Continuously monitoring the performance of the new workflow and making adjustments as needed.",
      ],
      outcomes: [
        "15% Improvement in Operational Efficiency: The new workflow significantly reduced bottlenecks and improved overall productivity.",
        "Enhanced Project Delivery: The streamlined process led to faster and more efficient delivery of client projects.",
        "Improved Cross-Divisional Collaboration: The new workflow fostered better communication and teamwork between the consulting and research divisions.",
      ],
      takeaway:
        "This project highlights the impact that process improvement can have on a company's operational efficiency and client service. By taking a systematic approach to analyzing and redesigning workflows, it's possible to achieve significant gains in productivity and enhance the overall quality of work.",
    },
  },{
    id: 18,
    title: "Diskominfo Kota Mataram: Public Relations & Communications Support",
    description:
      "The primary objective was to provide comprehensive support to the Communication & Legal Department, thereby enhancing its operational efficiency and strengthening its capacity to manage media relations, public events, and strategic communications effectively.",
    category: "Public Relations",
    image: "",
    slug: "diskominfo-kota-mataram",
    year: "2020",
    role: "Public Relations Communication Intern",
    client: "Diskominfo Kota Mataram (Government)",
    featured: true,
    details: {
      introduction:
        "The Communication & Legal Department at Diskominfo Kota Mataram is responsible for managing the city's public image, disseminating critical information, and engaging with a diverse range of stakeholders. The department required dedicated support to handle its high volume of daily activities—from media relations and event coordination to proactive crisis management—ensuring all communications remained consistent and effective.",
      objective:
        "The primary objective was to provide comprehensive support to the Communication & Legal Department, thereby enhancing its operational efficiency and strengthening its capacity to manage media relations, public events, and strategic communications effectively.",
      approach: [
        "Stakeholder Engagement: Focusing on maintaining positive and responsive relationships with media outlets and key community stakeholders.",
        "Event Support: Providing hands-on assistance in the planning and execution of official government events to ensure they ran smoothly and were professionally documented.",
        "Proactive Communications: Contributing to crisis management readiness and strategic planning to ensure government messaging was clear, timely, and aligned with public interests.",
      ],
      implementation: [
        "Media Relations: Assisted in the coordination of press releases and public statements for media partners.",
        "Event Logistics: Supported event execution through logistical planning, managing media invitations, and providing on-site photography.",
        "Communications Monitoring: Monitored public and media channels to help the team identify and prepare for potential communications crises.",
        "Strategic Contribution: Participated in the development and implementation of departmental communication plans.",
      ],
      outcomes: [
        "Enhanced Department Capacity: Provided crucial support that allowed the full-time team to focus on higher-level strategic initiatives.",
        "Strengthened Media Relationships: Assisted in fostering a more collaborative and responsive relationship with local and regional media.",
        "Contributed to Successful Events: Played a role in the successful execution of key public-facing events and official announcements.",
      ],
      takeaway:
        "This internship highlights the critical value of foundational public relations support within a government setting. By assisting in core daily operations, it's possible to significantly contribute to a department's overall effectiveness in maintaining public trust and transparency.",
    },
},
]

export const getFeaturedProjects = () => projects.filter((project) => project.featured)
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
export const getProjectCategories = () => {
  // Get unique categories and sort them alphabetically
  const categories = Array.from(new Set(projects.map((project) => project.category.trim())))
  return ["all", ...categories.sort()]
}
