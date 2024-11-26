import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./App.css";
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

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleChangee = (e) => {
    setSelectedOption(e.target.value);
  };

  const generateDocument = () => {
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
                new TextRun(`${resumeData.email} | +91-${resumeData.phone} | `), // Plain text

                // External Hyperlink
                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: selectedOption, // Text to display as the link
                      // style: "Hyperlink",
                      size: 22,
                      color: "0000FF", // Optional: specify color
                    }),
                  ],
                  link: resumeData.codeIdLink, // Link destination
                }),

                new TextRun(` | `),

                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: "LinkedIn ", // Text to display as the link
                      // style: "Hyperlink",
                      size: 22,
                      color: "0000FF", // Optional: specify color
                    }),
                  ],
                  link: resumeData.linkedIn, // Link destination
                }),

                new TextRun(` | `),

                new ExternalHyperlink({
                  children: [
                    new TextRun({
                      text: "Github ", // Text to display as the link
                      // style: "Hyperlink",
                      size: 22,
                      color: "0000FF", // Optional: specify color
                    }),
                  ],
                  link: resumeData.github, // Link destination
                }),

                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: "_".repeat(112), // Creates a line with underscores
                      color: "#888888", // Optional: gray color for the line
                      size: 16, // Adjusts font size for the divider
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
                  size: 27, // Font size must be in half-points (e.g., 40px becomes 80)
                  bold: true, // Optional, if you want it bold
                }),
              ],
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.university}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.coursename}`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 10 },
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: `${resumeData.cgpa} CGPA`, // Creates a line with underscores
                  color: "#000000",
                  bold: true, // Optional: gray color for the line
                  size: 22, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), // Creates a line with underscores
                  color: "#888888",
                  bold: true, // Optional: gray color for the line
                  size: 16, // Adjusts font size for the divider
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
                  text: `Languages - `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.languages}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `Database - `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.database}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `Frameworks - `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.framework}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `Developer Tools - `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.developertools}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 10 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), // Creates a line with underscores
                  color: "#888888",
                  bold: true, // Optional: gray color for the line
                  size: 16, // Adjusts font size for the divider
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
                  text: `${resumeData.proj1name}`, // Creates a line with underscores
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
                  text: `Techstack: `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.proj1techstack}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `${resumeData.proj1desc}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 140 },
            }),

            new Paragraph({
              alignment: AlignmentType.LEFT,
              bold: true,
              children: [
                new TextRun({
                  text: `${resumeData.proj2name}`, // Creates a line with underscores
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
                  text: `Techstack: `, // Creates a line with underscores
                  bold: true,
                  size: 25,
                }),
                new TextRun({
                  text: `${resumeData.proj2techstack}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `${resumeData.proj2desc}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 40 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), // Creates a line with underscores
                  color: "#888888",
                  bold: true, // Optional: gray color for the line
                  size: 16, // Adjusts font size for the divider
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
                  text: `${resumeData.ach1}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
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
                  text: `${resumeData.ach2}\n`, // Creates a line with underscores
                  color: "#000000", // Optional: gray color for the line
                  size: 25, // Adjusts font size for the divider
                }),
              ],
              spacing: { after: 40 },
            }),

            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "_".repeat(112), // Creates a line with underscores
                  color: "#888888",
                  bold: true, // Optional: gray color for the line
                  size: 16, // Adjusts font size for the divider
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
              // spacing: { after: 300 },
              children: [
                  new ExternalHyperlink({
                      children: [
                          new TextRun({
                              text: `${resumeData.cert1name}`, // Text to display as the link
                              color: "0000FF",           // Standard hyperlink blue color
                              size: 25,                  // Size in half-points (12.5 points)
                                          // Underline for hyperlink effect
                          }),

                          new TextRun({
                            text: `, by ${resumeData.cert1org}`, // Text to display as the link
                            color: "000000",           // Standard hyperlink blue color
                            size: 25,                  // Size in half-points (12.5 points)
                                        // Underline for hyperlink effect
                        }),
                      ],
                      link: resumeData.cert1link,       // The link destination (must be a valid URL)
                  }),

              ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            bullet:{
              level: 0,
            },
            // spacing: { after: 300 },
            children: [

                new ExternalHyperlink({
                  children: [
                      new TextRun({
                          text: `${resumeData.cert2name}`, // Text to display as the link
                          color: "0000FF",           // Standard hyperlink blue color
                          size: 25,                  // Size in half-points (12.5 points)
                                      // Underline for hyperlink effect
                      }),

                      new TextRun({
                        text: `, by ${resumeData.cert2org}`, // Text to display as the link
                        color: "000000",           // Standard hyperlink blue color
                        size: 25,                  // Size in half-points (12.5 points)
                                    // Underline for hyperlink effect
                    }),
                  ],
                  link: resumeData.cert2link,       // The link destination (must be a valid URL)
              }),
            ],
        }),
          

          ],
        },
      ],
    });

    // Generate the .docx document and trigger download
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <div className="App">
      <h1>BuildMe - Resume Maker</h1>
      <h3>Basic Details : </h3>
      <div>
        <input
          type="text"
          name="name"
          rwe3
          placeholder="Name"
          value={resumeData.name}
          onChange={handleChange}
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
          placeholder="github"
          value={resumeData.github}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="">Coding Platform Id</label>
        <label>
          <input
            type="radio"
            value="Leetcode"
            checked={selectedOption === "Leetcode"}
            onChange={handleChangee}
          />
          Leetcode
        </label>
        <label>
          <input
            type="radio"
            value="Hackerrank"
            checked={selectedOption === "Hackerrank"}
            onChange={handleChangee}
          />
          Hackerrank
        </label>
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
          placeholder="cgpa"
          value={resumeData.cgpa}
          onChange={handleChange}
        />
      </div>
      <h3>Technical skills : </h3>
      <div>
        <input
          type="text"
          name="languages"
          placeholder="Languages"
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

      <button onClick={generateDocument}>Download</button>
    </div>
  );
}

export default App;
