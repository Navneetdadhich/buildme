import React, { useState } from "react";
import { saveAs } from "file-saver";
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
    ach1:"",
    ach2:"",
    cert1name:"",
    cert1link:"",
    cert1org:"",
    cert2name:"",
    cert2link:"",
    cert2org:"",
  });
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    // setSelectedOption(e.target.value);
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  

 

  const handleChangee = (e) => {
    setSelectedOption(e.target.value);
  };

  const generateDocument = () => {

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
      { field: "proj1name", label: "Project 1 Name" },
      { field: "proj1techstack", label: "Project 1 Techstack" },
      { field: "proj1desc", label: "Project 1 Description" },
      { field: "proj2name", label: "Project 2 Name" },
      { field: "proj2techstack", label: "Project 2 Techstack" },
      { field: "proj2desc", label: "Project 2 Description" },
      { field: "ach1", label: "Achievement 1" },
      { field: "ach2", label: "Achievement 2" },
      { field: "cert1name", label: "Certificate 1 Name" },
      { field: "cert1org", label: "Certificate 1 Organization" },
      { field: "cert1link", label: "Certificate 1 Link" },
      { field: "cert2name", label: "Certificate 2 Name" },
      { field: "cert2org", label: "Certificate 2 Organization" },
      { field: "cert2link", label: "Certificate 2 Link" },
    ];
  
   
    for (const { field, label } of requiredFields) {
      if (!resumeData[field] || resumeData[field].trim() === "") {

        toast.error(`Please fill the ${label} field.`);
        return; 
      }
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
              size: 22,
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
                      size: 22,
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
                      size: 22,
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
                      size: 22,
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
                  size: 25, 
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
                  size: 25, 
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.languages}\n`, 
                  color: "#000000", 
                  size: 25,
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.database}\n`, 
                  color: "#000000", 
                  size: 25,
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.framework}\n`,
                  color: "#000000", 
                  size: 25, 
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.developertools}\n`, 
                  color: "#000000", 
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

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bold: true,
              children: [
                new TextRun({
                  text: `${resumeData.proj1name}`, 
                  bold: true,
                  size: 25,
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.proj1techstack}\n`,
                  color: "#000000", 
                  size: 25, 
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: `${resumeData.proj1desc}\n`, 
                  color: "#000000", 
                  size: 25,
                }),
              ],
              spacing: { after: 140 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bold: true,
              children: [
                new TextRun({
                  text: `${resumeData.proj2name}`, 
                  bold: true,
                  size: 25,
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
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.proj2techstack}\n`,
                  color: "#000000", 
                  size: 25, 
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: `${resumeData.proj2desc}\n`, 
                  color: "#000000", 
                  size: 25, 
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
                  size: 25, 
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
                  size: 25,
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

             new Paragraph({
              alignment: AlignmentType.LEFT,
              bullet:{
                level: 0,
              },
              
              children: [
                  new ExternalHyperlink({
                      children: [
                          new TextRun({
                              text: `${resumeData.cert1name}`, 
                              color: "0000FF",           
                              size: 25,                 
                                         
                          }),

                          new TextRun({
                            text: `, by ${resumeData.cert1org}`, 
                            color: "000000",           
                            size: 25,                  
                                       
                        }),
                      ],
                      link: resumeData.cert1link,       
                  }),

              ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            bullet:{
              level: 0,
            },
           
            children: [

                new ExternalHyperlink({
                  children: [
                      new TextRun({
                          text: `${resumeData.cert2name}`,
                          color: "0000FF",         
                          size: 25,                 
                                     
                      }),

                      new TextRun({
                        text: `, by ${resumeData.cert2org}`, 
                        color: "000000",           
                        size: 25,                  
                                   
                    }),
                  ],
                  link: resumeData.cert2link,     
              }),
            ],
        }),
          

          ],
        },
      ],
    });

    toast.success("Resume Exported successfully!");
    
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <>
    
    <div className="App">
    
      <div className="heading">
        <img src={logo} alt="" />
      <h1>Resume Maker</h1>
      </div>
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
          backgroundColor : '#314f58',
          color: '#F1F0E8',
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

      <h5>Certificate 1</h5>
      <div>
        <input
          type="text"
          name="cert1name"
          placeholder="Certificate 1 Name"
          value={resumeData.cert1name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="cert1link"
          placeholder="Certificate 1 Link"
          value={resumeData.cert1link}
          onChange={handleChange}
          />
      </div>

      <div>
        <input
          type="text"
          name="cert1org"
          placeholder="Certificate 1 Organisation"
          value={resumeData.cert1org}
          onChange={handleChange}
          />
      </div>
          <h5>Certificate 2</h5>

          <div>
        <input
          type="text"
          name="cert2name"
          placeholder="Certificate 2 Name"
          value={resumeData.cert2name}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="cert2link"
          placeholder="Certificate 2 Link"
          value={resumeData.cert2link}
          onChange={handleChange}
          />
      </div>

      <div>
        <input
          type="text"
          name="cert2org"
          placeholder="Certificate 2 Organisation"
          value={resumeData.cert2org}
          onChange={handleChange}
          />
      </div>

      <button className="button" onClick={generateDocument}>Download</button>
        <ToastContainer
        theme="colored"/>

    </div>
      <div className="footer">
        <p> This Website Is Still In It's Refinement Period. Last Update Received On 12 December 2024 © Navneet Dadhich</p>
      </div>
    </>

  );
}

export default App;
