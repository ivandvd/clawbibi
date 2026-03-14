export type Locale = "en" | "ar";

type T = { en: string; ar: string };

export const translations = {
  // ── Header ──
  header: {
    howItWorks: { en: "How it works", ar: "كيف يعمل" } as T,
    features: { en: "Features", ar: "المميزات" } as T,
    faq: { en: "FAQ", ar: "الأسئلة الشائعة" } as T,
    login: { en: "Log in", ar: "تسجيل الدخول" } as T,
    getStarted: { en: "Get Started", ar: "ابدأ الآن" } as T,
  },

  // ── Hero ──
  hero: {
    subtitle: {
      en: "Your Arab-native AI assistant that never sleeps. It lives in the cloud, speaks your language, and manages your tasks, reminders, and daily life — straight from WhatsApp, Telegram, or any messenger you already use.",
      ar: "مساعدك الذكي العربي اللي ما ينام. يعيش في السحابة، يتكلم لغتك، ويدير مهامك وتذكيراتك وحياتك اليومية — مباشرة من واتساب أو تيليجرام أو أي تطبيق محادثة تستخدمه.",
    } as T,
    cta: { en: "Launch Your Assistant", ar: "أطلق مساعدك" } as T,
    availableOn: { en: "Available on", ar: "متوفر على" } as T,
    poweredBy: { en: "Powered by", ar: "مدعوم بـ" } as T,
  },

  // ── How It Works ──
  howItWorks: {
    sectionLabel: { en: "How it works", ar: "كيف يعمل" } as T,
    sectionTitle: { en: "Three steps to your personal AI.", ar: "ثلاث خطوات لمساعدك الشخصي." } as T,

    // Card 1
    card1Step: { en: "01", ar: "٠١" } as T,
    card1Title: { en: "Connect your messenger", ar: "اربط تطبيق المحادثة" } as T,
    card1Desc: {
      en: "Link WhatsApp, Telegram, Discord, and your other platforms. Clawbibi connects to where you already chat.",
      ar: "اربط واتساب وتيليجرام وديسكورد ومنصاتك الثانية. Clawbibi يتصل بالمكان اللي تتكلم فيه.",
    } as T,
    card1Footer: { en: "Setup in under 3 minutes", ar: "الإعداد بأقل من ٣ دقائق" } as T,
    messengers: { en: "Messengers", ar: "المنصات" } as T,
    connected: { en: "Connected", ar: "متصل" } as T,
    connecting: { en: "Connecting...", ar: "جاري الاتصال..." } as T,
    pending: { en: "Pending", ar: "قيد الانتظار" } as T,

    // Card 2
    card2Step: { en: "02", ar: "٠٢" } as T,
    card2Title: { en: "Customize & learn", ar: "خصّص وتعلّم" } as T,
    card2Desc: {
      en: "It learns your preferences, timezone, and habits — then you add skills to make it even more powerful.",
      ar: "يتعلم تفضيلاتك ومنطقتك الزمنية وعاداتك — وبعدين تضيف مهارات تخليه أقوى.",
    } as T,
    card2Footer: { en: "Personalized from day one", ar: "مخصص من أول يوم" } as T,
    learningContext: { en: "Learning your context", ar: "يتعلم سياقك" } as T,
    activeSkills: { en: "Active Skills", ar: "المهارات النشطة" } as T,
    contextLang: { en: "Preferred language: Arabic + English", ar: "اللغة المفضلة: عربي + إنجليزي" } as T,
    contextLocation: { en: "Location: Dubai, UAE", ar: "الموقع: دبي، الإمارات" } as T,
    contextTimezone: { en: "Timezone: GST (UTC+4)", ar: "التوقيت: GST (UTC+4)" } as T,
    contextReminder: { en: "Reminder style: Casual Gulf Arabic", ar: "أسلوب التذكير: عربي خليجي" } as T,
    skillPrayer: { en: "Prayer Times", ar: "أوقات الصلاة" } as T,
    skillCurrency: { en: "Currency", ar: "العملات" } as T,
    skillCalendar: { en: "Calendar", ar: "التقويم" } as T,
    skillSearch: { en: "Web Search", ar: "البحث" } as T,

    // Card 3
    card3Step: { en: "03", ar: "٠٣" } as T,
    card3Title: { en: "It starts working", ar: "يبدأ يشتغل" } as T,
    card3Desc: {
      en: "Assign tasks or just chat — it executes, reports back, and keeps going every single day.",
      ar: "كلّفه بمهام أو سولف معاه — ينفذ ويرد عليك ويستمر كل يوم.",
    } as T,
    card3Footer: { en: "24/7 autonomous output", ar: "يشتغل ٢٤/٧ بدون توقف" } as T,
    online: { en: "Online", ar: "متصل" } as T,
    greeting: {
      en: "Hi, I'm Clawbibi, your personal AI assistant.",
      ar: "أهلاً، أنا Clawbibi، مساعدك الشخصي الذكي.",
    } as T,
    card3FullText: {
      en: "Meeting with Ahmed booked for 2pm. Reminder set for 1:30pm. I also found 3 restaurants near the office for lunch.",
      ar: "اجتماع مع أحمد محجوز الساعة ٢. تذكير مضبوط الساعة ١:٣٠. ولقيت لك ٣ مطاعم قريبة من المكتب للغداء.",
    } as T,
    showRestaurants: { en: "Show restaurants", ar: "عرض المطاعم" } as T,
    viewCalendar: { en: "View calendar", ar: "عرض التقويم" } as T,
    justNow: { en: "Just now", ar: "الحين" } as T,
    typeMessage: { en: "Type a message...", ar: "اكتب رسالة..." } as T,
  },

  // ── Chat Demo ──
  chatDemo: {
    sectionLabel: { en: "See it in action", ar: "شوفه وهو يشتغل" } as T,
    sectionTitle: { en: "One assistant, ", ar: "مساعد واحد، " } as T,
    sectionTitleHighlight: { en: "endless abilities", ar: "قدرات بلا حدود" } as T,
    online: { en: "Online", ar: "متصل" } as T,
    encrypted: { en: "Encrypted", ar: "مشفّر" } as T,
    typeMessage: { en: "Type a message...", ar: "اكتب رسالة..." } as T,

    // Tab labels
    tabDailyTasks: { en: "Daily Tasks", ar: "المهام اليومية" } as T,
    tabResearch: { en: "Research", ar: "البحث" } as T,
    tabScheduling: { en: "Scheduling", ar: "الجدولة" } as T,
    tabSmartReminders: { en: "Smart Reminders", ar: "التذكيرات الذكية" } as T,

    // Tab 1: Daily Tasks
    tab1User: {
      en: "Cancel my Equinox gym subscription and find a cheaper gym near Dubai Marina",
      ar: "ألغي اشتراكي في نادي Equinox ولقّني نادي أرخص قريب من دبي مارينا",
    } as T,
    tab1Action1: { en: "Cancelling Equinox subscription...", ar: "جاري إلغاء اشتراك Equinox..." } as T,
    tab1Action2: { en: "Searching gyms near Dubai Marina...", ar: "جاري البحث عن نوادي قريبة من دبي مارينا..." } as T,
    tab1Bot: {
      en: "Done! I've drafted a cancellation email for Equinox. Here are 3 gyms near Dubai Marina:",
      ar: "تم! جهّزت لك إيميل إلغاء لـ Equinox. هذي ٣ نوادي قريبة من دبي مارينا:",
    } as T,
    tab1ViewMap: { en: "View on Map", ar: "عرض على الخريطة" } as T,
    tab1SendCancel: { en: "Send Cancellation", ar: "إرسال الإلغاء" } as T,

    // Tab 2: Research — user message stays Arabic in both locales
    tab2Action1: { en: "Searching the web...", ar: "جاري البحث في الإنترنت..." } as T,
    tab2Action2: { en: "Ranking by reviews and ratings...", ar: "جاري الترتيب حسب التقييمات..." } as T,
    tab2Bot: {
      en: "Here are the top 5 Japanese restaurants in Riyadh:",
      ar: "هذي أفضل ٥ مطاعم يابانية في الرياض:",
    } as T,

    // Tab 3: Scheduling
    tab3User: {
      en: "Book a meeting with Ahmed tomorrow at 2pm and remind me 30 min before",
      ar: "احجز لي اجتماع مع أحمد بكرة الساعة ٢ وذكّرني قبلها بنص ساعة",
    } as T,
    tab3Action1: { en: "Accessing calendar_api...", ar: "جاري الوصول لـ calendar_api..." } as T,
    tab3Action2: { en: "Setting reminder...", ar: "جاري ضبط التذكير..." } as T,
    tab3Bot: { en: "Meeting booked and reminder set!", ar: "الاجتماع محجوز والتذكير مضبوط!" } as T,
    tab3MeetingTitle: { en: "Meeting with Ahmed", ar: "اجتماع مع أحمد" } as T,
    tab3GoogleCal: { en: "Google Calendar", ar: "تقويم Google" } as T,
    tab3Tomorrow: { en: "Tomorrow", ar: "بكرة" } as T,
    tab3Time: { en: "2:00 PM — 3:00 PM", ar: "٢:٠٠ م — ٣:٠٠ م" } as T,
    tab3Reminder: { en: "Reminder at 1:30 PM", ar: "تذكير الساعة ١:٣٠ م" } as T,
    tab3JoinMeeting: { en: "Join Meeting", ar: "انضم للاجتماع" } as T,
    tab3Reschedule: { en: "Reschedule", ar: "إعادة جدولة" } as T,

    // Tab 4: Smart Reminders — user message stays Arabic in both locales
    tab4Action: { en: "Creating recurring task...", ar: "جاري إنشاء مهمة متكررة..." } as T,
    tab4Bot: { en: "Recurring reminder created!", ar: "التذكير المتكرر جاهز!" } as T,
    tab4Title: { en: "Electricity Bill Payment", ar: "دفع فاتورة الكهرباء" } as T,
    tab4Service: { en: "DEWA — Monthly recurring", ar: "ديوا — متكرر شهرياً" } as T,
    tab4Schedule: { en: "1st of every month", ar: "أول كل شهر" } as T,
    tab4Time: { en: "9:00 AM", ar: "٩:٠٠ ص" } as T,
    tab4Active: { en: "Active", ar: "نشط" } as T,
    tab4Edit: { en: "Edit", ar: "تعديل" } as T,
    tab4Pause: { en: "Pause", ar: "إيقاف" } as T,
  },

  // ── Features Section ──
  features: {
    sectionLabel: { en: "Features", ar: "المميزات" } as T,
    sectionTitle: { en: "Everything your assistant ", ar: "كل شيء مساعدك " } as T,
    sectionTitleHighlight: { en: "can do.", ar: "يقدر يسويه." } as T,
    sectionSubtitle: { en: "Built for the Gulf. Powered by AI.", ar: "مصنوع للخليج. مدعوم بالذكاء الاصطناعي." } as T,

    // Card 1: Any Messenger
    anyMessengerTitle: { en: "Any Messenger", ar: "أي تطبيق محادثة" } as T,
    anyMessengerSub: { en: "Talk to your assistant wherever you already chat.", ar: "تكلم مع مساعدك بأي مكان تتكلم فيه." } as T,
    allPlatformsLinked: { en: "All platforms linked", ar: "كل المنصات متصلة" } as T,

    // Card 2: Privacy First
    privacyTitle: { en: "Privacy First", ar: "الخصوصية أولاً" } as T,
    privacySub: {
      en: "Your data stays private. We don't log your conversations. Your assistant, your business.",
      ar: "بياناتك تبقى خاصة. ما نسجل محادثاتك. مساعدك، شغلك.",
    } as T,
    privacyLogging: { en: "Conversation logging", ar: "تسجيل المحادثات" } as T,
    privacyLoggingVal: { en: "OFF", ar: "متوقف" } as T,
    privacySharing: { en: "Data sharing", ar: "مشاركة البيانات" } as T,
    privacySharingVal: { en: "DISABLED", ar: "معطّل" } as T,
    privacyEncryption: { en: "Encryption", ar: "التشفير" } as T,
    privacyEncryptionVal: { en: "AES-256", ar: "AES-256" } as T,
    privacyMessage: {
      en: "Your conversations are encrypted and never stored.",
      ar: "محادثاتك مشفّرة وما يتم تخزينها أبداً.",
    } as T,

    // Card 3: Persistent Memory
    memoryTitle: { en: "Persistent Memory", ar: "ذاكرة دائمة" } as T,
    memorySub: { en: "Learns your preferences, habits, and context over time.", ar: "يتعلم تفضيلاتك وعاداتك وسياقك مع الوقت." } as T,
    memoryLabel: { en: "Memory", ar: "الذاكرة" } as T,
    memoryItem1: { en: "Prefers meetings after 2pm", ar: "يفضل الاجتماعات بعد ٢ الظهر" } as T,
    memoryItem2: { en: "Language: Arabic & English", ar: "اللغة: عربي وإنجليزي" } as T,
    memoryItem3: { en: "Lives in Dubai Marina", ar: "يسكن في دبي مارينا" } as T,
    memoryItem4: { en: "Allergic to shellfish", ar: "عنده حساسية من المأكولات البحرية" } as T,

    // Card 4: System Access
    systemTitle: { en: "System Access", ar: "وصول للأنظمة" } as T,
    systemSub: { en: "Full access to your tools, files, and APIs. Like having a developer on call.", ar: "وصول كامل لأدواتك وملفاتك وواجهاتك. مثل ما عندك مطوّر تحت الطلب." } as T,
    systemAction1: { en: "Reading bank_transactions...", ar: "جاري قراءة bank_transactions..." } as T,
    systemAction2: { en: "Analyzing spending patterns...", ar: "جاري تحليل أنماط الإنفاق..." } as T,
    systemTopCategories: { en: "Top Categories", ar: "أعلى الفئات" } as T,
    systemViewReport: { en: "View Report", ar: "عرض التقرير" } as T,
    systemDining: { en: "Dining", ar: "مطاعم" } as T,
    systemTransport: { en: "Transport", ar: "مواصلات" } as T,
    systemSubscriptions: { en: "Subscriptions", ar: "اشتراكات" } as T,
    systemSendReport: { en: "Send Report", ar: "إرسال التقرير" } as T,
    systemDetails: { en: "Details", ar: "التفاصيل" } as T,

    // Card 5: Custom Skills
    skillsTitle: { en: "Custom Skills", ar: "مهارات مخصصة" } as T,
    skillsSub: { en: "Add skills from the dashboard. Teach your assistant new powers.", ar: "أضف مهارات من لوحة التحكم. علّم مساعدك قدرات جديدة." } as T,
    skillsLabel: { en: "Active Skills", ar: "المهارات النشطة" } as T,
    skillPrayerTimes: { en: "Prayer Times", ar: "أوقات الصلاة" } as T,
    skillPrayerDesc: { en: "Athan alerts for your city", ar: "تنبيهات الأذان لمدينتك" } as T,
    skillCurrencyConvert: { en: "Currency Convert", ar: "تحويل العملات" } as T,
    skillCurrencyDesc: { en: "Live AED/SAR/USD rates", ar: "أسعار درهم/ريال/دولار مباشرة" } as T,
    skillTravelPlanner: { en: "Travel Planner", ar: "مخطط السفر" } as T,
    skillTravelDesc: { en: "Flights, hotels, itineraries", ar: "طيران وفنادق وبرامج رحلات" } as T,
    skillExpenseTracker: { en: "Expense Tracker", ar: "تتبع المصاريف" } as T,
    skillExpenseDesc: { en: "Monthly spending reports", ar: "تقارير الإنفاق الشهرية" } as T,
    skillAddNew: { en: "Add new skill...", ar: "أضف مهارة جديدة..." } as T,

    // Card 6: Web Search
    webSearchTitle: { en: "Web Search", ar: "البحث في الإنترنت" } as T,
    webSearchSub: { en: "Your assistant browses the web for you. Ask anything in any language.", ar: "مساعدك يتصفح الإنترنت لك. اسأل أي شيء بأي لغة." } as T,
    webSearchAction: { en: "Searching the web...", ar: "جاري البحث في الإنترنت..." } as T,
  },

  // ── Capabilities ──
  capabilities: {
    sectionLabel: { en: "Capabilities", ar: "القدرات" } as T,
    sectionTitle: { en: "What can Clawbibi ", ar: "شنو يقدر Clawbibi " } as T,
    sectionTitleHighlight: { en: "do for you?", ar: "يسوي لك؟" } as T,
    sectionSubtitle: { en: "One assistant, thousands of use cases", ar: "مساعد واحد، آلاف الاستخدامات" } as T,

    // Row 1
    translate: { en: "Translate messages in real time", ar: "ترجم الرسائل بالوقت الفعلي" } as T,
    inbox: { en: "Organize your inbox", ar: "نظّم بريدك الإلكتروني" } as T,
    support: { en: "Answer support tickets", ar: "رد على تذاكر الدعم" } as T,
    summarize: { en: "Summarize long documents", ar: "لخّص المستندات الطويلة" } as T,
    reports: { en: "Generate weekly reports", ar: "أنشئ تقارير أسبوعية" } as T,
    research: { en: "Research any topic deeply", ar: "ابحث في أي موضوع بعمق" } as T,
    draft: { en: "Draft emails and messages", ar: "صيغ إيميلات ورسائل" } as T,
    calendar: { en: "Smart calendar management", ar: "إدارة التقويم الذكية" } as T,

    // Row 2
    expenses: { en: "Track expenses and receipts", ar: "تتبع المصاريف والفواتير" } as T,
    insurance: { en: "Compare insurance quotes", ar: "قارن عروض التأمين" } as T,
    subscriptions: { en: "Manage subscriptions", ar: "أدِر الاشتراكات" } as T,
    prayer: { en: "Prayer time reminders", ar: "تذكيرات أوقات الصلاة" } as T,
    currency: { en: "Currency conversion", ar: "تحويل العملات" } as T,
    todo: { en: "Create to-do lists", ar: "أنشئ قوائم مهام" } as T,
    homework: { en: "Help with homework", ar: "ساعد في الواجبات" } as T,
    clinics: { en: "Find nearby clinics", ar: "لقّ عيادات قريبة" } as T,

    // Row 3
    discounts: { en: "Find discount codes", ar: "لقّ أكواد خصم" } as T,
    priceDrop: { en: "Price-drop alerts", ar: "تنبيهات انخفاض الأسعار" } as T,
    compare: { en: "Compare product specs", ar: "قارن مواصفات المنتجات" } as T,
    negotiate: { en: "Negotiate deals", ar: "فاوض على الصفقات" } as T,
    grocery: { en: "Grocery list builder", ar: "بناء قائمة المقاضي" } as T,
    rate: { en: "Rate and review places", ar: "قيّم وراجع الأماكن" } as T,
    gifts: { en: "Gift recommendations", ar: "اقتراحات هدايا" } as T,
    stores: { en: "Local store finder", ar: "لقّ محلات قريبة" } as T,

    // Row 4
    travel: { en: "Book travel and hotels", ar: "احجز سفر وفنادق" } as T,
    recipes: { en: "Find recipes from ingredients", ar: "لقّ وصفات من المكونات" } as T,
    presentations: { en: "Create presentations", ar: "أنشئ عروض تقديمية" } as T,
    rides: { en: "Compare ride prices", ar: "قارن أسعار التوصيل" } as T,
    workout: { en: "Workout plans", ar: "برامج تمارين رياضية" } as T,
    news: { en: "Daily news briefing", ar: "ملخص الأخبار اليومي" } as T,
    movies: { en: "Movie recommendations", ar: "اقتراحات أفلام" } as T,
    itineraries: { en: "Trip itineraries", ar: "برامج رحلات" } as T,

    // Row 5
    goals: { en: "Set and track goals", ar: "حدد وتابع أهدافك" } as T,
    outreach: { en: "Screen cold outreach", ar: "فلتر الرسائل الباردة" } as T,
    jobDescs: { en: "Draft job descriptions", ar: "صيغ وصف وظيفي" } as T,
    standup: { en: "Run standup summaries", ar: "ملخصات الاجتماعات اليومية" } as T,
    home: { en: "Home maintenance reminders", ar: "تذكيرات صيانة المنزل" } as T,
    parenting: { en: "Parenting tips", ar: "نصائح تربوية" } as T,
    design: { en: "Design inspiration", ar: "إلهام التصميم" } as T,
    packages: { en: "Track packages", ar: "تتبع الشحنات" } as T,
  },

  // ── FAQ ──
  faq: {
    sectionLabel: { en: "FAQ", ar: "الأسئلة الشائعة" } as T,
    sectionTitle: { en: "Got questions? ", ar: "عندك أسئلة؟ " } as T,
    sectionTitleHighlight: { en: "We got answers.", ar: "عندنا أجوبة." } as T,

    q1: { en: "What exactly is Clawbibi?", ar: "شنو بالضبط Clawbibi؟" } as T,
    a1: {
      en: "Clawbibi is an Arabic-native personal AI assistant that lives in the cloud. It connects to your favorite messengers — WhatsApp, Telegram, Discord — and handles your daily tasks, reminders, research, and more. Built for the Gulf region, it understands Arabic (Gulf dialect), English, and your local context like prayer times, currency, and timezone.",
      ar: "Clawbibi مساعد ذكي شخصي عربي يعيش في السحابة. يتصل بتطبيقات المحادثة المفضلة عندك — واتساب وتيليجرام وديسكورد — ويدير مهامك اليومية وتذكيراتك وأبحاثك وأكثر. مصمم لمنطقة الخليج، يفهم العربي (اللهجة الخليجية) والإنجليزي وسياقك المحلي مثل أوقات الصلاة والعملة والتوقيت.",
    } as T,

    q2: { en: "What can my assistant do?", ar: "شنو يقدر مساعدي يسوي؟" } as T,
    a2: {
      en: "Almost anything you can think of — schedule meetings, set reminders, research topics, translate messages, track expenses, search the web, manage your calendar, draft emails, find restaurants, compare prices, and much more. You can also add custom skills to teach it new abilities specific to your workflow.",
      ar: "تقريباً أي شيء تتخيله — يحجز اجتماعات، يضبط تذكيرات، يبحث في المواضيع، يترجم رسائل، يتابع المصاريف، يبحث في الإنترنت، يدير تقويمك، يصيغ إيميلات، يلقى مطاعم، يقارن أسعار، وأكثر بعد. وتقدر تضيف مهارات مخصصة تعلمه قدرات جديدة تناسب شغلك.",
    } as T,

    q3: { en: "Is my data private?", ar: "هل بياناتي خاصة؟" } as T,
    a3: {
      en: "Absolutely. We don't log your conversations, we don't share your data with third parties, and all communication is encrypted with AES-256. Your assistant is yours alone — everything stays between you and Clawbibi. You're always in full control of your data.",
      ar: "أكيد. ما نسجل محادثاتك، ما نشارك بياناتك مع أي طرف ثالث، وكل الاتصالات مشفّرة بـ AES-256. مساعدك لك لحالك — كل شيء يبقى بينك وبين Clawbibi. دايماً أنت المتحكم ببياناتك.",
    } as T,

    q4: {
      en: "What's the difference between Clawbibi and OpenClaw?",
      ar: "شنو الفرق بين Clawbibi و OpenClaw؟",
    } as T,
    a4: {
      en: "OpenClaw is the open-source AI assistant software that powers everything under the hood. Clawbibi is a managed service that hosts OpenClaw for you in the cloud — so you don't need to set up your own server, manage infrastructure, or deal with any technical setup. Just connect your messenger and start chatting.",
      ar: "OpenClaw هو البرنامج مفتوح المصدر اللي يشغّل كل شيء من ورا الكواليس. Clawbibi خدمة مُدارة تستضيف OpenClaw لك في السحابة — يعني ما تحتاج تجهز سيرفرك، ولا تدير البنية التحتية، ولا تتعامل مع أي إعداد تقني. بس اربط المحادثة وابدأ تكلم.",
    } as T,

    q5: { en: "Which languages does it support?", ar: "أي لغات يدعمها؟" } as T,
    a5: {
      en: "Clawbibi natively supports Arabic (Gulf dialect — Emirati, Saudi, Kuwaiti) and English. You can chat in either language, mix both, or even send messages in other languages. It adapts to how you naturally communicate.",
      ar: "Clawbibi يدعم العربي أصلاً (اللهجة الخليجية — إماراتي، سعودي، كويتي) والإنجليزي. تقدر تتكلم بأي لغة، تخلط بينهم، أو حتى ترسل رسائل بلغات ثانية. يتأقلم مع طريقتك الطبيعية في التواصل.",
    } as T,
  },

  // ── CTA ──
  cta: {
    title: { en: "Ready to launch your ", ar: "مستعد تطلق مساعدك " } as T,
    titleBrand: { en: "Clawbibi", ar: "Clawbibi" } as T,
    titleEnd: { en: " assistant?", ar: "؟" } as T,
    subtitle: {
      en: "Zero setup — OpenClaw Agent pre-installed. Sign up, connect your messenger, done.",
      ar: "بدون أي إعداد — وكيل OpenClaw مثبّت مسبقاً. سجّل، اربط المحادثة، وخلاص.",
    } as T,
    button: { en: "Meet Your Assistant", ar: "تعرّف على مساعدك" } as T,
  },

  // ── Footer ──
  footer: {
    description: {
      en: "Clawbibi is your Arab-native personal AI assistant, always running in the cloud. It connects to your messengers, remembers your preferences, and handles everyday tasks on your behalf — privately and effortlessly.",
      ar: "Clawbibi مساعدك الشخصي الذكي العربي، يشتغل دائماً في السحابة. يتصل بمحادثاتك، يتذكر تفضيلاتك، ويدير مهامك اليومية بالنيابة عنك — بخصوصية وبدون أي جهد.",
    } as T,
    privacy: { en: "Privacy", ar: "الخصوصية" } as T,
    terms: { en: "Terms", ar: "الشروط" } as T,
    copyright: { en: "\u00A9 2026 Clawbibi", ar: "\u00A9 ٢٠٢٦ Clawbibi" } as T,
  },
} as const;
