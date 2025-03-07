// MarkdownConfig.tsx
import markdownit from "markdown-it";

export const MarkdownConfig = {
  md: markdownit({ linkify: true, typographer: true }),
  
  defaultMarkdown: `# Anas Saif
**Full Stack Developer**  
[youremail@email.com](mailto:youremail@email.com) | [linkedin.com/in/username](https://linkedin.com/in/username)

---

## Professional Summary
Dynamic Software Engineer with over 6 years of experience in designing and deploying scalable web and mobile applications. Skilled in full-stack development, cloud infrastructure, and agile project management. Committed to delivering high-quality solutions, optimizing performance, and mentoring teams to foster innovation.

## Work Experience
### Senior Software Engineer  
**TechNova Solutions, Bangalore, India**  
*June 2020 – Present*  
- Architected a microservices-based platform, boosting system scalability by 60% and reducing latency by 40%.  
- Led a 5-member team to launch a React-Native mobile app, driving a 40% increase in user engagement.  
- Implemented CI/CD pipelines using Jenkins, slashing deployment cycles by 50%.  

### Software Engineer  
**CloudSync Pvt. Ltd., Hyderabad, India**  
*August 2018 – May 2020*  
- Developed high-performance RESTful APIs with Node.js, improving response times by 35%.  
- Spearheaded an AWS cloud migration, cutting operational costs by 20%.  
- Automated testing with Jest, achieving 85% test coverage across critical modules.  

### Junior Developer  
**InnoTech, Pune, India**  
*July 2016 – July 2018*  
- Built responsive web applications using HTML, CSS, and JavaScript, supporting 10K+ users.  
- Integrated Razorpay payment gateways, increasing transaction success by 15%.  
- Optimized legacy codebases, reducing load times by 25%.  

## Skills
- **Languages**: JavaScript, Python, Java  
- **Frameworks**: React, Node.js, Django  
- **Tools**: AWS, Docker, Kubernetes, Git, Jenkins  
- **Methodologies**: Agile, DevOps, Team Leadership  

## Education
- **Master of Technology (M.Tech) in Computer Science**  
  Indian Institute of Technology (IIT) Delhi, New Delhi, India  
  *2014 – 2016 | GPA: 8.9/10*

- **Bachelor of Technology (B.Tech) in Information Technology**  
  National Institute of Technology (NIT) Warangal, Warangal, India  
  *2010 – 2014 | GPA: 8.5/10*

## Certifications
- **AWS Certified Solutions Architect – Associate** (2021)  
- **Certified Kubernetes Administrator (CKA)** (2022)  
- **Google Professional Cloud Developer** (2023)  

## Projects
- **TaskMaster**: Open-source task management tool built with React and Firebase, adopted by 5K+ users ([github.com/anas-saif/taskmaster](https://github.com/anas-saif/taskmaster)).  
- **E-Shop**: Scalable e-commerce platform with Node.js and MongoDB, processing 50K+ transactions monthly ([eshop-demo.com](https://eshop-demo.com)).  

---
`,
};