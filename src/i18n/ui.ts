export const languages = {
  en: 'English',
  ar: 'العربية',
} as const;

export type Locale = keyof typeof languages;

export const defaultLang: Locale = 'en';

export const ui = {
  en: {
    'site.title': 'Bakinam Construction',
    'site.tagline': 'Rebuilding Home. Restoring Peace of Mind.',
    'site.description':
      'Your trusted partner for home rehabilitation, civil engineering, and secure construction in Khartoum. Serving families - local and abroad - with transparent project management.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.reviews': 'Reviews',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.contactBtn': 'Contact Us',
    'nav.call': 'Call',
    'lang.switch': 'العربية',
    'lang.target': 'ar',

    // Hero
    'hero.topper': 'Home Rehabilitation & Construction',
    'hero.heading': 'Rebuilding Home. Restoring Peace of Mind.',
    'hero.cta': 'Consult With Our Team',
    'hero.secondary': 'Explore Our Services',

    // Services section
    'services.topper': 'Our Core Capabilities',
    'services.heading': 'Clustered Construction & Rehabilitation Services',
    'services.desc':
      'From immediate structural repairs to turnkey diaspora management, our integrated divisions deliver complete peace of mind in Khartoum.',
    'services.learnMore': 'Inquire about this service',
    'services.capabilities': 'Key Capabilities:',

    // About section
    'about.topper': 'Who We Are',
    'about.heading': 'Building in Khartoum Since 2016 - Your Eyes & Hands on the Ground',
    'about.p1':
      'Founded by Bakinam Osman Rahama, who began building in Kafouri 3 in September 2016, we have spent a decade cultivating a premier network of trusted suppliers, civil engineers, and master craftsmen across Khartoum.',
    'about.p2':
      'Supported by her German husband Christof Litznerski, we combine deep local operational roots with European standards of project management, transparent milestone accounting, and weekly digital video audits.',
    'about.b1': '10 years of trusted building & supplier networks in Kafouri & Khartoum',
    'about.b2': 'Transparent remote liaison for diaspora families with weekly video updates',
    'about.b3': 'Proven community commitment: co-founders of Drop of Water NGO (2M+ people served)',
    'about.cta': 'Read Our Full Story',

    // Testimonials
    'reviews.topper': 'Client Testimonials',
    'reviews.heading': 'Trusted by Homeowners in Khartoum & Abroad',

    // CTA
    'cta.title': 'Ready to Restore Your Home in Khartoum?',
    'cta.desc':
      'Whether you are in Sudan or living abroad, talk to our team today for a transparent assessment, damage review, and consultation.',
    'cta.btn': 'Schedule a Consultation',

    // Footer
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    'site.title': 'باكينام للمقاولات والهندسة',
    'site.tagline': 'نعيد بناء بيتك بأمان واطمئنان في الخرطوم',
    'site.description':
      'شريككم الموثوق لإعادة تأهيل وبناء وتأمين المنازل في الخرطوم. نخدم العائلات — في الداخل والخارج — بإدارة مشاريع تتسم بالشفافية الكاملة.',
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.reviews': 'آراء العملاء',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.contactBtn': 'تواصل معنا',
    'nav.call': 'اتصل الآن',
    'lang.switch': 'English',
    'lang.target': 'en',

    // Hero
    'hero.topper': 'إعادة تأهيل وبناء وتأمين المنازل في الخرطوم',
    'hero.heading': 'نعيد بناء بيتك بأمان واطمئنان في الخرطوم',
    'hero.cta': 'استشر فريقنا الهندسي',
    'hero.secondary': 'استعرض خدماتنا',

    // Services section
    'services.topper': 'مجالات اختصاصنا',
    'services.heading': 'خدمات متكاملة لإعادة تأهيل وبناء المنازل',
    'services.desc':
      'من المعالجات الإنشائية العاجلة إلى التشطيب النهائي وإدارة مشاريع المغتربين، نوفر لكم راحة البال التامة على أرض الواقع في الخرطوم.',
    'services.learnMore': 'طلب استفسار عن هذه الخدمة',
    'services.capabilities': 'أبرز بنود العمل:',

    // About section
    'about.topper': 'عن باكينام للمقاولات',
    'about.heading': 'نبني في الخرطوم منذ ٢٠١٦ - عيونكم وأيديكم الأمينة على الأرض',
    'about.p1':
      'انطلقت مسيرتنا بوضع حجر الأساس لبيتنا الأول في كافوري ٣ في سبتمبر ٢٠١٦. على مدار عقد كامل، نجحت المؤسسة باكينام عثمان رحمة — بدعم من زوجها الألماني كريستوف ليتزنرسكي — في بناء شبكة صلبة وموثوقة من الموردين، المهندسين المدنيين، والحرفيين المهرة.',
    'about.p2':
      'نجمع بين الخبرة العميقة بالواقع الميداني في السودان والمعايير الأوروبية في إدارة المشاريع، الشفافية المالية الصارمة، والتقارير الأسبوعية الموثقة بالفيديو خطوة بخطوة.',
    'about.b1': 'خبرة ميدانية وشبكة موردين معتمدة في كافوري والخرطوم منذ ٢٠١٦',
    'about.b2': 'خدمة مخصصة للمغتربين مع تقارير فيديو أسبوعية ومحاسبة مرحلية شفافة',
    'about.b3': 'مسؤولية مجتمعية راسخة: مشاركة في تأسيس منظمة قطرة ماء (سقيا أكثر من ٢ مليون مواطن)',
    'about.cta': 'اقرأ قصتنا كاملة',

    // Testimonials
    'reviews.topper': 'شهادات عملائنا',
    'reviews.heading': 'ثقة العائلات في الخرطوم والمغتربين في الخارج',

    // CTA
    'cta.title': 'هل ترغب في إعادة تأهيل وتجهيز بيتك في الخرطوم؟',
    'cta.desc':
      'سواء كنت داخل السودان أو مقيماً في الخارج، تواصل مع فريقنا اليوم لتقييم الأضرار، وحصر الأعمال، والبدء في استعادة بيتك بأمان.',
    'cta.btn': 'احجز استشارة مع فريقنا',

    // Footer
    'footer.company': 'روابط سريعة',
    'footer.support': 'المساعدة القانونية',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
} as const;
