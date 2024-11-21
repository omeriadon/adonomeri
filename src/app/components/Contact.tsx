'use client';

export default function Contact() {
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'omeriadon@outlook.com',
      description: 'Email me for any inquiries',
      link: 'mailto:omeriadon@outlook.com'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      value: '@AdonOmeri',
      description: 'DM me for quick responses',
      link: 'https://twitter.com/AdonOmeri'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'omeriadon',
      description: 'Check out my open source work',
      link: 'https://github.com/omeriadon'
    }
  ];

  return (
    <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose your preferred way to get in touch. I typically respond within 24 hours.
        </p>

        <div className="space-y-4">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.link}
              className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 
                        hover:bg-gray-700/50 transition-all duration-300 
                        hover:scale-[1.02] hover:border-gray-500"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  <p className="text-gray-400">{method.value}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
} 