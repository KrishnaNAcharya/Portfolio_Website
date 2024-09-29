import React from 'react';

const About = () => {
  return (
    <div name="about" className='w-full min-h-screen text-white bg-gradient-to-b from-gray-800 to-black'>
      <div className='max-w-screen-lg p-4 mx-auto py-20 justify-center w-full h-full'>
        <div className='pb-8'>
          <h2 className='text-4xl sm:text-7xl font-bold text-white'>Skills & Hobbies</h2>
        </div>
        <div className='flex flex-col md:flex-row gap-8 mt-10 leading-relaxed'>
          {/* Programming Languages Card */}
          <div className='relative p-6 bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
            <h3 className='text-2xl font-semibold mb-4'>Programming Languages:</h3>
            <ul className='list-disc ml-6'>
              <li>Java</li>
              <li>C</li>
              <li>C++</li>
              <li>Python</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <div className="absolute inset-0 border border-transparent rounded-lg animate-border1"></div>
          </div>

          {/* Frameworks & Libraries Card */}
          <div className='relative p-6 bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
            <h3 className='text-2xl font-semibold mb-4'>Frameworks & Libraries:</h3>
            <ul className='list-disc ml-6'>
              <li>React</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>Tailwind CSS</li>
            </ul>
            <div className="absolute inset-0 border border-transparent rounded-lg animate-border2"></div>
          </div>

          {/* Tools & Platforms Card */}
          <div className='relative p-6 bg-gray-900 rounded-lg shadow-lg overflow-hidden'>
            <h3 className='text-2xl font-semibold mb-4'>Tools & Platforms:</h3>
            <ul className='list-disc ml-6'>
              <li>Figma</li>
              <li>Firebase</li>
              <li>Git</li>
              <li>MySQL</li>
            </ul>
            <div className="absolute inset-0 border border-transparent rounded-lg animate-border3"></div>
          </div>
        </div>

        {/* Current Focus Section */}
        <h3 className='text-2xl font-semibold mt-8 mb-4'>Current Focus:</h3>
        <p>
          I am currently sharpening my skills in Data Structures and Algorithms (DSA) to improve my problem-solving abilities. 
          Additionally, I am eager to learn Spring Boot, PostgreSQL, and Next.js in the near future.
        </p>

        {/* Other Interests Section */}
        <h3 className='text-2xl font-semibold mt-8 mb-4'>Other Interests:</h3>
        <p>
          I have a foundational understanding of Machine Learning (ML) and Large Language Models (LLMs), which further fuels my passion for exploring cutting-edge technology solutions.
        </p>

        {/* Hobbies Section */}
        <h3 className='text-2xl font-semibold mt-8 mb-4'>Hobbies:</h3>
        <p>
          I enjoy listening to music, playing video games, and exploring anything related to tech. Additionally, I love spending time with cats and dogs, photography, and cooking.
        </p>
      </div>
    </div>
  );
}

export default About;
