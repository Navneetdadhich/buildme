import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import ProgressBar2 from "./components/ProgressBar2.jsx";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import logo from './assets/logo.png';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ExternalHyperlink,
  AlignmentType,
} from "docx";

function App() {
  const [selectedValue, setSelectedValue] = useState('');
  const [sectionProgress, setSectionProgress] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [progress, setProgress] = useState(0);
  const [numProjects, setNumProjects] = useState(1);
  const [numCertificates, setNumCertificates] = useState(1);

  const isValidCGPA = (cgpa) => {
    // Matches format like "7.50", "8.00", "10.00", etc.
    const cgpaRegex = /^(?:[0-9]|10)(?:\.[0-9]{2})?$/;
    
    if (!cgpaRegex.test(cgpa)) {
      return false;
    }
    
    // Convert to number and check range
    const numericCGPA = parseFloat(cgpa);
    return numericCGPA >= 0 && numericCGPA <= 10;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const [isDarkThemee, setIsDarkThemee] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // validate the phone, email, links

  // Update theme and save to localStorage
  const toggleThemee = () => {
    setIsDarkThemee(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };


  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    codeIdLink: "",
    github: "",
    phone: "",
    linkedIn: "",
    coursename: "",
    cgpa: "",
    university: "",
    framework: "",
    database: "",
    languages: "",
    developertools: "",
    experience: "",
    skills: "",
    proj1name: "",
    proj1techstack: "",
    proj1desc: "",
    proj2name: "",
    proj2techstack: "",
    proj2desc: "",
    proj3name: "",
    proj3techstack: "",
    proj3desc: "",
    ach1:"",
    ach2:"",
    cert1name:"",
    cert1link:"",
    cert1org:"",
    cert2name:"",
    cert2link:"",
    cert2org:"",
    cert3name:"",
    cert3link:"",
    cert3org:"",
    cert4name:"",
    cert4link:"",
    cert4org:"",
  });
  const [selectedOption, setSelectedOption] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Always update the state first to allow typing
    setResumeData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
 
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);


  const handleChangee = (e) => {
    setSelectedOption(e.target.value);
  };


// validation start
const validateAllFields = () => {

  const requiredFields = [
    { field: "name", label: "Name" },
    { field: "email", label: "Email" },
    { field: "phone", label: "Phone Number" },
    { field: "university", label: "University" },
    { field: "coursename", label: "Course Name" },
    { field: "cgpa", label: "CGPA" },
    { field: "languages", label: "Languages" },
    { field: "database", label: "Database" },
    { field: "framework", label: "Framework" },
    { field: "developertools", label: "Developer Tools" },
    { field: "ach1", label: "Achievement 1" },
    { field: "ach2", label: "Achievement 2" },
  ];

  for (let i = 1; i <= numProjects; i++) {
    requiredFields.push(
      { field: `proj${i}name`, label: `Project ${i} Name` },
      { field: `proj${i}techstack`, label: `Project ${i} Techstack` },
      { field: `proj${i}desc`, label: `Project ${i} Description` }
    );
  }

  // Add required fields based on number of certificates
  for (let i = 1; i <= numCertificates; i++) {
    requiredFields.push(
      { field: `cert${i}name`, label: `Certificate ${i} Name` },
      { field: `cert${i}org`, label: `Certificate ${i} Organization` },
      { field: `cert${i}link`, label: `Certificate ${i} Link` }
    );
  }
  
  for (const { field, label } of requiredFields) {
    if (!resumeData[field] || resumeData[field].trim() === "") {

      toast.error(`Please fill the ${label} field.`);
      return; 
    }
  }


  // validate the email, phone, links

  if (!isValidCGPA(resumeData.cgpa)) {
    toast.error('Please enter a valid CGPA in format 0.00 to 10.00');
    return;
  }

  if (!isValidEmail(resumeData.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  if (!isValidPhone(resumeData.phone)) {
    toast.error('Please enter a valid 10-digit phone number');
    return;
  }

  // URL validations
  const urlFields = {
    'LinkedIn': resumeData.linkedIn,
    'Github': resumeData.github,
    'Coding Platform': resumeData.codeIdLink
  };

  for (const [fieldName, url] of Object.entries(urlFields)) {
    if (!isValidUrl(url)) {
      toast.error(`Please enter a valid URL for ${fieldName}`);
      return;
    }
  }
  return true;
};
// validation end


  const generateDocument = () => {


  if (!validateAllFields()) {
    return;
  }
    

    const doc = new Document({
      sections: [
        {
          children: [
            // Resume Header (Name, Email, Phone)
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.name,
                  color: "#000000", // Set the color here in the TextRun
                  bold: true, // Optional: make the heading bold for emphasis
                  size: 36,
                }),
              ],
              spacing: { after: 100 }, // Optional: adjust font size if needed
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              // text: `${resumeData.email} | ${resumeData.phone} | ${selectedOption}`,
              alignment: AlignmentType.CENTER,
              size: 25,
              color: "#000000",
              spacing: { after: 300 },

              children: [
                new TextRun(`${resumeData.email} | +91-${resumeData.phone} | `), 

                // External Hyperlink
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: selectedOption, 
                      // style: "Hyperlink",
                      size: 25,
                      color: "0000FF", 
                    }),
                  ],
                  link: resumeData.codeIdLink, 
                }),

                new TextRun(` | `),

                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: "LinkedIn ", 
                      // style: "Hyperlink",
                      size: 25,
                      color: "0000FF", 
                    }),
                  ],
                  link: resumeData.linkedIn, 
                }),

                new TextRun(` | `),

                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: "Github ",
                      size: 25,
                      color: "0000FF", 
                    }),
                  ],
                  link: resumeData.github, // Link destination
                }),

                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "_".repeat(112), 
                      color: "#888888", 
                      size: 16, 
                    }),
                  ],
                  spacing: { after: 0 },
                }),
              ],
            }),

            // Education Section
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Education:",
                  color: "#000000",
                  size: 27, 
                  bold: true, 
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.university}\n`, 
                  color: "#000000", 
                  size: 22, 
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.coursename}`, 
                  color: "#000000", 
                  size: 22, 
                }),
              ],
              spacing: { after: 10 },
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.cgpa} CGPA`, 
                  color: "#000000",
                  bold: true, 
                  size: 22, 
                }),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), 
                  color: "#888888",
                  bold: true, 
                  size: 16, 
                }),
              ],
              spacing: { after: 200 },
            }),

            // Experience Section
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Technical Skills :",
                  color: "#000000",
                  size: 27,
                  bold: true,
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              bold: true,
              children: [
                new TextRun({
                  text: `Languages - `, 
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `${resumeData.languages}\n`, 
                  color: "#000000", 
                  size: 22,
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              bold: true,
              children: [
                new TextRun({
                  text: `Database - `,
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `${resumeData.database}\n`, 
                  color: "#000000", 
                  size: 22,
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              bold: true,
              children: [
                new TextRun({
                  text: `Frameworks - `, 
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `${resumeData.framework}\n`,
                  color: "#000000", 
                  size: 22, 
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              bold: true,
              children: [
                new TextRun({
                  text: `Developer Tools - `, 
                  bold: true,
                  size: 22,
                }),
                new TextRun({
                  text: `${resumeData.developertools}\n`, 
                  color: "#000000", 
                  size: 22,
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), 
                  color: "#888888",
                  bold: true, 
                  size: 16, 
                }),
              ],
              spacing: { after: 200 },
            }),

            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Projects :",
                  color: "#000000",
                  size: 27,
                  bold: true,
                }),
              ],
            }),

            ...[...Array(numProjects)].map((_, index) => [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bold: true,
                children: [
                  new TextRun({
                    text: resumeData[`proj${index + 1}name`],
                    bold: true,
                    size: 22,
                  }),
                ],
                spacing: { after: 30 },
              }),
              
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bold: true,
                children: [
                  new TextRun({
                    text: `Techstack: `,
                    bold: true,
                    size: 22,
                  }),
                  new TextRun({
                    text: resumeData[`proj${index + 1}techstack`],
                    color: "#000000",
                    size: 22,
                  }),
                ],
                spacing: { after: 10 },
              }),
              
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: { level: 0 },
                children: [
                  new TextRun({
                    text: resumeData[`proj${index + 1}desc`],
                    color: "#000000",
                    size: 22,
                  }),
                ],
                spacing: { after: index === numProjects - 1 ? 200 : 140 },
              }),
            ]).flat(),
    
            // Separator after Projects
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112),
                  color: "#888888",
                  bold: true,
                  size: 16,
                }),
              ],
              spacing: { after: 200 },
            }),

            // achievements

            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Achievements :",
                  color: "#000000",
                  size: 27,
                  bold: true,
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: `${resumeData.ach1}\n`, 
                  color: "#000000", 
                  size: 22, 
                }),
              ],
              spacing: { after: 40 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: `${resumeData.ach2}\n`, 
                  color: "#000000", 
                  size: 22,
                }),
              ],
              spacing: { after: 40 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), 
                  color: "#888888",
                  bold: true, 
                  size: 16, 
                }),
              ],
              spacing: { after: 200 },
            }),

            // certificates
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: "Certificates :",
                  color: "#000000",
                  size: 27,
                  bold: true,
                }),
              ],
            }),
    
            // Dynamic Certificates
            ...[...Array(numCertificates)].map((_, index) => 
              new Paragraph({
                alignment: AlignmentType.LEFT,
                bullet: { level: 0 },
                children: [
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: resumeData[`cert${index + 1}name`],
                        color: "0000FF",
                        size: 22,
                      }),
                    ],
                    link: resumeData[`cert${index + 1}link`],
                  }),
                  new TextRun({
                    text: `, by ${resumeData[`cert${index + 1}org`]}`,
                    color: "000000",
                    size: 22,
                  }),
                ],
                spacing: { after: index === numCertificates - 1 ? 200 : 40 },
              })
            ),
            

          ],
        },
      ],
    });

    toast.success("Resume Exported successfully!");
    
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  const calculateProgress = () => {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'university',
      'coursename',
      'cgpa',
      'languages',
      'database',
      'framework',
      'developertools',
      'ach1',
      'ach2',
    ];
  
    // Add project fields based on numProjects
    for (let i = 1; i <= numProjects; i++) {
      requiredFields.push(
        `proj${i}name`,
        `proj${i}techstack`,
        `proj${i}desc`
      );
    }
  
    // Add certificate fields based on numCertificates
    for (let i = 1; i <= numCertificates; i++) {
      requiredFields.push(
        `cert${i}name`,
        `cert${i}org`,
        `cert${i}link`
      );
    }
  
    const filledFields = requiredFields.filter(
      field => resumeData[field] && resumeData[field].trim() !== ''
    );
  
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  
  
  useEffect(() => {
    setProgress(calculateProgress());
  }, [resumeData, numProjects, numCertificates]);


  // particular fields progress bar

  const calculateSectionProgress = () => {
    const sections = {
      basicInfo: ['name', 'email', 'phone', 'linkedIn', 'github'],
      education: ['university', 'coursename', 'cgpa'],
      skills: ['languages', 'database', 'framework', 'developertools'],
      projects: Array(numProjects).fill().flatMap((_, i) => [
        `proj${i + 1}name`,
        `proj${i + 1}techstack`,
        `proj${i + 1}desc`
      ]),
      certificates: Array(numCertificates).fill().flatMap((_, i) => [
        `cert${i + 1}name`,
        `cert${i + 1}org`,
        `cert${i + 1}link`
      ]),
      achievements: ['ach1', 'ach2']
    };
  
    return Object.entries(sections).reduce((acc, [section, fields]) => {
      const filledFields = fields.filter(
        field => resumeData[field] && resumeData[field].trim() !== ''
      );
      acc[section] = Math.round((filledFields.length / fields.length) * 100);
      return acc;
    }, {});
  };
  
  // Enhanced ProgressBar component

  useEffect(() => {
    setProgress(calculateProgress());
    setSectionProgress(calculateSectionProgress());
  }, [resumeData, numProjects, numCertificates]);

  return (
    <>

<div className="theme-switch-container">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="blob-outer-container">
        <div className="blob-inner-container">
          <div className="blob"></div>
        </div>
      </div>
    
    <div className="App">
    
      <div className="heading">
        <img src={logo} alt="" />
      <h1>Resume Maker</h1>
      </div>

      
      <ProgressBar2 progress={progress} sectionProgress={sectionProgress} />

      <h3>Basic Details : </h3>
      <div>
        <input
          type="text"
          name="name"
          rwe3
          placeholder="Name"
          value={resumeData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={resumeData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="linkedIn"
          placeholder="LinkedIn"
          value={resumeData.linkedIn}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="github"
          placeholder="Github"
          value={resumeData.github}
          onChange={handleChange}
        />
      </div>


      <div>
      <label htmlFor="dropdown">Choose an option: </label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChangee}
        style={{
          padding: '5px',
          borderRadius: '4px',
          border: '1px solid transparent',
          backgroundColor: isDarkTheme ? '#B3C8CF' : '#314f58',
          color: isDarkTheme ? '#314f58' : '#F1F0E8',
          marginBottom: '10px',
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="LeetCode">LeetCode</option>
        <option value="HackerRank">HackerRank</option>
        <option value="GeeksForGeeks">Geeks For Geeks</option>
        <option value="CodeChef">CodeChef</option>
        <option value="CodeForces">CodeForces</option>
        <option value="CodingNinjas">Coding Ninjas</option>
      </select>
      {selectedOption && (
        <p style={{ marginTop: '10px' }}>You selected: {selectedOption}</p>
      )}
    </div>


      <div>
        <input
          type="text"
          name="codeIdLink"
          placeholder="Coding Platform Id Link"
          value={resumeData.codeIdLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={resumeData.phone}
          onChange={handleChange}
        />
      </div>
      <h3>Education Details :</h3>
      <div>
        <input
          type="text"
          name="university"
          placeholder="University or College"
          value={resumeData.university}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={resumeData.coursename}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="cgpa"
          placeholder="CGPA"
          value={resumeData.cgpa}
          onChange={handleChange}
        />
      </div>
      <h3>Technical skills : </h3>
      <div>
        <input
          type="text"
          name="languages"
          placeholder="Coding Languages"
          value={resumeData.languages}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="database"
          placeholder="Database"
          value={resumeData.database}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="framework"
          placeholder="Frameworks"
          value={resumeData.framework}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="developertools"
          placeholder="Developer Tools"
          value={resumeData.developertools}
          onChange={handleChange}
        />
      </div>
      <h3>Projects : </h3>

      <div>
        <label htmlFor="numProjects">Number of Projects (1-3): </label>
        <select 
          id="numProjects" 
          value={numProjects} 
          onChange={(e) => setNumProjects(Number(e.target.value))}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid transparent',
            backgroundColor: isDarkTheme ? '#B3C8CF' : '#314f58',
            color: isDarkTheme ? '#314f58' : '#F1F0E8',
            marginBottom: '10px',
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      {/* Project 1 */}
      {numProjects >= 1 && (
        <>
          <h5>Project 1</h5>
      <div>
        <input
          type="text"
          name="proj1name"
          placeholder="Project 1 Name"
          value={resumeData.proj1name}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="proj1techstack"
          placeholder="Project 1 Techstack"
          value={resumeData.proj1techstack}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="proj1desc"
          placeholder="Project 1 Description"
          value={resumeData.proj1desc}
          onChange={handleChange}
        />
      </div>
        </>
      )}

      {/* Project 2 */}
      {numProjects >= 2 && (
        <>
          <h5>Project 2</h5>
      <div>
        <input
          type="text"
          name="proj2name"
          placeholder="Project 2 Name"
          value={resumeData.proj2name}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="proj2techstack"
          placeholder="Project 2 Techstack"
          value={resumeData.proj2techstack}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="proj2desc"
          placeholder="Project 2 Description"
          value={resumeData.proj2desc}
          onChange={handleChange}
        />
      </div>
        </>
      )}

      {/* Project 3 */}
      {numProjects >= 3 && (
        <>
          <h5>Project 3</h5>
          <div>
            <input
              type="text"
              name="proj3name"
              placeholder="Project 3 Name"
              value={resumeData.proj3name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="proj3techstack"
              placeholder="Project 3 Techstack"
              value={resumeData.proj3techstack}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="proj3desc"
              placeholder="Project 3 Description"
              value={resumeData.proj3desc}
              onChange={handleChange}
            />
          </div>
        </>
      )}
       

      <h3>Achievements : </h3>

      <div>
        <input
          type="text"
          name="ach1"
          placeholder="Achievement 1"
          value={resumeData.ach1}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="ach2"
          placeholder="Achievement 2"
          value={resumeData.ach2}
          onChange={handleChange}
        />
      </div>

      <h3>Certificates : </h3>

      <div>
        <label htmlFor="numCertificates">Number of Certificates (1-4): </label>
        <select 
          id="numCertificates" 
          value={numCertificates} 
          onChange={(e) => setNumCertificates(Number(e.target.value))}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid transparent',
            backgroundColor: isDarkTheme ? '#B3C8CF' : '#314f58',
          color: isDarkTheme ? '#314f58' : '#F1F0E8',
            marginBottom: '10px',
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>

      {/* Certificate sections */}
      {[...Array(numCertificates)].map((_, index) => (
        <div key={index}>
          <h5>Certificate {index + 1}</h5>
          <div>
            <input
              type="text"
              name={`cert${index + 1}name`}
              placeholder={`Certificate ${index + 1} Name`}
              value={resumeData[`cert${index + 1}name`]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name={`cert${index + 1}link`}
              placeholder={`Certificate ${index + 1} Link`}
              value={resumeData[`cert${index + 1}link`]}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name={`cert${index + 1}org`}
              placeholder={`Certificate ${index + 1} Organisation`}
              value={resumeData[`cert${index + 1}org`]}
              onChange={handleChange}
            />
          </div>
        </div>
        
      ))}

        <button className="button" onClick={generateDocument}>
          Download 
        </button>
      
     

        <ToastContainer
        theme="colored"/>
        

    </div>  

    
   

<div className="footer">
  <p>Made with <span className="heart">❤</span> by <a href="https://github.com/Navneetdadhich" target="_blank" rel="noopener noreferrer">Navneet Dadhich</a></p>
  {/* <p>This Website Is Still In It's Refinement Period. Last Update Received On 20 December 2024</p> */}
</div>
    
    </>

  );
}

export default App;
