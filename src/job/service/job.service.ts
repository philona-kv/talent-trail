import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Job from '../entity/job.entity'; // Update the import path
import { Repository } from 'typeorm';
import {
  JobCreateInput, // Update the input type
  JobUpdateInput, // Update the input type
} from '../../schema/graphql.schema';
import { JobNotFoundException } from '../exception/job.exception'; // Update the exception class
import { CommonUtil } from '../../common/util/common.util';
import * as Chance from 'chance'
import * as _ from 'lodash'

const chance = new Chance();
@Injectable()
export class JobService {


  generateRandomJobDescriptions(job:string){
    const descriptions = {
      'Software Engineer':`As a Software Engineer at [Your Company Name], you will play a crucial role in the development and enhancement of our software products. You'll work closely with our cross-functional teams to design, develop, test, and deploy software solutions that meet the needs of our clients. This role offers an exciting opportunity to contribute to the entire software development lifecycle.

      Responsibilities:
      
      Collaborate with product managers and stakeholders to define software requirements.
      Design and implement software features and components.
      Write clean, maintainable, and efficient code.
      Debug and resolve software defects and issues.
      Perform code reviews to ensure code quality and adherence to best practices.
      Optimize software for performance and scalability.
      Stay up-to-date with emerging technologies and industry trends.
      Mentor junior developers and provide technical guidance.
      Qualifications:
      
      Bachelor's degree in Computer Science or related field (Master's preferred).
      Proven experience in software development.
      Proficiency in one or more programming languages (e.g., Java, Python, C++).
      Strong problem-solving and analytical skills.
      Familiarity with software development methodologies and tools.
      Excellent communication and teamwork skills.
      Ability to work in a fast-paced, collaborative environment.
      Experience with [specific technologies or frameworks] is a plus.
      Benefits:
      
      Competitive salary and benefits package.
      Opportunities for professional growth and development.
      Friendly and collaborative work environment.
      [Other benefits your company offers].`,
      'Data Analyst':`As a Data Analyst at [Your Company Name], you will be responsible for collecting, interpreting, and analyzing data to provide valuable insights to our clients and internal teams. You will work with a wide range of data sources and use data visualization tools to communicate your findings effectively.

      Responsibilities:
      
      Collaborate with stakeholders to define data analysis requirements.
      Extract, clean, and transform data from various sources.
      Perform statistical analysis and create data models.
      Develop data dashboards and reports for data visualization.
      Identify trends, patterns, and outliers in the data.
      Provide actionable insights and recommendations based on data analysis.
      Communicate findings to both technical and non-technical audiences.
      Continuously monitor data quality and integrity.
      Stay updated on data analysis techniques and tools.
      Qualifications:
      
      Bachelor's degree in a quantitative field (e.g., Statistics, Data Science, Computer Science).
      Proven experience in data analysis or related roles.
      Proficiency in data analysis tools (e.g., Excel, SQL, Python, R).
      Strong analytical and problem-solving skills.
      Experience with data visualization tools (e.g., Tableau, Power BI).
      Knowledge of statistical analysis and modeling techniques.
      Excellent communication and presentation skills.
      Attention to detail and the ability to work independently.
      Benefits:
      
      Competitive compensation package.
      Opportunities for professional development and training.
      Collaborative and inclusive work environment.`,
      'UI Designer':`As a UI Designer at [Your Company Name], you will be responsible for translating user needs and business goals into visually appealing and user-friendly interfaces. You'll collaborate closely with UX designers, developers, and stakeholders to create designs that elevate our products.

      Responsibilities:
      
      Collaborate with UX designers to understand user requirements.
      Create wireframes, prototypes, and mockups for web and mobile interfaces.
      Design and iterate on user interface layouts and elements.
      Ensure consistency in design across all digital platforms.
      Conduct usability testing and gather user feedback.
      Stay updated on design trends and best practices.
      Work closely with developers to implement designs.
      Participate in design reviews and provide constructive feedback.
      Qualifications:
      
      Bachelor's degree in Design, HCI, or a related field.
      Proven experience in UI/UX design for web and mobile applications.
      Proficiency in design software (e.g., Adobe XD, Sketch, Figma).
      Strong understanding of user-centered design principles.
      Excellent visual design skills and attention to detail.
      Knowledge of HTML, CSS, and responsive design principles is a plus.
      Effective communication and teamwork skills.
      Ability to work in a collaborative and fast-paced environment.
      Benefits:
      
      Competitive salary and benefits package.
      Opportunities for career growth and skill development.
      Creative and inclusive work culture.`,
      'Product Manager':`As a Product Manager at [Your Company Name], you will take ownership of the entire product lifecycle, from defining the product vision to driving its execution. You'll work closely with cross-functional teams to ensure that our products meet customer needs and achieve business objectives.

      Responsibilities:
      
      Define and communicate the product vision, strategy, and roadmap.
      Gather and prioritize product requirements based on customer feedback and market analysis.
      Collaborate with engineering, design, and marketing teams to deliver high-quality products.
      Develop and maintain a product backlog and user stories.
      Track product performance and make data-driven decisions.
      Lead product launches and go-to-market strategies.
      Build and maintain relationships with stakeholders and customers.
      Continuously monitor the competitive landscape and industry trends.
      Qualifications:
      
      Bachelor's degree in Business, Engineering, or related field (MBA preferred).
      Proven experience in product management.
      Strong analytical and strategic thinking skills.
      Excellent communication and leadership abilities.
      Ability to influence cross-functional teams and drive results.
      Experience with agile and product management tools.
      Customer-centric mindset and passion for delivering value.
      Adaptability and willingness to take ownership.
      Benefits:
      
      Competitive compensation and benefits package.
      Professional development and training opportunities.
      Collaborative and innovative work environment.`,
      'DevOps Engineer':`As a DevOps Engineer at [Your Company Name], you will play a pivotal role in automating deployment processes, managing infrastructure, and optimizing system performance. You'll work closely with development and operations teams to ensure seamless software delivery.

      Responsibilities:
      
      Implement and manage CI/CD pipelines for software deployment.
      Automate configuration management and infrastructure provisioning.
      Monitor and maintain system stability and performance.
      Troubleshoot and resolve infrastructure and deployment issues.
      Collaborate with development teams to optimize application performance.
      Ensure security and compliance in infrastructure configurations.
      Evaluate and implement DevOps tools and technologies.
      Provide on-call support as needed for critical incidents.
      Qualifications:
      
      Bachelor's degree in Computer Science or related field.
      Proven experience in DevOps or related roles.
      Proficiency in DevOps tools (e.g., Docker, Kubernetes, Jenkins).
      Strong scripting and automation skills (e.g., Shell, Python).
      Experience with cloud platforms (e.g., AWS, Azure, GCP).
      Knowledge of infrastructure as code (e.g., Terraform, Ansible).
      Strong problem-solving and communication skills.
      Ability to work collaboratively in a fast-paced environment.
      Benefits:
      
      Competitive salary and comprehensive benefits package.
      Opportunities for professional growth and certification.
      Collaborative and forward-thinking work culture.`

  }  
  return descriptions[job]; 
}

getRandomSkills(n:number){

  const skills =['JAVA','JAVASCRIPT','CPP','DOCKER','JIRA','SCRUM']
  return _.sampleSize(skills,n)

}

  // Function to generate a random job title
 generateRandomJobTitle() {
  const jobTitles = [
    'Software Engineer',
    'Data Analyst',
    'UI Designer',
    'Product Manager',
    'DevOps Engineer',
    // Add more job titles as needed
  ];
  return chance.pickone(jobTitles);
}

  // Generate a random job
 generateRandomJob() {
  const title = this.generateRandomJobTitle();
  const description = this.generateRandomJobDescriptions(title);
  const state = chance.state();
  const country = chance.country();
  const skills = this.getRandomSkills(chance.integer({ min: 1, max: 4}))
  const experience = chance.integer({ min: 1, max: 10 });
  const detailedDescription = chance.paragraph();
  const categoryId = chance.integer({ min: 1, max: 5 });

  return {
    title,
    description,
    categoryId,
    location: {
      state,
      country,
    },
    info: {
      skills,
      experience,
      detailedDescription,
    },
  } as Job;
}

  async mockData() {
    
    
    // Generate 100 mock job data entries
    const mockJobData:Job[] = [];
    for (let i = 0; i < 30; i++) {
      const job = this.generateRandomJob();
      mockJobData.push(job);
    }
    return await this.jobRepository.save(mockJobData);
    
  }
  // Update the service class name
  constructor(
    @InjectRepository(Job) // Update the repository type to Job
    private jobRepository: Repository<Job>, // Update the repository variable name
    private commonUtil: CommonUtil,
  ) {}

  public getAllJobs(attributes: Partial<Job>) {
    // Update the method name
    return this.jobRepository.find({
      ...attributes,
    }); // Update the repository method call
  }

  public getJob(id: number) {
    // Update the method name and argument type
    return this.jobRepository.findOne(id); // Update the repository method call
  }

  public createJob(input: Partial<Job>) {
    // Update the method name and argument type
    const newRecord = this.jobRepository.create(
      {
        ...input,
        createdBy: 1,
        updatedBy: 1,
      },
      // Update the repository variable name
    );
    return this.jobRepository.save(newRecord); // Update the repository method call
  }

  public async updateJob(id: number, input: JobUpdateInput) {
    // Update the method name and argument type
    const existingRecord = await this.jobRepository.findOne(id); // Update the repository method call
    if (!existingRecord) {
      throw new JobNotFoundException(`Job with id ${id} not found`); // Update the exception message
    }
    return this.jobRepository.save({
      // Update the repository variable name
      ...existingRecord,
      input,
    });
  }

  public deleteJob(id: number) {
    // Update the method name and argument type
    const record = this.jobRepository.findOne(id); // Update the repository method call
    if (!record) {
      throw new JobNotFoundException(`Job with id ${id} not found`); // Update the exception message
    }
    this.jobRepository.delete(id); // Update the repository method call
    return record;
  }
}
